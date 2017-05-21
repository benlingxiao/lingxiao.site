/**
 * 用于请求12306的正晚点信息
 * @author lingxiao
 * @Date 2017/5/19
 */

var express = require('express');
var router = express.Router();
var request = require('request-promise');
/**
 * 路由部分
 */
/**
 * 获取所有的车站信息
 */
router.get('/getStationList/:version', function(req, res, next) {
		//res.send('respond with a resource');
		var version = req.params.version ? req.params.version : "1.9008";
		var options = {
			url: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version='+version,
		  	method: 'GET',
		  	json: true,
		  	rejectUnauthorized: false//解决证书问题
		};
		
		request(options)
		.then((data) => {
			res.send(data);
		}).catch((err) => {
			res.send(err);
		})
});

/**
 * 根据车站code查询车次
 */
router.get('/queryCC/:station_code', function(req, res, next){
	var station_code = req.params.station_code;
	var options = {
		url: 'https://kyfw.12306.cn/otn/zwdch/queryCC?train_station_code='+station_code,
	  	method: 'GET',
	  	json: true,
	  	rejectUnauthorized: false//解决证书问题
	};
	
	request(options)
	.then((data) => {
		res.send(data);
	}).catch((err) => {
		res.send(err);
	})
});

/**
 * 根据查询条件查询晚点信息
 */
router.post('/queryTime',function(req, res, next){
	var query = req.body;
	var station_name = query.station_name;
	var train_no = query.train_no;
	var randCode = query.randCode;
	
	var options = {
		url: 'https://kyfw.12306.cn/otn/zwdch/query',
	  	method: 'GET',
	  	json: true,
	  	form: {
	  		cxlx: "0",
	  		cz: station_name,
	  		cc: train_no,
	  		czEn: ,
	  		randCode: ""
	  	}
	  	rejectUnauthorized: false//解决证书问题
	};
	
	request(options)
	.then((data) => {
		res.send(data);
	}).catch((err) => {
		res.send(err);
	})
})

module.exports = router;