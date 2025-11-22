<template>
  <div>
    <h1>Your Cart</h1>

    <div v-if="cart.items.length === 0">
      <p>Your cart is empty</p>
    </div>

    <div v-else>
      <div v-for="item in cart.items" :key="item.product.product_name" class="cart-item">
        <h3>{{ item.product.product_name }}</h3>
        <p>Category: <strong>{{ item.product.category }}</strong></p>
        <p>Price: {{ item.product.list_price }} $</p>

        <div class="qty-controls">
          <BaseButton @click="cart.decreaseQty(item.product.product_name)">-</BaseButton>
          <span>{{ item.qty }}</span>
          <BaseButton @click="cart.increaseQty(item.product.product_name)">+</BaseButton>
        </div>

        <div class="remove-button">
          <BaseButton @click="cart.removeFromCart(item.product.product_name)">Remove</BaseButton>
        </div>
      </div>

      <h2>Total Price: {{ cart.totalPrice }} $</h2>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import { useCartStore } from '../stores/cartStore';

const cart = useCartStore();
</script>


<style>
.cart-item {
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 12px;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-button {
  margin-top: 8px;
}
</style>
