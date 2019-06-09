const albums = require("./albums");
const path = require("path");

/* GET home page. */
module.exports = (router, connection) => {
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  });
  albums(router, connection);
};
