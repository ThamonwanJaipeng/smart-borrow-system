const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "borrow_system"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Database Connected");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

app.get("/items", (req, res) => {
    db.query("SELECT * FROM items", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

app.get("/logs", (req, res) => {
    const sql = `
        SELECT
            borrow_logs.id,
            users.name,
            items.item_name,
            borrow_logs.borrow_time,
            borrow_logs.return_time,
            borrow_logs.status
        FROM borrow_logs
        JOIN users ON borrow_logs.user_id = users.id
        JOIN items ON borrow_logs.item_id = items.id
        ORDER BY borrow_logs.id DESC
    `;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

app.post("/borrow", (req, res) => {
    const { user_id, item_id } = req.body;
    const sql = `
        INSERT INTO borrow_logs
        (
            user_id,
            item_id,
            borrow_time,
            status
        )
        VALUES
        (
            ?,
            ?,
            NOW(),
            'borrowed'
        )
    `;
    db.query(sql, [user_id, item_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        db.query("UPDATE items SET status='borrowed' WHERE id=?", [item_id]);
        res.json({ message: "Borrow Success" });
    });
});

app.post("/return", (req, res) => {
    const { item_id } = req.body;
    db.query(
        `UPDATE borrow_logs
         SET return_time=NOW(), status='returned'
         WHERE item_id=? AND status='borrowed'`,
        [item_id]
    );
    db.query(
        `UPDATE items SET status='available' WHERE id=?`,
        [item_id]
    );
    res.json({ message: "Return Success" });
});

app.listen(3000, () => {
    console.log("Server Running");
});