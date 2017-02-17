define(function(require,exports,module){
	
	/*
	 * 基于window.name的在当前窗口的不同页面之间进行值传递
	 * */
	var win = {};
	
	/*
	 * 封装保存方法
	 * params : obj(json对象)内部结构为key:value键值对
	 * 封装的数据结构为: key@value##key@value##key@value
	 * */
	win.set = function(key,obj){
		var nameStr = [];
		for (var key in obj){
			var name = key + '@' + obj[key];
			nameStr.push(name);
		} 
		window.name = nameStr.join('##');
	};
	/*
	 * 封装解析方法
	 * 将当前窗口的name属性转化为json对象
	 * 
	 * */
	win.getName = function(){
		var name = window.name;
		var list = name.split('##');
		var obj = {};
		for(var i = 0;i<list.length;i++){
			var item = list[i].split('@');
			obj[item[0]] = item[1];
		}
		return obj;
	};
	/*
	 * 根据传入属性获取值
	 * */
	win.getItem = function(key){
		var obj = win.getName();
		return obj[key];
	}
	/*
	 * 清除窗口的name属性
	 * */
	win.delName = function(){
		window.name = "";
	}
	
	
	/*
	 * 基于localStorage实现页面间值传递
	 * */
	var store = {};
	/*
	 * 封装保存方法
	 * params : obj(json对象)内部结构为key:value键值对
	 * */
	store.set = function(key,value){
		localStorage.setItem(key,value);
	};
	/*
	 * 获取当前Storage对象
	 * 
	 * */
	store.get = function(){
		var obj = localStorage;
		return obj;
	};
	/*
	 * 根据传入属性获取值
	 * */
	store.getItem = function(key){
		var value = localStorage.getItem(key);
		return value;
	}
	/*
	 * 根据传入key值删除键值对
	 * */
	store.removeItem = function(key){
		localStorage.removeItem(key);
	}
	/*
	 * 清除Storage
	 * */
	store.clear = function(){
		localStorage.clear();
	}
	
	/*
	 * sessionStorage
	 * */
	store.sSet = function(key,value){
		sessionStorage.setItem(key,value);
	};
	/*
	 * 获取当前Storage对象
	 * 
	 * */
	store.sGet = function(){
		var obj = sessionStorage;
		return obj;
	};
	/*
	 * 根据传入属性获取值
	 * */
	store.sGetItem = function(key){
		var value = sessionStorage.getItem(key);
		return value;
	}
	/*
	 * 根据传入key值删除键值对
	 * */
	store.sRemoveItem = function(key){
		sessionStorage.removeItem(key);
	}
	/*
	 * 清除Storage
	 * */
	store.sClear = function(){
		sessionStorage.clear();
	}
	
	
	
	/*
	 * cookie操作
	 * */
	store.getCookie = function(c_name){
		if (document.cookie.length>0){
		  	c_start=document.cookie.indexOf(c_name + "=")
		  	if (c_start!=-1){ 
			    c_start=c_start + c_name.length+1 
			    c_end=document.cookie.indexOf(";",c_start)
			    if (c_end==-1) c_end=document.cookie.length
			    return unescape(document.cookie.substring(c_start,c_end))
		    } 
	  	}
		return "";
	}
	store.setCookie = function(c_name,value,expiredays,path,domain,secure){
		var expires=new Date();
		expires.setDate(expires.getDate()+expiredays);
		//document.cookie=c_name+ "=" +escape(value)+
		//((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		document.cookie = c_name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	}
	store.delCookie = function(name){
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
	/*
	 * 检测浏览器是否支持localStorage
	 * 若不支持则使用window.name方法
	 * */
	if(window.localStorage){
		module.exports = store;
	}else{
		module.exports = win;
	}
	
});
