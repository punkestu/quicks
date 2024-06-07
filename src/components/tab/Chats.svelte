<script>
  // @ts-nocheck

  import moment from "moment";
  import GroupIcon from "../../assets/group.svg";
  import Loading from "../../assets/loading.svg";
  import SearchIcon from "../../assets/search.svelte";
  import ArrowBackIcon from "../../assets/arrow_back.svg";
  import CloseIcon from "../../assets/close.svg";
  import MoreIcon from "../../assets/more.svg";

  let chat;
  let isLoading = true;
  let more_id;
  let posts;

  fetch("https://dummyapi.io/data/v1/post?limit=5", {
    headers: {
      "app-id": import.meta.env.VITE_API_TOKEN,
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      posts = data.data;
      for (let post of posts) {
        post.comments = await fetch(
          `https://dummyapi.io/data/v1/post/${post.id}/comment?limit=5`,
          {
            headers: {
              "app-id": import.meta.env.VITE_API_TOKEN,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => data.data);
      }
      setTimeout(() => {
        isLoading = false;
      }, 500);
    });
</script>

<section class="h-full flex flex-col gap-2 m-5">
  {#if !chat}
    <div
      class="flex items-center justify-between gap-2 border border-[#828282] rounded-[5px] px-10 py-1"
    >
      <input
        type="search"
        name="search-inbox"
        id="search-inbox"
        class="flex-grow focus:ring-0 focus:outline-none"
        placeholder="Search"
      />
      <button class="px-4 flex justify-center">
        <SearchIcon class="w-4 h-4" fill="#828282" />
      </button>
    </div>
  {:else}
    <div
      class="flex items-center justify-between gap-2 border-b -mx-4 -mt-4 p-4"
    >
      <button on:click={() => (chat = null)}>
        <img src={ArrowBackIcon} alt="back" class="w-4 h-4" />
      </button>
      <div class="flex-grow">
        <h2 class="text-sm text-[#2F80ED] font-bold">
          {chat.text.toUpperCase()}
        </h2>
        {#if chat.comments && chat.comments.length > 2}
          <p class="text-xs">{chat.tags.length + 1} Participants</p>
        {/if}
      </div>
      <button on:click={() => (chat = null)}>
        <img src={CloseIcon} alt="close" class="w-4 h-4" />
      </button>
    </div>
  {/if}

  {#if isLoading}
    <div class="w-full flex-grow flex flex-col items-center justify-center">
      <img src={Loading} alt="Loading" class="animate-spin" />
      <p class="text-[#4F4F4F] font-bold text-base">Loading Chats ...</p>
    </div>
  {:else if !chat}
    {#await posts then}
      {#if posts.length === 0}
        <div class="w-full flex-grow flex flex-col items-center justify-center">
          <p class="text-[#4F4F4F] font-bold text-base">No Chats Found</p>
        </div>
      {:else}
        <div
          class="w-full flex-grow max-h-[80%] flex flex-col gap-[1px] bg-gray-400 overflow-y-auto"
        >
          {#each posts as post}
            <button
              on:click={() => (chat = post)}
              class="grid grid-cols-6 gap-2 bg-white pt-4 pb-8"
            >
              <aside class="flex justify-center">
                {#if post.comments && post.comments.length <= 2}
                  <div
                    class="w-10 h-10 bg-primary-1 flex items-center justify-center rounded-full text-white"
                  >
                    {post.text[0].toUpperCase()}
                  </div>
                {:else}
                  <img src={GroupIcon} alt="pp" />
                {/if}
              </aside>
              <aside class="col-span-5 text-sm">
                <div class="flex gap-2">
                  <p class="flex-shrink text-[#2F80ED] font-bold text-left">
                    {post.text.length > 30 ? post.text.slice(0, 30) : post.text}
                  </p>
                  <p class="min-w-[50%] flex-grow font-light text-right">
                    {moment(post.publishDate).format("DD/mm/YYYY HH:MM")}
                  </p>
                </div>
                {#if post.comments[0]}
                  <p class="font-bold text-left">
                    {post.comments[0].owner.firstName}
                  </p>
                  <p class="text-left">{post.comments[0].message}</p>
                {:else}
                  <p class="text-left">No Chat</p>
                {/if}
              </aside>
            </button>
          {/each}
        </div>
      {/if}
    {/await}
  {:else if chat}
    <div
      class="w-full {!chat.comments || chat.comments.length === 0
        ? 'flex-grow'
        : 'h-[70%]'} flex flex-col items-start gap-2 overflow-y-auto relative"
    >
      {#each chat.comments as chat_item}
        <div
          class="flex flex-col text-sm {chat_item.owner.firstName ===
            'Madison' && 'self-end'}"
        >
          <p
            class="{chat_item.owner.firstName === 'Madison'
              ? 'text-chats-2-2'
              : 'text-chats-1-2'} font-bold"
          >
            {chat_item.owner.firstName === "Madison"
              ? "You"
              : chat_item.owner.firstName}
          </p>
          <div class="flex gap-1 items-start">
            {#if chat_item.owner.firstName === "Madison"}
              <aside class="relative">
                <button
                  class="mt-2"
                  on:click={() =>
                    more_id ? (more_id = null) : (more_id = chat_item.id)}
                >
                  <img src={MoreIcon} alt="more" />
                </button>
                {#if chat_item.id === more_id}
                  <div class="absolute right-0">
                    <div class="flex flex-col border rounded-md bg-white">
                      <button class="w-20 h-8 text-primary-1 border-b"
                        >Edit</button
                      >
                      <button class="w-20 h-8 text-red-500">Delete</button>
                    </div>
                  </div>
                {/if}
              </aside>
            {/if}
            <div
              class="flex-grow px-4 py-2 rounded-sm {chat_item.owner
                .firstName === 'Madison'
                ? 'bg-chats-2'
                : ' bg-chats-1'}"
            >
              <p>{chat_item.message}</p>
              <p class="font-light">
                {moment(chat_item.publishDate).format("HH:MM")}
              </p>
            </div>
          </div>
        </div>
      {/each}
      <div
        class="flex gap-4 w-full sticky {chat.comments && chat.comments.length > 2 ? "bottom-0" : "top-[90%]"}"
      >
        <input
          type="text"
          name="chat"
          id="chat"
          class="px-2 py-1 focus:ring-0 focus:outline-none border rounded-md flex-grow"
          placeholder="Type a new message"
        />
        <button class="bg-primary-1 text-white px-2 py-1 rounded-md"
          >Send</button
        >
      </div>
    </div>
  {/if}
</section>
