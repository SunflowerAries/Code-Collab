const express = require("express");
const router = express.Router();
const docService = require("./doc.service");
const { ConflictException } = require("../utils/exception-code");

router.post("/", createDoc);
router.get("/", getDocs);
// router.get("/:url", getDocByURL);

module.exports = router;

function createDoc(req, res, next) {
  docService
    .createDoc(req.user.sub, req.body)
    .then((doc) =>
      doc
        ? res.json(doc)
        : doc
            .status(ConflictException)
            .json({ message: "Docname has been used" })
    )
    .catch((err) => next(err));
}

function getDocs(req, res, next) {
  docService
    .getDocs(req.user.sub)
    .then((docs) => res.json(docs))
    .catch((err) => next(err));
}
