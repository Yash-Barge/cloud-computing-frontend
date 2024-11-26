<script lang="ts">
    import { onMount } from "svelte";
    import { orders_url } from "$lib/url";
    import auth_fetch from "$lib/fetch";

    interface product {
        product_id: number;
        name: String;
        seller: String;
        quantity: number;
        unit_price: number;
    };

    interface order {
        username: string;
        order_id: number;
        order_date: string;
        order_contents: product[];
    };

    let orders: order[] = [];

    const fetch_past_orders = async () => {
        const res = await auth_fetch(orders_url);
        const data = await res.json();

        return data;
    }

    onMount(async () => {
        orders = await fetch_past_orders();
    });
</script>

<main>
    <div class="products-wrapper">
        {#each orders as order}
            <div class="order-card">
                <h3>Order Date: {order.order_date}</h3>
                {#each order.order_contents as product}
                    <div class="product-card">
                        <p>{product.name}</p>
                        <p>Sold by: {product.seller}</p>
                        <p>Price: {product.unit_price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Total price: {product.quantity * product.unit_price}</p>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 50% auto;
    }
    .order-card {
        padding: 8px 20px;
        margin: 1vh;
        background-color: #fff;
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
        border: solid 1px #d8d8d8;
    }
</style>