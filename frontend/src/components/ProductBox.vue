<template>
  <div>
    <h3>{{ product.product_name }}</h3>

    <p>
      category: <strong>{{ product.category }}</strong>
    </p>

    <p>
      price: {{ product.list_price }} $
    </p>

    <BaseButton @click="addToCart">
      add to cart
    </BaseButton>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';
import BaseButton from './BaseButton.vue';

const props = defineProps(["product"]);

const cart = useCartStore();

const addToCart = () => {
  cart.addToCart(props.product); 
};
</script>


<style scoped>
div {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

div:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

p {
  color: #555;
  margin-bottom: 6px;
}

p:last-of-type {
  color: #222;
  font-weight: bold;
}

BaseButton {
  display: block;
  width: 100%;
  margin-top: 12px;
}
</style>
