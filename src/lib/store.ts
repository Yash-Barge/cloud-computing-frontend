import { writable } from "svelte/store";

export const logged_in = writable(false);
export const auth_token = writable("");
export const user = writable("");
