define(function(require,exports,module){
	var $ = require('jquery');
	
	
	/*
	 * sobj为数据结构
	 * bobj为传入的数据
	 * 
	 * */
/*	var Assignment = function(sobj,bobj) {
        this.sobj = sobj,
        this.keys = Object.keys(sobj),
        this.bobj = bobj
    }*/
	function assignment(sobj,bobj){
		var keys = [];
		if($.isArray(sobj)){
			var robj = [];
    		if($.isArray(bobj)){
    			keys = Object.keys(sobj[0]);
    			for(var j=0;j<bobj.length;j++){
    				var obj = {};
    				for(var i=0;i<keys.length;i++){
        				obj[keys[i]] = bobj[j][keys[i]];
        			}
    				robj.push(obj);
    			}
    		}else{
    			console.log('两个对象类型不同！');
    		}
    	}else{
    		var robj = {};
    		if($.isArray(bobj)){
    			console.log('两个对象类型不同！');
    		}else{
    			keys = Object.keys(sobj);
    			for(var i=0;i<keys.length;i++){
    				robj[keys[i]] = bobj[keys[i]];
    			}
    		}
    	}
		return robj;
	}
    /*//定义assignment的方法
    Assignment.prototype = {
        assignment: function() {
            return function(){
            	if($.isArray(this.sobj)){
            		if($.isArray(this.bobj)){
            			this.keys = Object.keys(this.sobj[0]);
            			for(var j=0;j<this.bobj.length;j++){
            				for(var i=0;i<this.keys.length;i++){
	            				this.sobj[j][this.keys[i]] = this.bobj[j][this.keys[i]];
	            			}
            			}
            		}else{
            			console.log('两个对象类型不同！');
            		}
            	}else{
            		if($.isArray(this.bobj)){
            			console.log('两个对象类型不同！');
            		}else{
            			for(var i=0;i<this.keys.length;i++){
            				this.sobj[this.keys[i]] = this.bobj[this.keys[i]];
            			}
            		}
            	}
            }
        }
    }
    //在插件中使用assignment对象
    $.fn.assignment = function(bobj) {
        //创建assignment的实体
        var assignment = new Assignment(this, bobj);
        //调用其方法
        return assignment.assignment();
    }*/
	module.exports = assignment;
});
