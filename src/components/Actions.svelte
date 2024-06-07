<script>
  import Quick from "../assets/quicks.svelte";
  import Chat from "../assets/chats.svelte";
  import Task from "../assets/tasks.svelte";

  export let activeTab = "";

  let isQuickOpen = false;
  let isChatOpen = false;
  let isTaskOpen = false;

  function toggleQuick() {
    if (!isChatOpen && !isTaskOpen) isQuickOpen = !isQuickOpen;
    else {
      isChatOpen = false;
      isTaskOpen = false;
    }
  }
  function openChat() {
    isChatOpen = true;
    isTaskOpen = false;
  }
  function openTask() {
    isTaskOpen = true;
    isChatOpen = false;
  }

  $: isChatOpen && (activeTab = "chat");
  $: isTaskOpen && (activeTab = "task");
  $: !isChatOpen && !isTaskOpen && (activeTab = "");
</script>

<div class="flex items-center">
  <div
    class="{isQuickOpen
      ? isTaskOpen
        ? 'ms-4 -me-[9.5rem] z-20'
        : 'me-4'
      : '-me-[3.7rem]'} flex flex-col items-center duration-700 relative"
  >
    <p
      class="absolute text-white font-bold text-base {isQuickOpen &&
      !isChatOpen &&
      !isTaskOpen
        ? '-top-6'
        : 'top-0 opacity-0'} duration-700"
    >
      Task
    </p>
    <button
      class="{isTaskOpen
        ? 'bg-indicator-1 w-16 h-16'
        : 'bg-white w-14 h-14'} flex items-center justify-center rounded-full duration-700"
      on:click={openTask}
    >
      <Task isActive={isTaskOpen} />
    </button>
  </div>
  <div
    class="{isQuickOpen
      ? isChatOpen
        ? 'ms-4 -me-[5rem] z-20'
        : 'me-4'
      : '-me-[3.7rem]'} flex flex-col items-center duration-700 relative"
  >
    <p
      class="absolute text-white font-bold text-base {isQuickOpen &&
      !isChatOpen &&
      !isTaskOpen
        ? '-top-6'
        : 'top-0 opacity-0'} duration-700"
    >
      Inbox
    </p>
    <button
      class="{isChatOpen
        ? 'bg-indicator-2 w-16 h-16'
        : 'bg-white w-14 h-14'} flex items-center justify-center rounded-full duration-700"
      on:click={openChat}
    >
      <Chat isActive={isChatOpen} />
    </button>
  </div>
  <button
    class="z-10 {isChatOpen || isTaskOpen
      ? 'me-4 bg-primary-2'
      : 'bg-primary-1'} w-16 h-16 flex justify-center items-center rounded-full duration-700"
    on:click={toggleQuick}
  >
    <Quick isActive={!isChatOpen && !isTaskOpen} />
  </button>
</div>
