var express = require('express');
var router = express.Router();

var User = require("./../model/user")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourceddd');
});
router.get('/test', function(req, res, next) {
  res.send('happiness come!');
});

router.post("/login",function( req ,res, next){
	var param = {
		userName :req.body.userName,
		userPwd :req.body.userPwd
	}
    console.log(param)
	User.findOne(param, function(err, doc){
		console.log(err)
		if (err) {
			res.json({
				status:"1",
				msg:err.message
			})
		}else{
			console.log(doc)
			if (doc) {
				res.cookie("userId",doc.userId,{
					path:"/",
					maxAge:1000*60*60
				})
				res.cookie("userName",doc.userName,{
					path:"/",
					maxAge:1000*60*60
				})
				//req.session.user = doc;
				res.json({
					status:0,
					msg:"",
					result:{
						userName:doc.userName,
					}
				})
			}
		}
	})
})

//登出接口
router.post("/logout",function(req, res,next){
	res.cookie("userId","",{
		path:"/",
		maxAge:-1
	})
	res.json({
		status:"0",
		msg:"",
		result:""
	})
})

router.get("/checkLogin", function(req, res , next){
	if (req.cookies.userId) {
		res.json({
			status:"0",
			msg:"",
			result:req.cookies.userName || ""
		})
	}else{
		res.json({
			status:"1",
			msg:"未登录",
			result:""
		})
	}
})

//购物车列表
router.get("/cartList", function(req, res,next){
	var userId = req.cookies.userId;
	User.findOne({userId:userId},function(err,doc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		}else{
			if (doc) {
				res.json({
					status:"0",
					msg:"",
					result:doc.cartList
				})				
			}

		}
	})
})

//购物车删除
router.post("/cartDel", function(req, res,next){
	var userId = req.cookies.userId, productId = req.body.productId;
	console.log(productId)
	// User.findOne({
	// 	userId:userId
	// },{"cartLsit":productId},function(err,doc){
	// 	console.log(doc)
	// })
	User.update({
		userId:userId
	},{
		"$pull":{
			cartList:{
				productId:productId
			}
		}
	},function(err,doc){
		
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		}else{
			if (doc) {
				res.json({
					status:"0",
					msg:"删除成功",
					result:"usc"
				})				
			}

		}
	});
})

//购物车编辑
router.post("/cartEdit",function(req,res,next){
	var userId = req.cookies.userId, 
	productId = req.body.productId,
	checked = req.body.checked,
	productNum = req.body.productNum;
	User.update({
		userId:userId,"cartList.productId":productId
	},{
		"cartList.$.productNum":productNum,
		"cartList.$.checked":checked
	},function(err,doc){
		console.log(doc)
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		}else{
			if (doc) {
				res.json({
					status:"0",
					msg:"",
					result:"usc"
				})				
			}

		}
	})
})
//购物车全选
router.post("/cartCheckAll",function(req,res,next){
	var userId = req.cookies.userId, 
	checkAll = req.body.checkAll;
	User.findOne({
		userId:userId
	},function(err,doc){	
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		}else{
			if (doc) {
				doc.cartList.forEach((item)=>{
					item.checked = checkAll;
				})
				doc.save(function(err1,doc1){
					if (err1) {
						res.json({
							status:"1",
							msg:err1.message,
							result:""
						})
					}else{
						if (doc1) {
							res.json({
								status:"0",
								msg:"",
								result:"usc"
							})				
						}

					}
				})		
			}

		}
	})
})

//查询用户地址接口
router.get("/addressList",function (req, res, next) {
		var userId = req.cookies.userId;
		User.findOne({userId:userId},function (err, doc) {
			if (err) {
				res.json({
					status:"1",
					msg:err.message,
					result:""
				})
			}else{
				res.json({
					status:"0",
					msg:"",
					result:doc.addressList
				})	
			}
		})
})

//地址默认设置
router.post("/setDefault",function(req ,res, next) {
	var userId = req.cookies.userId;
	var addressId = req.body.addressId;
	if (!addressId) {
		res.json({
			status:"1003",
			msg:"addressId is null",
			result:""
		})
	}else{
		User.findOne({userId:userId},function (err, doc) {
			if (err) {
				res.json({
					status:"1",
					msg:err.message,
					result:""
				})
			}else{
				var addressList = doc.addressList;
				addressList.forEach((item)=>{
					if(item.addressId ==addressId ){
						item.isDefault = true;
					}else{
						item.isDefault = false;
					}
				})	
				doc.save(function (err1, doc1) {
					if (err1) {
						res.json({
							status:"1",
							msg:err.message,
							result:""
						})
					}else{
						res.json({
							status:"0",
							msg:"",
							result:""
						})	
					}
				})

			}
		})		
	}

})

//删除地址接口
router.post("/delAddress", function (req , res, next) {
	var userId = req.cookies.userId, addressId = req.body.addressId;
	User.update({
		userId:userId
	},{
		"$pull":{
			addressList:{
				addressId:addressId
			}
		}
	},function(err,doc){
		
		if (err) {
			res.json({
				status:"1",
				msg:err.message,
				result:""
			})
		}else{
			if (doc) {
				res.json({
					status:"0",
					msg:"删除成功",
					result:"usc"
				})				
			}

		}
	});
})
module.exports = router;
