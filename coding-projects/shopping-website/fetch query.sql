SELECT 
  users.name,
  users.email,
  users.phone,
  users.address,
  orders.id AS order_id,
  orders.total_amount,
  order_items.product_name,
  order_items.product_price,
  order_items.quantity
FROM orders
JOIN users ON orders.user_id = users.id
JOIN order_items ON order_items.order_id = orders.id;
