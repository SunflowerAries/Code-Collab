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
  if (await Doc.findOne({ _id: docParam.docname, creator: userId })) {
    throw 'Docname "' + docParam.docname + '" is already taken';
  }

  const url = randomString(URL_LEN);
  const doc = new Doc({
    _id: docParam.docname,
    creator: userId,
    url: url,
  });
  await doc.save();

  var connection = backend.connect();
  var doc = connection.get("docs", docParam.docname);
  return {
    ...doc.toJSON()
  }
}

async function getDocs(userId) {
  return await Doc.find({ creator: userId }, 'url');
}