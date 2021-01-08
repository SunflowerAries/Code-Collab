const { backend } = require("../storage/storage.service");
const storage = require("../storage/storage.service");
const randomString = require("../utils/randstr-generator");
const { URL_LEN } = require("../utils/config");
const Doc = storage.Doc;

module.exports = {
  createDoc,
};

// Create initial document then fire callback
async function createDoc(docParam) {
  if (await Doc.findOne({ _id: docParam.docname, creator: docParam.creator })) {
    throw 'Docname "' + docParam.docname + '" is already taken';
  }

  const url = randomString(URL_LEN);
  const doc = new Doc({
    _id: docParam.docname,
    creator: docParam.creator,
    url: url,
  });
  await doc.save();

  var connection = backend.connect();
  var doc = connection.get("docs", docParam.docname);
  //   doc.fetch(function(err) {
  //     if (err) throw err;
  //     if (doc.type === null) {
  //       doc.create({content: ''});
  //       return;
  //     }
  //   });
}
