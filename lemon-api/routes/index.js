var express = require('express');
var router = express.Router();

var classifyApi = require('./classify');

/*添加分类 */
router.post('/api/addClassify',classifyApi.addClassify );

//获取分类图标
router.get('/api/getCIcon',classifyApi.getCIcon);

//获取所有分类
router.get('/api/getClassify',classifyApi.getClassify);

module.exports = router;
