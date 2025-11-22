import pool from '../db/pool.js';

export async function getProducts({ page = 1, limit = 10, category }) {
  const offset = (page - 1) * limit;

  // اگر category مشخص شده باشه، شرط WHERE اضافه می‌کنیم
  let whereClause = '';
  let params = [];
  if (category) {
    whereClause = 'WHERE category = ?';
    params.push(category);
  }

  // اول تعداد کل محصولات مطابق فیلتر
  const [countResult] = await pool.query(
    `SELECT COUNT(*) as count FROM products ${whereClause}`,
    params
  );
  const total = countResult[0].count;

  // سپس خود محصولات با LIMIT و OFFSET
  const [rows] = await pool.query(
    `SELECT product_name, list_price, category 
     FROM products 
     ${whereClause} 
     LIMIT ? OFFSET ?`,
    [...params, parseInt(limit), parseInt(offset)]
  );

  return {
    count: total,
    results: rows
  };
}