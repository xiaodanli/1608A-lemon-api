var sql = require('../../mysql/sql');

var query = require('../../mysql');

var uuid = require('node-uuid');

//添加账单
function addBill(req,res,next){
   var params = req.body;

   var uid = params.uid,
       cid = params.cid,
       create_time = params.create_time,
       money = params.money;
    
    if(!uid || !cid || !create_time || !money){
        res.json({code:4,msg:"缺少参数"})
    }else{
        var lid = uuid.v1();
        query(sql.ADD_BILL,[lid,uid,cid,create_time,money],function(error,results){
            if(error){
                res.json({code:0,error})
            }else{
                res.json({code:1,msg:"添加成功"})
            }
        })
    }
}

//删除账单
function delBill(req,res,next){
    var lid = req.query.lid;
    if(lid){
        query(sql.DEL_BILL,[lid],function(error,results){
            if(error){
                res.json({code:0,error})
            }else{
                res.json({code:1,msg:'删除成功'})
            }
        })
    }else{
        res.json({code:4,msg:"缺少参数"})
    }
}

//查询账单
function selectBill(req,res,next){
    var uid = req.query.uid;

    var timeType = req.query.timeType,  //1: 年月    2：年
        selectType = req.query.selectType; 
        // 1:收支类型（收入和支出）  2：收支分类（住宿，购物，福利）  不传：没有收支筛选

    var time = req.query.time,   //时间
        condition = req.query.condition;  //条件

    var sqlStr = '';

    console.log(uid);

    if(timeType == 1){ //按年月
        if(selectType == 2){
            sqlStr = sql.SELECT_MONTH_CLASSIFY_BILL;
        }else{
            sqlStr = sql.SELECT_MONTH_BILL;
        }
    }else{  //年
        if(selectType == 2){
            sqlStr = sql.SELECT_YEAR_CLASSIFY_BILL;
        }else{
            sqlStr = sql.SELECT_YEAR_BILL;
        }
    }

    if(uid){
        query(sqlStr,[uid,time,condition],function(error,results){
            console.log(uid,time,condition)
            console.log(sqlStr);
            if(error){
                res.json({code:0,error})
            }else{
                res.json({code:1,results})
            }
        })
    }else{
        res.json({code:2,msg:"用户不存在"})
    }
    
}

module.exports = {
    addBill:addBill,
    delBill:delBill,
    selectBill:selectBill
}