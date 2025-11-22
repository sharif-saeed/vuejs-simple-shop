<template>
  <BaseNavBar>
    <template #firstPart>
      <router-link to="/products">Shop</router-link>
    </template>
    <template #secondPart>
      <h1>Shop-Web</h1>
    </template>
    <template #thirdPart>
      <router-link to="/cart">Cart</router-link>
    </template>
  </BaseNavBar>

  <main class="p-4">
    <router-view />
  </main>

  <footer class="text-center p-4 border-t mt-4">
    &copy; 2025 Shop-Web
  </footer>
</template>

<script setup>
import BaseNavBar from './components/BaseNavBar.vue';
</script>

<style>
main {
  min-height: calc(100vh - 120px);
}
</style>
