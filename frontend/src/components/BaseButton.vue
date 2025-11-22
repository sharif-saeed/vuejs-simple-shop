<!-- <template>
  <button 
    :type="type" 
    @click="$emit('click')" 
    class="base-button"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  }
});
</script> -->

<template>
  <button 
    :type="type"
    @click="handleClick"
    class="base-button"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  }
});

const emit = defineEmits(["click"]);

function handleClick(event) {
  emit("click", event);   // فقط یک بار emit می‌شود
}
</script>


<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  background-color: #049007;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.base-button:hover {
  background-color: #005701;
}
</style>