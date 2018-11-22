var sql = require('../../mysql/sql');

var query = require('../../mysql');

var uuid = require('node-uuid');

//添加分类
function addClassify(req,res,next){
    var params = req.body;

    var cName = params.cName,
        cIcon = params.cIcon,
        cType = params.cType,
        uid = params.uid;
    
    if(!cName || !cIcon || !cType || !uid){
        res.json({code:4,msg:"丢失参数"})
    }else{
        classifyIsHas(); 
    }

    //查询分类是否存在
    function classifyIsHas(){
        query(sql.CLASSIFY_ISHAS,[uid,cName],function(error,results){
            if(error){
                res.json({code:0,msg:"服务器错误"})
            }else{
                if(results.length > 0){
                    res.json({code:3,msg:"此分类已存在"})
                }else{
                    add();
                }
            }
        })  
    }

    //添加分类
    function add(){
        var cid = uuid.v1();
        query(sql.ADD_CLASSIFY,[cid,cName,cIcon,cType,uid],function(error,results){
            if(error){
                res.json({code:0,msg:"服务器错误"})
            }else{
                res.json({code:1,msg:"添加成功",cid:cid})
            }
        })
    }

}

//获取分类图标
function getCIcon(req,res,next){
    query(sql.SELECT_ICONS,function(error,results){
        if(error){
            res.json({code:0,msg:"服务器错误"})
        }else{
            res.json({code:1,results})
        }
    })
}


//获取分类
function getClassify(req,res,next){
    var uid = req.query.uid;
    query(sql.GET_CLASSIFY,[uid],function(error,results){
        if(error){
            res.json({code:0,msg:"服务器错误"})
        }else{
            res.json({code:1,results})
        }
    })
}

module.exports = {
    addClassify:addClassify,
    getCIcon:getCIcon,
    getClassify:getClassify
}