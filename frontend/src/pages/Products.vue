<template>
  <div>
    <h1>Products</h1>

    <div>
      <label>Filter by Category:</label>
      <select v-model="category" @change="onFilterChange">
        <option value="">All</option>
        <option v-for="c in categories" :key="c" :value="c">
          {{ c }}
        </option>
      </select>
    </div>

    <div>
      <label>Search by Name: </label>
      <input v-model="search" @input="onFilterChange" placeholder="Search...">
    </div>

    <div>
      <label >Sort by Price: </label>
      <select v-model="sort" @change="onFilterChange">
        <option value="">Default</option>
        <option value="asc">Price: Low > Hight</option>
        <option value="desc">Price: High > Low</option>
      </select>
    </div>

    <p>Number of results: <strong>{{ count }}</strong></p>

    <div>
      <ProductBox v-for="p in products" :key="p.id" :product="p" />
    </div>

    <div style="margin-top: 16px;">
      <BaseButton @click="prevPage" :disabled="page === 1">Previous</BaseButton>
      <span style="margin: 0 8px;">{{ page }}</span>
      <BaseButton @click="nextPage" :disabled="page * limit >= count">Next</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import ProductBox from '../components/ProductBox.vue';

const products = ref([]);
const count = ref(0);  
const page = ref(1);
const limit = 10;

const category = ref("");
const search = ref("")
const sort = ref("")

const categories = [
  "Beverages", "Condiments", "Oil", "Jams, Preserves",
  "Dried Fruit & Nuts", "Sauces", "Canned Fruit & Vegetables",
  "Baked Goods & Mixes", "Canned Meat", "Soups", "Candy",
  "Grains", "Pasta", "Dairy products", "Cereal", "Chips, Snacks"
];

async function fetchProducts(currentPage = page.value){
    let url = `http://localhost:3000/api/products?page=${currentPage}&limit=${limit}`

    if(category.value) url += `&category=${encodeURIComponent(category.value)}`
    if(search.value) url += `&search=${encodeURIComponent(search.value)}`
    if(sort.value) url += `&sort=${sort.value}`


    const res = await fetch(url)
    if(!res.ok) console.log("Error")
    const data = await res.json()

    products.value = data.results
    count.value = data.count
    page.value = currentPage
}


function nextPage() {
  if (page.value * limit < count.value) fetchProducts(page.value + 1);
}

function prevPage() {
  if (page.value > 1) fetchProducts(page.value - 1);
}

function onFilterChange() {
  page.value = 1;
  fetchProducts(1);
}

onMounted(() => {
  fetchProducts();
});
</script>



<style scoped>
div {
  padding: 24px;
  font-family: sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

select {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
}

p {
  margin-bottom: 12px;
  color: #555;
}

div > ProductCard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

div > BaseButton {
  margin-right: 8px;
  margin-top: 16px;
}
</style>