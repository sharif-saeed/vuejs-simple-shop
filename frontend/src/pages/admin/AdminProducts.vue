<template>
    <h1>Product Management</h1>

    <div>
        <h3>{{ editId ? "Edit Product" : "Add New Product" }}</h3>

        <input v-model="product_name" placeholder="Product name...">
        <input v-model="list_price" type="number" placeholder="Product price...">
        <input v-model="category" placeholder="Product category...">

        <button @click="saveProduct">Submit</button>
        <button @click="cancelEdit" v-if="editId">Cancel</button>
    </div>

    <hr />

    <table border="1" cellpadding="8">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="p in products" :key="p.id">
                <td>{{ p.id }}</td>
                <td>{{ p.product_name }}</td>
                <td>{{ p.list_price }}</td>
                <td>{{ p.category }}</td>
                <td> 
                    <button @click="startEdit(p)">Edit</button>
                    <button @click="deleteProduct(p.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>


</template>

<script setup>
import { onMounted, ref } from 'vue';


const products = ref([])
const editId = ref(null)

const product_name = ref("")
const list_price = ref("")
const category = ref("")

const loadProducts = async()=>{
    const res = await fetch("http://localhost:3000/admin/products")
    products.value = await res.json()
}

function startEdit(p){
    editId.value = p.id
    product_name.value = p.product_name
    list_price.value = p.list_price
    category.value = p.category
}

function cancelEdit(){
    editId.value = null
    product_name.value = ""
    list_price.value = ""
    category.value = ""
}

async function saveProduct(){
    if(!product_name.value || !list_price.value){
        return
    }

    const help = {
        product_name: product_name.value,
        list_price: list_price.value,
        category: category.value
    }

    if(editId.value){
        await fetch(`http://localhost:3000/admin/products/${editId.value}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(help)
        })
    } else{
        await fetch(`http://localhost:3000/admin/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(help)
    })
}
    cancelEdit()
    loadProducts()
}


async function deleteProduct(id){
  if (!confirm("Are you sure you want to delete this product?")) return;

  await fetch(`http://localhost:3000/admin/products/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}


onMounted(()=>{
    loadProducts()
})

</script>