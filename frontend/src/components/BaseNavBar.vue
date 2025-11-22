<template>
  <nav class="base-navbar">
    <slot name="firstPart"></slot>
    <slot name="secondPart"></slot>
    <slot name="thirdPart"></slot>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.base-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6; 
  border-bottom: 1px solid #e5e7eb;
}
</style>