import pool from "../../db/pool.js";

export async function adminGetOrders(){
    const [rows] = await  pool.query(`
        SELECT
            orders.id AS order_id,
            orders.order_date,
            orders.ship_name,
            orders.ship_city,
            orders.ship_zip_postal_code,
            orders.ship_address,
            order_details.product_id,
            order_details.quantity,
            order_details.unit_price,
            products.product_name
        FROM orders
        JOIN order_details ON orders.id = order_details.order_id
        JOIN products ON order_details.product_id = products.id
        `
        )

    const orders = {}

    rows.forEach( r => {
        if( !orders[r.order_id] ){
            orders[r.order_id] = {
                order_id : r.order_id,
                order_date: r.order_date,
                ship_name : r.ship_name,
                ship_city : r.ship_city,
                ship_zip_postal_code: r.ship_zip_postal_code,
                ship_address: r.ship_address,
                items: []
            }
        }

        orders[r.order_id].items.push({
            product_id: r.product_id,
            product_name: r.product_name,
            quantity: r.quantity,
            unit_price: r.unit_price
        })
    }

    )


    return Object.values(orders).sort( (a,b)=> b.order_id - a.order_id)
}