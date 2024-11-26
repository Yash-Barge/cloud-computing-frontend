import { env } from "$env/dynamic/public";

export const auth_url = `${env.PUBLIC_BASE_URL}/auth`;
export const products_url = `${env.PUBLIC_BASE_URL}/products`;
export const cart_url = `${env.PUBLIC_BASE_URL}/cart`;
