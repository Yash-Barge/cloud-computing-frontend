<script lang="ts">
    import { onMount } from "svelte";
    import { env } from "$env/dynamic/public";

    interface product {
        product_id: Number;
        name: String;
        seller: String;
        quantity: Number;
        unit_price: Number;
    };

    let products: product[] = [];

    const fetch_products = async () => {
        const res = await fetch(env.PUBLIC_PRODUCTS_URL);
        const data = await res.json();

        return data;
    }

    onMount(async () => {
        products = await fetch_products();
        console.log("data: ", products);
    })
</script>

<div class="header">
    <div class="header-top">
        <p>Cloud Computing: Group Assignment</p>
    </div>
    <div class="header-bottom">
        <div><p>Store</p></div>
        <div><p>Your Listings</p></div>
        <div><p>Cart</p></div>
        <div><p>Order History</p></div>
    </div>
</div>
<main>
    <div class="sidebar">
        hello
    </div>
    <div class="products-wrapper">
        {#each [1,2,3,4,5,6,7,8,9] as num}
            {#each products as product}
                <div class="product-card">
                    <p>{product.name}</p>
                    <p>Sold by: {product.seller}</p>
                    <p>Price: {product.unit_price}</p>
                    <p>Quantity available: {product.quantity}</p>
                </div>
            {/each}
        {/each}
    </div>
</main>

<style>
    .header {
        height: 10vh;
        position: sticky;
        top: 0;
        display: grid;
        grid-template-rows: 65% auto;
    }
    .header-top {
        background-color: blue;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .header-top > p {
        margin: 0 2vw;
        color: #eeeeee;
        font-size: 2em;
        font-weight: 700;
    }
    .header-bottom {
        background-color: #ffff00;
        display: flex;
        justify-content: space-around;
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
        background-color: #dddd00;
    }
    .header-bottom > div > p {
        box-sizing: border-box;
        margin: 0;
    }
    main {
        background-color: #444444;
        min-height: 100vh;
        display: grid;
        grid-template-columns: 18% auto;
    }
    .sidebar {
        background-color: aqua;
        min-height: 100vh;
    }
    .products-wrapper {
        display: grid;
        grid-template-columns: auto auto auto auto;
        padding: 3vh;
        column-gap: 3vh;
        row-gap: 3vh;
    }
    .product-card {
        padding: 8px 20px;
        background-color: #eeeeee;
    }
</style>
