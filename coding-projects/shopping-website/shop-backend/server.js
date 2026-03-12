const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ram@0111",   // ⚠️ no trailing space
  database: "shop_and_shop"
});

db.connect(err => {
  if (err) {
    console.error("DB Connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.post("/payment", (req, res) => {
  const { name, email, phone, address, items, totalAmount } = req.body;

  if (!name || !email || !phone || !address || !items?.length) {
    return res.json({ success: false, message: "Invalid order data" });
  }

  db.query(
    "INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)",
    [name, email, phone, address],
    (err, userResult) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "User insert failed" });
      }

      const userId = userResult.insertId;

      db.query(
        "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
        [userId, totalAmount],
        (err, orderResult) => {
          if (err) {
            console.error(err);
            return res.json({ success: false, message: "Order insert failed" });
          }

          const orderId = orderResult.insertId;

          const itemValues = items.map(item => [
            orderId,
            item.name,
            item.price,
            item.qty
          ]);

          db.query(
            "INSERT INTO order_items (order_id, product_name, product_price, quantity) VALUES ?",
            [itemValues],
            err => {
              if (err) {
                console.error(err);
                return res.json({ success: false, message: "Items insert failed" });
              }

              res.json({ success: true, message: "Payment successful!" });
            }
          );
        }
      );
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
