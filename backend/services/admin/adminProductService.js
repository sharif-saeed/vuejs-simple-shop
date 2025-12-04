import pool from "../../db/pool.js";

export async function adminGetProducts(){
    const [rows] = await pool.query(`SELECT * FROM products ORDER BY id ASC`)
    return rows
}

export async function adminCreateProduct({ product_name, list_price, category }){
    const [result] = await pool.query(
        `INSERT INTO products (product_name, list_price, category) VALUES (?, ?, ?)`,
        [product_name, list_price, category]
    )
    return result.insertId
}

export async function adminUpdateProduct(id, {product_name, list_price, category}){
    await pool.query(
        `UPDATE products SET product_name=?, list_price=?, category=? WHERE id=?`,
        [product_name, list_price, category, id]
    )
    return true
}

export async function adminDeleteProduct(id){
    await pool.query(`DELETE FROM products WHERE id=?`, [id])
    return true
}