<script>
  import Search from "../assets/search.svelte";
</script>

<div class="bg-[#4F4F4F] flex items-center px-6 py-2">
  <label for="search">
    <Search class="w-4 h-4" fill="white" />
  </label>
  <input
    type="search"
    name="search"
    id="search"
    class="w-full border-none bg-transparent py-2 focus:ring-0 focus:border-none focus:outline-none text-white placeholder-white px-2"
  />
</div>
