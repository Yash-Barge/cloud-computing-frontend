<script lang="ts">
  import { goto } from "$app/navigation";
  import { logged_in } from "$lib/store";

  import { env } from '$env/dynamic/public';

  let username: string = "";
  let password: string = "";
  let error: string = "";

  // Handle form submission
  const handleSubmit = async () => {
    if (!username || !password) {
      error = "Both fields are required.";
      return;
    }
    try {
      const isAuthenticated = await authenticateUser(username, password);

      if (isAuthenticated) {
        logged_in.set(true);
        goto("/store");
      } else {
        error = "Invalid username or password.";
      }
    } catch (err) {
      //@ts-ignore
      error = err.message;
    }
  };

  const authenticateUser = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const url = env.PUBLIC_AUTH_URL + '/login';
    // Here you would typically call an API to authenticate the user
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(username === "admin" && password === "password123");
    //   }, 100); // Simulate a delay for the authentication request
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message);
    }

    return res.json()
    ;
  };
</script>

<main>
  <div class="login-container">
    <h2>Login</h2>

    <form on:submit={handleSubmit}>
      <input
        class="input-field"
        type="text"
        placeholder="Username"
        bind:value={username}
      />

      <input
        class="input-field"
        type="password"
        placeholder="Password"
        bind:value={password}
      />

      <!-- <button class="btn" on:click={handleSubmit}>Login</button> -->
      <input class="btn" type="submit" value="Login" />

      {#if error}
        <div class="error-message">{error}</div>
      {/if}
    </form>
  </div>
</main>

<style>
  main {
    background-color: #444444;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
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
  .error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
</style>
