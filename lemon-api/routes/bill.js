var express = require('express');
var router = express.Router();

var billApi = require('./bills');

//添加账单
router.post('/api/addBill',billApi.addBill);

//删除账单
router.get('/api/delBill',billApi.delBill);

//查询账单
router.get('/api/selectBill',billApi.selectBill);

module.exports = router;