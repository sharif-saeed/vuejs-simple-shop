import pool from '../db/pool.js';

export async function getProducts({ page = 1, limit = 10, category, search, sort }) {
  const offset = (page - 1) * limit;

  let where = []
  let params = [];

  if (category) {
    where.push("category = ?")
    params.push(category);
  }

  if(search){
    where.push("product_name LIKE ?")
    params.push(`%${search}%`)
  }

  const whereClause = where.length ? "WHERE " + where.join(" AND ")  :  ""

  const [countResult] = await pool.query(
    `SELECT COUNT(*) as count FROM products ${whereClause}`,
    params
  );
  const total = countResult[0].count;

  let orderBy = ""
  if(sort == "asc") orderBy = "ORDER BY list_price ASC"
  else if(sort == "desc") orderBy = "ORDER BY list_price DESC"

  const [rows] = await pool.query(
     `SELECT id, product_name, list_price, category 
     FROM products 
     ${whereClause} 
     ${orderBy}
     LIMIT ? OFFSET ?`,
    [...params, parseInt(limit), parseInt(offset)]
  );

  return {
    count: total,
    results: rows
  };
}