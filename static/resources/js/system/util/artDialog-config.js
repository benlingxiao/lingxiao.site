// artDialog - 默认配置
define(function(require,exports,module){
	var artDialog = require('artDialog');
	var $ = require('jquery');
	//require('artDialog');
	
	var artdialog = {};
	artdialog.alert = function(content,okFunc){
		if(okFunc){
			var Alert = artDialog({
				width : '400px',
				height : '60px',
				content: content,
				title: "提示",
				ok : okFunc,
				okValue : '确定',
				lock : true,
				background: '#000',
				opacity: 0.1
			});
		}else{
			var Alert = artDialog({
				width : '400px',
				height : '60px',
				content: content,
				title: "提示",
				ok : true,
				okValue : '确定',
				lock : true,
				background: '#000',
				opacity: 0.1
			});
		}
		Alert.showModal();
	};
	artdialog.confirm = function(content,func){
		var Confirm = artDialog({
			width : '400px',
			height : '60px',
			content: content,
			title :"提示",
			ok : func,
			okValue : '确定',
			cancel : true,
			cancelValue : '取消',
			lock : true,
			opacity: 0.5
		});
		Confirm.showModal();
	}
	artdialog.tooltip = function(content,type){
		if(type==undefined){
			var html = createHtml(content);
			if($('#tool-tip')){
				$('#tool-tip').remove();
			}
			$('body').append(html);
			setTimeout(function(){$('#tool-tip').remove();},1500);
		}else if(type=='red'){
			var html = '<div class="tool-tip" id="tool-tip-red">'+content+'</div>';;
			if($('#tool-tip-red')){
				$('#tool-tip-red').remove();
			}
			$('body').append(html);
			setTimeout(function(){$('#tool-tip-red').remove();},1500);
		}
	}
	function createHtml(content){
		var html = '<div class="tool-tip" id="tool-tip">'+content+'</div>';
		return html;
	}
	
	
	module.exports = artdialog;
});