const { connection } = require("../storage/storage.service");
const storage = require("../storage/storage.service");
const Doc = storage.Doc;

module.exports = {
  createDoc,
  getDocs,
};

// Create initial document then fire callback
async function createDoc(userId, docParam) {
  console.log(`enter createDoc, ${docParam.docName}`);
  if (await Doc.findOne({ _id: docParam.docName, creator: userId })) {
    throw 'Docname "' + docParam.docName + '" is already taken';
  }

  var doc = connection.get("docs", docParam.docName);
  doc.fetch(function (err) {
    if (err) throw err;
    if (doc.type === null) {
      console.log("before create");
      doc.create({ content: "" });
      console.log("create");
      return docParam;
    }
  });
  return docParam;
}

async function getDocs() {
  return await Doc.find({}, "_id createdAt");
}
