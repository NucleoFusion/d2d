/* global localStorage */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';


export const isAuthenticated = writable(false);
export const token = writable<string | null>(null);
export const userId = writable<number | null>(null);

export function checkAuth() {
  
  if (browser) {
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    token.set(storedToken);
    userId.set(storedUserId ? Number(storedUserId) : null);
    isAuthenticated.set(!!storedToken);
  
  }
}

export function logout() {
  if (browser) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    token.set(null);
    userId.set(null);
    isAuthenticated.set(false);
  }
}
