<script>
    import { goto } from "$app/navigation";
    import { logged_in, auth_token, user } from "$lib/store";
    import RedirectGate from "$lib/components/RedirectGate.svelte";
    
    const logout = () => {
        logged_in.set(false);
        auth_token.set("");
        user.set("");
        goto("/");
    }
</script>

<RedirectGate>
    <div class="header">
        <div class="header-top">
            <div>Cloud Computing: Group Assignment <button class="btn" on:click={logout}>Logout</button></div>
        </div>
        <div class="header-bottom">
            <div on:click={() => goto("/store")}><p>Store</p></div>
            <div on:click={() => goto("/store/listings")}><p>Your Listings</p></div>
            <div on:click={() => goto("/store/cart")}><p>Cart</p></div>
            <div on:click={() => goto("/store/past_orders")}><p>Order History</p></div>
        </div>
    </div>
    <div class="slot-wrapper">
        <slot />
    </div>
</RedirectGate>

<style>
    .header {
        height: 10vh;
        position: sticky;
        top: 0;
        display: grid;
        grid-template-rows: 65% auto;
    }
    .header-top {
        background-color: #2874f0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .header-top > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 2vw;
        color: #eee;
        font-size: 2em;
        font-weight: 700;
    }
    .header-bottom {
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        border-bottom: solid 1px #d8d8d8;
    }
    .header-bottom > div {
        height: 100%;
        padding: 0 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        cursor: pointer;
    }
    .header-bottom > div:hover {
        color: #2874f0;
        background-color: #f0f0f0;
        border-radius: 0.75em;
    }
    .header-bottom > div > p {
        box-sizing: border-box;
        margin: 0;
    }
    .slot-wrapper {
        background-color: #eee;
        min-height: 100vh;
    }
    .btn {
        /* width: 100%; */
        padding: 4px;
        margin-top: 8px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .btn:hover {
        background-color: #45a049;
    }
</style>
