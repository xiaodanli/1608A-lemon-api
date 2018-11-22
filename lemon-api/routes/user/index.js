var sql = require('../../mysql/sql');

var query = require('../../mysql');

var uuid = require('node-uuid');

function addUser(req,res,next){
    var params = req.body;

    var nickName = params.nickName;  // 'lixd'  ''

    var uid = params.uid;

    if(!uid){
        userIsHas();
    }else{
        res.json({code:3,msg:"用户已存在"})
    }

    //检查昵称是否存在
    function userIsHas(){
        query(sql.USER_ISHAS,[nickName],function(error,results){  //null results
            if(error){
                res.json({code:0,msg:"服务有错误"})
            }else{
                if(results.length > 0 ){
                    res.json({code:3,msg:"昵称已经使用"})
                }else{
                    add();
                }
            }
        })
    }

    //添加
    function add(){
        uid = uuid.v1();
        console.log("=====");
        query(sql.ADD_USER,[uid,nickName],function(error,results){
            if(error){
                res.json({code:0,msg:"服务有错误"})
            }else{
                res.json({code:1,msg:"添加成功",uid:uid})
            }
        })
    }
}

module.exports = {
    addUser:addUser
}
