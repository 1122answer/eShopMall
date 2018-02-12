var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var Goods = require("../model/goods");
//链接数据库
mongoose.connect('mongodb://127.0.0.1/eShopMall')

mongoose.connection.on("connected", function() {
	console.log("数据库链接成功")
})
mongoose.connection.on("error", function() {
	console.log("数据库链接失败")
})
mongoose.connection.on("disconnected", function() {
	console.log("数据库链接断开")
})


//查询商品列表
router.get("/list",function(req, res, next){
	let page = parseInt(req.param("page"));
	let pageSize = parseInt(req.param("pageSize"))
	let sort = req.param("sort");
	let level = req.param("level");
	let skip = (page - 1)*pageSize
	let params = {};
	let priceGt = 0,priceLte=0

	if (level!="all") {

		switch (level){
			case '0': priceGt = 0; priceLte = 100;break;
			case '1': priceGt = 100; priceLte = 500;break;
			case '2': priceGt = 500; priceLte = 1000;break;
			case '3': priceGt = 1000; priceLte = 5000;break;
		}
		params= {
			salePrice:{
				$gt:priceGt,
				$lte:priceLte
			}
		}		
	}

	
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	goodsModel.sort({'salePrice':sort});
 
	goodsModel.exec(function(err, doc) {
		if (err) {
			res.json({
				status:"1",
				msg:err.message
			})
		}else{
			res.json({
				status:"0",
				msg:"",
				result:{
					count:doc.length,
					list:doc
				}
			})
		}
	})
})


//加入购物车
router.post("/addCart", function(req, res,next){
	var userId = "100000077",productId = req.body.productId;
	var User = require("../model/user");
	var Goods = require("../model/goods");
    console.log(productId)

	User.findOne({userId:userId},function(err, userDoc){
		if (err) {
			res.json({
				status:"1",
				msg:err.message
			})
		}else{
			
			if (userDoc) {
				let goodItem ="";
				userDoc.cartList.forEach(function(item){
					if (item.productId == productId) {
						goodItem = item;
						item.productNum ++;
					}
				})
				if (goodItem) {
					userDoc.save(function(err2,doc2){
						if (err2) {
							res.json({
								status:"1",
								msg:err2.message
							})
						}else{
							if (doc2) {
								res.json({
									status:"0",
									msg:"",
									result:"success"
								})
							}
						}
					})
				}else{
					Goods.findOne({productId:productId}).lean().exec(function(err1, doc){
						
						if (err1) {
							res.json({
								status:"1",
								msg:err1.message
							})
						}else{
							if (doc) {
								/*var _doc =JSON.stringify(doc)*/
								doc.productNum = 1;
								doc.checked = "1";
								console.log(doc)
								userDoc.cartList.push(doc)
								userDoc.save(function(err2,doc2){
									if (err2) {
										res.json({
											status:"1",
											msg:err2.message
										})
									}else{
										if (doc2) {
											res.json({
												status:"0",
												msg:"",
												result:"success"
											})
										}
									}
								})
						    }
						}
	 				})					
				}

 			}
 		}
 	})

})
module.exports = router;