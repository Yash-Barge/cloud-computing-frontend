<script lang="ts">
    import { onMount } from "svelte";
    import { cart_url, orders_url } from "$lib/url";
    import auth_fetch from "$lib/fetch";
    import { goto } from "$app/navigation";

    interface product {
        product_id: number;
        name: String;
        seller: String;
        quantity: number;
        unit_price: number;
    };

    let cart: product[] = [];

    const fetch_cart = async () => {
        const res = await auth_fetch(cart_url);
        const data = await res.json();

        return data;
    }

    const place_order = async (e: Event) => {
        e.preventDefault();

        const res = await auth_fetch(orders_url, { method: "POST" });
        
        if (res.ok) {
            goto("/store/past_orders");
        } else {
            console.error(res);
        }
    }

    onMount(async () => {
        cart = await fetch_cart();
    });

    $: total_price = cart.reduce((a, b) => a + b.quantity*b.unit_price, 0);
</script>

<main>
    <div class="products-wrapper">
        {#each cart as product}
            <div class="product-card">
                <p>{product.name}</p>
                <p>Sold by: {product.seller}</p>
                <p>Price: {product.unit_price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Total price: {product.quantity * product.unit_price}</p>
            </div>
        {/each}
    </div>
    <div class="form">
        <h2>Cart Summary</h2>
        <h3>Total Price: {total_price}</h3>
        <button class="btn" on:click={place_order}>Place Order</button>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 50% auto;
    }
    .products-wrapper {
        display: flex;
        flex-direction: column;
        padding: 3vh;
    }
    .product-card {
        padding: 8px 20px;
        margin: 1vh;
        background-color: #fff;
    }
    .form {
        margin: 3vh;
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
</style>