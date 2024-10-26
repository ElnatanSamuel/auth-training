<script>
  import axios from "axios";
  import { goto } from "$app/navigation";

  let username = "";
  let password = "";
  let error = "";

  async function handleRegister() {
    try {
      await axios.post("http://localhost:3000/register", {
        username,
        password,
      });
      goto("/login");
    } catch (err) {
      error = "Registration failed";
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold mb-8 text-gray-800">Register</h1>
  <form
    on:submit|preventDefault={handleRegister}
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
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Register
      </button>
    </div>
  </form>
  {#if error}
    <p class="text-red-500 text-xs italic">{error}</p>
  {/if}
</div>
