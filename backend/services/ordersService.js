import pool from '../db/pool.js';

export async function createOrder({customer, items}){
    const connection = await pool.getConnection()

    await connection.beginTransaction()

    const [orderResult] = await connection.query(
        `INSERT INTO orders
        (order_date, ship_name, ship_city, ship_zip_postal_code, ship_address)
        VALUES (NOW(), ?, ?, ?, ?)`,
        [customer.name_ship, customer.ship_city, customer.ship_zip_postal_code, customer.ship_address]
        
    )

    const orderId = orderResult.insertId

    for(const item of items){
       await connection.query(
        `INSERT INTO order_details
        (order_id, product_id, quantity, unit_price)
        VALUES (?, ?, ?, ?)`,
        [orderId, item.product.id, item.qty, item.product.list_price]
        
       )
    }

    await connection.commit()

    connection.release()

    return {orderId}

}