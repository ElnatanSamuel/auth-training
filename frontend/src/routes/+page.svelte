<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isAuthenticated } from "../stores/auth";

  onMount(() => {
    if ($isAuthenticated) {
      goto("/profile");
    }
  });
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
  <h1 class="text-4xl font-bold mb-8 text-gray-800">Welcome</h1>
  <nav class="space-x-4">
    <a
      href="/register"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >Register</a
    >
    <a
      href="/login"
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >Login</a
    >
  </nav>
</div>
