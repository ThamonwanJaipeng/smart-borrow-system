const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Smart Borrow System Running");
});

app.listen(3000, () => {
    console.log("Server Running");
});