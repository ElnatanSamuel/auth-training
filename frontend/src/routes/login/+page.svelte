<script>
  import axios from "axios";
  import { goto } from "$app/navigation";
  import { initializeAuth } from "../../stores/auth";

  let username = "";
  let password = "";
  let error = "";

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      initializeAuth(response.data.accessToken, response.data.refreshToken);
      goto("/profile");
    } catch (err) {
      error = "Login failed";
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold mb-8 text-gray-800">Login</h1>
  <form
    on:submit|preventDefault={handleLogin}
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
  >
    <div class="mb-4">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        bind:value={username}
        placeholder="Username"
        required
      />
    </div>
    <div class="mb-6">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        bind:value={password}
        placeholder="Password"
        required
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Login
      </button>
    </div>
  </form>
  {#if error}
    <p class="text-red-500 text-xs italic">{error}</p>
  {/if}
</div>
