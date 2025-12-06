<template>
    <h1>Admin Orders</h1>

    <div v-for="order in orders" :key="order.order_id">
        <h3>Order #{{ order.order_id }} - {{ order.order_date }}</h3>

        <table border="1" cellpadding="5">
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{{ order.ship_name }}</td>
                </tr>

                <tr>
                    <th>City</th>
                    <td>{{ order.ship_city }}</td>
                </tr>

                <tr>
                    <th>ZIP code</th>
                    <td>{{ order.ship_zip_postal_code }}</td>
                </tr>

                <tr>
                    <th>Address</th>
                    <td>{{ order.ship_address }}</td>
                </tr>
            </tbody>
        </table>


        <table border="1" cellpadding="5">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th> Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in order.items">
                    <td>{{ item.product_id }}</td>
                    <td>{{ item.product_name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.unit_price }}</td>
                </tr>
            </tbody>

        </table>
    </div>

</template>


<script setup>
import { onMounted, ref } from 'vue';


const orders = ref([])

async function fetchOrders(){
    const res = await fetch('http://localhost:3000/admin/orders')
    const data = await res.json()
    orders.value = data
}

onMounted( ()=>{
    fetchOrders()
} )

</script>