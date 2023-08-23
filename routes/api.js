var express = require("express");
var router = express.Router();
const User = require("../model/model");

/* GET home page. */
router.delete("/delete/:id", async function (req, res) {
  let id = req.params.id;
  try {
    let user = await User.findByIdAndRemove(id);
    if (user) {
      res.send(" Xoa thanh cong");
    } else {
      res.send("Tai khoan khong ton tai");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
