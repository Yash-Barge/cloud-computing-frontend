<script lang="ts">
    import { onMount } from "svelte";
    import { cart_url } from "$lib/url";
    import auth_fetch from "$lib/fetch";

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
        <button class="btn">Place Order</button>
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
</style>