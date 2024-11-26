<script lang="ts">
  import { goto } from "$app/navigation";
  import { logged_in, auth_token, user } from "$lib/store";

    import { auth_url } from "$lib/url";

  let login_username: string = "";
  let login_password: string = "";
  let login_error: string = "";

  // Handle form submission
  const handle_login_submission = async () => {
    if (!login_username || !login_password) {
      login_error = "Both fields are required.";
      return;
    }
    try {
      const validated_response_body = await authenticateUser(login_username, login_password);
      logged_in.set(true);
      auth_token.set(validated_response_body.token);
      user.set(validated_response_body.user);
      goto("/store");
    } catch (err) {
      //@ts-ignore
      login_error = err.message;
    }
  };

  let signup_username: string = "";
  let signup_password: string = "";
  let signup_confirm_password: string = "";
  let signup_error: string = "";

  const handle_signup_submission = async () => {
    if (!signup_username || !signup_password || !signup_confirm_password) {
      signup_error = "All fields are required.";
      return;
    }
    if (signup_password != signup_confirm_password) {
      signup_error = "Passwords do not match.";
      return;
    }

    try {
      const validated_response_body = await signup_and_authenticate_user(signup_username, signup_password);
      logged_in.set(true);
      auth_token.set(validated_response_body.token);
      user.set(validated_response_body.user);
      goto("/store");
    } catch (err) {
      //@ts-ignore
      signup_error = err.message;
    }
  };

  const signup_and_authenticate_user = async (
    signup_username: string,
    signup_password: string,
  ): Promise<{ message: string, token: string, user:string }> => {
    const url = `${auth_url}/signup`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username: signup_username, password: signup_password })
    });

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message);
    }

    return res.json();
  };

  const authenticateUser = async (
    login_username: string,
    login_password: string,
  ): Promise<{ message: string, token: string, user:string }> => {
    const url = `${auth_url}/login`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username: login_username, password: login_password })
    });

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message);
    }

    return res.json();
  };
</script>

<main>
  <div class="login-container">
    <h2>Signup</h2>

    <form on:submit={handle_signup_submission}>
      <input
        class="input-field"
        type="text"
        placeholder="Username"
        bind:value={signup_username}
      />

      <input
        class="input-field"
        type="password"
        placeholder="Password"
        bind:value={signup_password}
      />

      <input
        class="input-field"
        type="password"
        placeholder="Confirm Password"
        bind:value={signup_confirm_password}
      />

      <!-- <button class="btn" on:click={handle_login_submission}>Login</button> -->
      <input class="btn" type="submit" value="Login" />

      {#if login_error}
        <div class="login_error-message">{signup_error}</div>
      {/if}
    </form>
  </div>
  <div class="login-container">
    <h2>Login</h2>

    <form on:submit={handle_login_submission}>
      <input
        class="input-field"
        type="text"
        placeholder="Username"
        bind:value={login_username}
      />

      <input
        class="input-field"
        type="password"
        placeholder="Password"
        bind:value={login_password}
      />

      <!-- <button class="btn" on:click={handle_login_submission}>Login</button> -->
      <input class="btn" type="submit" value="Login" />

      {#if login_error}
        <div class="login_error-message">{login_error}</div>
      {/if}
    </form>
  </div>
</main>

<style>
  main {
    background-color: #444444;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-items: center;
  }
  .login-container {
    width: 100%;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #ddd;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .login-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .input-field {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }
  .input-field:focus {
    outline: none;
    border-color: #4caf50;
  }
  .btn {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #45a049;
  }
  .login_error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
</style>
