import { defineStore } from 'pinia';
import {  computed, ref, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {

  let storedInLs = localStorage.getItem("cart")
  const items = ref(storedInLs ? JSON.parse(storedInLs) : [])

  // watch
  watch( items, (newCart)=>{
    localStorage.setItem("cart", JSON.stringify(newCart))
  }, {deep: true} )

  const addToCart = (product) => {
    const existing = items.value.find(
      item => item.product.product_name == product.product_name
    );

    if (existing) {
      existing.qty++;
    } else {
      items.value.push({ product, qty: 1 });
    }
  };

  const removeFromCart = (name) => {
    items.value = items.value.filter(
      item => item.product.product_name != name
    );
  };

  const increaseQty = (name) => {
    const item = items.value.find(i => i.product.product_name == name);
    if (item) item.qty++;
  };

  const decreaseQty = (name) => {
    const item = items.value.find(i => i.product.product_name == name);
    if (item && item.qty > 1) item.qty--;
  };

  const totalItems = computed(() => items.value.length);

  const totalPrice = computed(() => {
    let sum = 0;
    for (const item of items.value) {
      sum += item.product.list_price * item.qty;
    }
    return sum;
  });

  return {
    items,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice
  };
});