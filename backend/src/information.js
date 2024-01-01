const express = require("express");
const categories = require("./data");
const connection = require("../connection");
const router = express.Router();

router.get("/homeCategories", (req, res) => {
    query = "SELECT * FROM categories WHERE active = 1 LIMIT 5;";
    connection.query(query, (err, results) => {
        if (!err) res.json(results);
        else res.status(500).send(err);
    });
});

router.get("/activeCategories", (req, res) => {
    query = "SELECT * FROM categories WHERE active = 1";
    connection.query(query, (err, results) => {
        if (!err) res.json(results);
        else res.status(500).send(err);
    });
});

router.get("/categories", (req, res) => {
    query = "SELECT * FROM categories";
    connection.query(query, (err, results) => {
        if (!err) res.json(results);
        else res.status(500).send(err);
    });
});

router.post("/categorie/:id", (req, res) => {
    query = "SELECT * FROM categories";
    connection.query(query, (err, results) => {
        if (!err) res.json(results);
        else res.status(500).send(err);
    });
});

module.exports = router;
