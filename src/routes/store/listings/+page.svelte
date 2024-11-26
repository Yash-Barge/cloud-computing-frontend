<script lang="ts">
    import { onMount } from "svelte";
    import { products_url } from "$lib/url";
    import auth_fetch from "$lib/fetch";

    let name: string = "";
    let quantity: number = 0;
    let unit_price: number = 0;

    interface product {
        product_id: number;
        name: String;
        seller: String;
        quantity: number;
        unit_price: number;
    };

    let products: product[] = [];

    const fetch_products = async () => {
        const res = await auth_fetch(`${products_url}?seller`);
        const data = await res.json();

        return data;
    }

    onMount(async () => {
        products = await fetch_products();
    });

    const handle_submit = async () => {
        const payload = { name, quantity, unit_price };
        const response = await auth_fetch(`${products_url}`, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        products.push(data);
        products = products;

        name = "";
        quantity = 0;
        unit_price = 0;
    }
</script>

<main>
    <div class="products-wrapper">
        {#each products as product}
            <div class="product-card">
                <p>{product.name}</p>
                <p>Price: {product.unit_price}</p>
                <p>Quantity available: {product.quantity}</p>
            </div>
        {/each}
    </div>
    <form class="form" on:submit={e =>{ e.preventDefault(); handle_submit(); }}>
        <h2>Create new product listing</h2>
        <label for="name">Name</label>
        <input
          class="input-field"
          type="text"
          id="name"
          placeholder="Name"
          bind:value={name}
        />
  
        <label for="quantity">Quantity</label>
        <input
          class="input-field"
          type="number"
          id="quantity"
          placeholder="Quantity"
          bind:value={quantity}
        />

        <label for="price">Unit Price</label>
        <input
          class="input-field"
          type="number"
          id="price"
          placeholder="Unit Price"
          bind:value={unit_price}
        />
  
        <input class="btn" type="submit" value="Create product listing" />
      </form>
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