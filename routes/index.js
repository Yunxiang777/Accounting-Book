var express = require('express');
var router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const shortId = require('shortid');

/* 共用版型 */
function setLayout(res, page, options) {
  res.render('layout', { content: page, ...options });
}

/* 列表頁 */
router.get('/account', function (req, res, next) {
  setLayout(res, 'list', { accounts: db.get('accounts').value() });
});

/* 記帳頁 */
router.get('/account/create', function (req, res, next) {
  setLayout(res, 'createAccount');
});

/* 添加項目 */
router.post('/account', function (req, res) {
  try {
    db.get('accounts').unshift({ id: shortId.generate(), ...req.body }).write();
    setLayout(res, 'alert', { result: true, message: '添加成功' });
  } catch (err) {
    setLayout(res, 'alert', { result: false, message: '添加失敗' });
  }
});

/* 刪除項目 */
router.get('/account/:id', function (req, res) {
  db.get('accounts').remove({ id: req.params.id }).write();
  setLayout(res, 'list', { accounts: db.get('accounts').value() });
});

module.exports = router;
