const express = require("express");
const router = express.Router();
const docService = require("./doc.service");
const { ConflictException } = require("../utils/exception-code");
var util = require('util');

router.post("/", createDoc);
router.get("/", getDocs);

module.exports = router;

function getDocs(req, res, next) {
  docService
    .getDocs()
    .then((docs) => res.json(docs))
    .catch((err) => next(err));
}

function createDoc(req, res, next) {
  docService
    .createDoc(req.user.sub, req.body)
    .then((doc) => 
      doc
      ? res.json(doc)
      : res
          .status(ConflictException)
          .json({ message: "Docname has been used" })
    )
    .catch((err) => next(err));
}
