<template>
  <div>
    <h1>Checkout</h1>

    <form @submit.prevent="submitOrder">
      <div>
        <label>Receiver Name</label>
        <input v-model="form.name_ship" required />
      </div>

      <div>
        <label>City</label>
        <input v-model="form.ship_city" required />
      </div>

      <div>
        <label>Postal Code</label>
        <input v-model="form.ship_zip_postal_code" required />
      </div>

      <div>
        <label>Address</label>
        <textarea v-model="form.ship_address" required></textarea>
      </div>

      <BaseButton type="submit">Order</BaseButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { useCartStore } from '@/stores/cartStore';

const cart = useCartStore();

const form = ref({
  name_ship: '',
  ship_city: '',
  ship_zip_postal_code: '',
  ship_address: ''
});

const submitOrder = async () => {
  const orderData = {
    customer: form.value,
    items: cart.items
  };

  const response = await fetch('http://localhost:3000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  if (response.ok) {
    alert('Order successfully created ✅');
    cart.items = [];
  } else {
    alert('Error while creating order ❌');
  }
};
</script>

