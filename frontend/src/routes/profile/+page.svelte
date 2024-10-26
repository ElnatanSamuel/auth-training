<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import {
    isAuthenticated,
    accessToken,
    refreshToken,
  } from "../../stores/auth";

  let profileData = null;
  let error = "";

  onMount(async () => {
    if (!$isAuthenticated) {
      goto("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${$accessToken}` },
      });
      profileData = response.data;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        // Token expired, try to refresh
        try {
          const refreshResponse = await axios.post(
            "http://localhost:3000/refresh-token",
            { token: $refreshToken }
          );
          accessToken.set(refreshResponse.data.accessToken);
          // Retry the profile request
          const retryResponse = await axios.get(
            "http://localhost:3000/profile",
            {
              headers: {
                Authorization: `Bearer ${refreshResponse.data.accessToken}`,
              },
            }
          );
          profileData = retryResponse.data;
        } catch (refreshErr) {
          error = "Session expired. Please login again.";
          isAuthenticated.set(false);
          goto("/login");
        }
      } else {
        error = "Failed to load profile data";
      }
    }
  });

  function handleLogout() {
    isAuthenticated.set(false);
    accessToken.set(null);
    refreshToken.set(null);
    goto("/login");
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold mb-8 text-gray-800">Profile</h1>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
    {#if profileData}
      <p class="text-xl mb-4">
        Welcome, <span class="font-bold">{profileData.username}</span>!
      </p>
      <p class="mb-6">{profileData.message}</p>
      <button
        on:click={handleLogout}
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {:else}
      <p class="text-gray-600">Loading profile data...</p>
    {/if}
  </div>
</div>
