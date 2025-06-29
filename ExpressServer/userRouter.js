const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.send({ id, message : "this is the get request" });
})

router.post("/:id", (req, res) => {
    const id = req.query.id;
    res.send({ id, message : "This is the post request" });
})

module.exports = router;