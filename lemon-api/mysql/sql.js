module.exports = {
    //添加用户
    ADD_USER:'insert into userlist (uid,nick_name) values (?,?)',

    //查询此昵称是否存在
    USER_ISHAS:'select * from userlist where nick_name=?',

    //查询新建图标
    SELECT_ICONS:'select * from iconlist',

    //添加分类
    ADD_CLASSIFY:'insert into classify (cid,c_name,c_icon,c_type,uid) values (?,?,?,?,?)',

    //查询此分类是否存在
    CLASSIFY_ISHAS:'select * from classify where (uid=? or uid="*") and c_name=?',

    //获取所有的分类
    GET_CLASSIFY:'select * from classify where (uid=? or uid="*")',

    //添加账单
    //uid
    ADD_BILL:'insert into loginfo (lid,uid,cid,create_time,money) values (?,?,?,?,?)',

    //删除账单
    DEL_BILL:'delete from loginfo where lid=?',

    //查询所有的账单

    //按年月查询账单
    SELECT_MONTH_BILL:'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and date_format(l.create_time,"%Y-%m")=? order by create_time desc',

    //按年月并且按分类查询账单  c.c_name in (?)   ['电话费','旅游',...]
    SELECT_MONTH_CLASSIFY_BILL:'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and date_format(l.create_time,"%Y-%m")=? and c.c_name in (?) order by create_time desc',

    //按年查询账单
    SELECT_YEAR_BILL:'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and date_format(l.create_time,"%Y")=? order by create_time desc',
    
    //按年并且按分类查询账单  c.c_name in (?)   ['电话费','旅游',...]
    SELECT_YEAR_CLASSIFY_BILL:'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and date_format(l.create_time,"%Y")=? and c.c_name in (?) order by create_time desc',
    
    //查询收支分类
    TYPE_BILL:'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and c.c_type=?',
    
    //查询分类
    CLASSIFY_BILL:'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and c.c_name=?'
    
}




