var getTime = require("./../modules/getTime");
console.log("getTime:", getTime);
var mongodb = require("mongodb"); //引入mongodb
var MongoClient = mongodb.MongoClient;
var dbUrl = "mongodb://localhost:27017";
module.exports.addPost = function(req, res) {
    var obj = req.body;
    obj.time = getTime.getTime();
    console.log("/addPost obj:", obj);
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db2) { //db2,关联数据库成功
        //4.判断是否连接数据库成功
        if (err) {
            //将连接失败的信息1返回给前台
            console.log("连接数据库失败", err); //网络中断/数据库地址错误/端口号错误/数据服务没有启动
        } else {
            console.log("数据库连接成功");
            //5.关联数据库
            var dbase = db2.db("fruit"); //数据库名

            //6.dbase要操作的数据库;collection关联集合;insert,如何操作数据(插入)
            dbase.collection("data").insertOne(obj, function(err, result) {
                if (err) {
                    console.log("数据添加到mongodb失败");
                    //将操作失败的信息2返回给前台
                } else {
                    console.log("数据添加到mongodb成功", result.result);
                    //7.关闭数据库连接
                    res.send(result)
                    db2.close();
                    //将操作 成功的信息3返回给前台
                }
            })
        }
    })


}
module.exports.getData = function(req, res) {
    var obj = req.body;
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db2) { //db2,关联数据库成功
        //4.判断是否连接数据库成功
        if (err) {
            //将连接失败的信息1返回给前台
            console.log("连接数据库失败", err); //网络中断/数据库地址错误/端口号错误/数据服务没有启动
        } else {
            console.log("数据库连接成功");
            //5.关联数据库
            var dbase = db2.db("fruit"); //数据库名

            //6.dbase要操作的数据库;collection关联集合;insert,如何操作数据(插入)
            dbase.collection("data").find().toArray(function(err, result) {

                if (err) {
                    console.log("数据添加到mongodb失败");
                    //将操作失败的信息2返回给前台
                } else {
                    console.log("数据获取成功", result);
                    //7.关闭数据库连接
                    res.send(result)
                    db2.close();
                    //将操作 成功的信息3返回给前台
                }
            })
        }
    })


}
module.exports.delData = function(req, res) {
    var obj = req.body;
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db2) { //db2,关联数据库成功
        //4.判断是否连接数据库成功
        if (err) {
            //将连接失败的信息1返回给前台
            console.log("连接数据库失败", err); //网络中断/数据库地址错误/端口号错误/数据服务没有启动
        } else {
            console.log("数据库连接成功");
            //5.关联数据库
            var dbase = db2.db("fruit"); //数据库名
            var urlobj = {
                    time: obj.time
                }
                //6.dbase要操作的数据库;collection关联集合;insert,如何操作数据(插入)
            dbase.collection("data").deleteOne(urlobj, function(err, result) {
                if (err) {
                    console.log("mongodb删除失败");
                    //将操作失败的信息2返回给前台
                } else {
                    console.log("mongodb删除成功", result.result);
                    res.send(result)
                    db2.close();
                }
            })
        }
    })


}

module.exports.updData = function(req, res) {
    var obj = req.body;
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, db2) { //db2,关联数据库成功
        //4.判断是否连接数据库成功
        if (err) {
            //将连接失败的信息1返回给前台
            console.log("连接数据库失败", err); //网络中断/数据库地址错误/端口号错误/数据服务没有启动
        } else {
            console.log("数据库连接成功");
            //5.关联数据库
            var dbase = db2.db("fruit"); //数据库名
            var whereObj = {
                time: obj.time
            }
            var obj2 = {
                $set: obj
            }

            console.log(whereObj)
            dbase.collection("data").updateOne(whereObj, obj2, function(err, result) {
                if (err) {
                    console.log("更改失败", err);
                } else {
                    console.log("更改成功", result.result);
                    res.send(result)
                    db2.close();
                }
            })
        }
    })


}