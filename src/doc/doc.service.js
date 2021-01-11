const { backend } = require("../storage/storage.service");
const storage = require("../storage/storage.service");
const randomString = require("../utils/randstr-generator");
const { URL_LEN } = require("../utils/config");
const Doc = storage.Doc;

module.exports = {
  createDoc,
  getDocs,
};

// Create initial document then fire callback
async function createDoc(userId, docParam) {
  console.log(`enter createDoc, ${docParam.docName}`);
  if (await Doc.findOne({ docName: docParam.docName, creator: userId })) {
    throw 'Docname "' + docParam.docName + '" is already taken';
  }

  const url = randomString(URL_LEN);

  const doc = new Doc({
    docName: docParam.docName,
    creator: userId,
    url,
  });
  await doc.save();

  var connection = backend.connect();
  var docFile = connection.get("docs", docParam.docName);
  docFile.fetch(function (err) {
    if (err) throw err;
  });
  console.log(doc);
  return doc;
}

async function getDocs(userId) {
  return await Doc.find({ creator: userId }, "url docName createdAt");
}
