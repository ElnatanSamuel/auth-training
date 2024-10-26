import { writable } from "svelte/store";
import axios from "axios";

export const isAuthenticated = writable(false);
export const accessToken = writable(null);
export const refreshToken = writable(null);

let refreshTimeout;

function setRefreshTimeout() {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(refreshAccessToken, 9 * 60 * 1000); // Refresh 1 minute before expiration
}

async function refreshAccessToken() {
  try {
    const response = await axios.post("http://localhost:3000/refresh-token", {
      token: get(refreshToken),
    });
    accessToken.set(response.data.accessToken);
    setRefreshTimeout();
  } catch (error) {
    console.error("Failed to refresh token:", error);
    isAuthenticated.set(false);
    accessToken.set(null);
    refreshToken.set(null);
  }
}

export function initializeAuth(initialAccessToken, initialRefreshToken) {
  accessToken.set(initialAccessToken);
  refreshToken.set(initialRefreshToken);
  isAuthenticated.set(true);
  setRefreshTimeout();
}

export function clearAuth() {
  isAuthenticated.set(false);
  accessToken.set(null);
  refreshToken.set(null);
  clearTimeout(refreshTimeout);
}
