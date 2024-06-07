<script>
  import Actions from "./components/Actions.svelte";
  import Search from "./components/Search.svelte";

  import Chats from "./components/tab/Chats.svelte";

  let activeTab = "";
</script>

<main class="grid grid-cols-6 min-h-screen">
  <aside class="border-e h-full"></aside>
  <aside class="col-span-5 relative h-full">
    <Search />
    <div class="absolute bottom-4 right-4 flex flex-col items-end gap-6">
      {#if activeTab}
        <div
          class="w-[30vw] h-[70vh] bg-white rounded-sm border-2 border-[#BDBDBD] flex flex-col"
        >
          {#if activeTab === "chat"}
            <Chats />
          {:else if activeTab === "task"}
            <p>Task</p>
          {/if}
        </div>
      {/if}
      <Actions bind:activeTab />
    </div>
  </aside>
</main>
