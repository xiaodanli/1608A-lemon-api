/*
 * @Author: 李晓丹 
 * @Date: 2018-11-07 14:59:17 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-11-09 11:00:13
 */

var  mysql = require('mysql');

var config = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'1608A-lemon',
    connectionLimit:100
}

var pool = mysql.createPool(config);
 
// select * from userlist where id=?   [2]   fn 回调函数

// select * from userlist  fn 

/**
 * 
 * @param {string} sql sql语句
 * @param {array} query sql需要的参数
 * @param {function} fn 回调函数
 *
 */
module.exports = function(sql,query,fn){   //('select * from userlist where id=?',,function(){})


    fn = fn ? fn : query;

    query = query || [];

    function connectionCallback(error,con){
        if(error){
            fn(error)
        }else{
            con.query(sql,query,function(err,results){
                con.release();
                queryCallback(err,results);
            })
        }
    }

    function queryCallback(err,results){

        // err
        if(err){
            fn(err);
        }else{
            fn(null,results);
        }
    }

    pool.getConnection(connectionCallback)
}