/*
 * @FilePath: \node登录注册\server\routers\admin.js
 */
var express = require("express");
var router = express.Router();
var User = require("../Models/User");

// console.log(express);
// console.log(router.get);
router.get("/user", function (req, res, next) {
  User.find({}, function (err, doc) {
    console.log(doc, "asdasd");
    res.send(doc);
  });
});
// 返回数据
module.exports = router;
