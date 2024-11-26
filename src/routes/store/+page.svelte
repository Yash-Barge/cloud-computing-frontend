<script lang="ts">
    import { onMount } from "svelte";
    import { products_url, cart_url } from "$lib/url";
    import auth_fetch from "$lib/fetch";

    interface product {
        product_id: number;
        name: String;
        seller: String;
        quantity: number;
        unit_price: number;
    };

    let products: product[] = [];
    let cart: product[] = [];

    const fetch_products = async () => {
        const res = await auth_fetch(products_url);
        const data = await res.json();

        return data;
    }

    const fetch_cart = async () => {
        const res = await auth_fetch(cart_url);
        const data = await res.json();

        return data;
    }

    const add_to_cart = async (e: Event, product: product) => {
        e.preventDefault();

        let index = cart.findIndex(item => item.name === product.name);

        if (index === -1) {
            let payload = cart;
            payload.push({ ...product, quantity: 1 });
            const res = await auth_fetch(cart_url, {
                method: "PUT",
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                cart = payload;
            } else {
                console.error(res);
            }
        } else if (product.quantity > cart[index].quantity) {
            let payload = cart;
            payload[index].quantity++;
            const res = await auth_fetch(cart_url, {
                method: "PUT",
                body: JSON.stringify(payload)
            });
            
            if (res.ok) {
                cart = payload;
            } else {
                console.error(res);
            }
        }
    }

    const remove_from_cart = async(e: Event, index: number) => {
        e.preventDefault();

        let payload: product[];

        if (cart[index].quantity == 1) {
            payload = cart.filter(product => product.name !== cart[index].name);
        } else {
            payload = cart;
            payload[index].quantity--;
        }

        const res = await auth_fetch(cart_url, {
            method: "PUT",
            body: JSON.stringify(payload)
        });
        
        if (res.ok) {
            cart = payload;
        } else {
            console.error(res);
        }
    }

    onMount(async () => {
        products = await fetch_products();
        cart = await fetch_cart();
    })
</script>

<main>
    <div class="sidebar">
        <div class="cart-title">Cart contents:</div>
        {#each cart as product, i}
            <div class="product-card cart-card">
                <p>{product.name}</p>
                <p>Sold by: {product.seller}</p>
                <p>Price: {product.unit_price}</p>
                <p>Quantity: {product.quantity}</p>
                <button class="btn" on:click={e => remove_from_cart(e, i)}>Remove 1 to cart</button>
            </div>
        {/each}
    </div>
    <div class="products-wrapper">
        {#each products as product}
            <div class="product-card">
                <p>{product.name}</p>
                <p>Sold by: {product.seller}</p>
                <p>Price: {product.unit_price}</p>
                <p>Quantity available: {product.quantity}</p>
                <button class="btn" on:click={e => add_to_cart(e, product)}>Add 1 to cart</button>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 18% auto;
    }
    .sidebar {
        background-color: #fff;
        min-height: 100vh;
        border-right: solid 1px #d8d8d8;
    }
    .cart-title {
        font-size: 3vh;
        padding: 2vh 1vh;
        border-bottom: solid 1px #d8d8d8;
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
        background-color: #fff;
        /* looks scuffed with few entries */
        /* height: fit-content; */
    }
    .cart-card {
        border-bottom: solid 1px #d8d8d8;
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
