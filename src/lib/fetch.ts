import { auth_token, user } from "$lib/store";

export default async function auth_fetch(url: string, options: any = {}) {
    let payload_tok, payload_user;

    auth_token.subscribe(tok => (payload_tok = tok));
    user.subscribe(tok => (payload_user = tok));

    if (options.headers)
        options.headers = { ...options.headers, auth_token: payload_tok, user: payload_user };
    else
        options.headers = { auth_token: payload_tok, user: payload_user };

    const response = await fetch(url, options);

    return response;
}
