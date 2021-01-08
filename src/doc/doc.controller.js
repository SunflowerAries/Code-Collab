const express = require("express");
const router = express.Router();
const docService = require("./doc.service");

router.post("/", createDoc);

module.exports = router;

function createDoc(req, res, next) {
  docService
    .createDoc(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
