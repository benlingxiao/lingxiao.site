// seajs 的简单配置
var debug = true;
var basePath = debug ? 'http://127.0.0.1:8020/static/' :'http://www.lingxiao.site/static/';

var cssPath = basePath + 'resources/css/';
var jsPath = basePath + 'resources/js/';
var pagePath = basePath + 'pages/';
var datePickerPath = basePath + 'resources/bower_components/My97DatePicker/';

seajs.config({
	base: basePath + 'resources/bower_components/',
	
	alias: {
		"jquery": "jquery/dist/jquery.js",
		"angular":"angular/angular.min.js",
		"bootstrap":"bootstrap/dist/js/bootstrap.js",
		"angular-route":"angular-route/angular-route.js",
		"angular-file-upload":"angular-file-upload/dist/angular-file-upload.js",
		"WdatePicker": "My97DatePicker/WdatePicker.js",
		"artDialog": "art-dialog/src/dialog.js",
		"artDialog-config" : jsPath + "system/util/artDialog-config.js",
		"localStorage" : jsPath + "system/util/localStorage.js",
		"ajax-config" : jsPath + "system/config/ajax-config.js",
		"util" : jsPath + "system/util/util.js",
		"area" : jsPath + "system/util/area.js",
		"valid" : jsPath + "system/util/valid.js",
		"qrcode" : 'jquery-qrcode/jquery.qrcode.min.js',
		"echarts" : 'echarts-2.2.7/build/dist/echarts-all.js',
		"fullpage" : 'fullpage/js/jquery.fullPage.js'
	}
});

// 加载入口模块
//seajs.use("../static/hello/src/main")