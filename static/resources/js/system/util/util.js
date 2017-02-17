define(function(require,exports,module){
	/*引用其他模块*/
	var $ = require('jquery');
	var WdatePicker = require('WdatePicker');
	var artdialog = require('artDialog-config');
	
	var util = {
		fieldType : function(fieldType){
			var string = '';
			switch (fieldType){
				case '1' :
					string = '普通文本';
					break;
				case '2' :
					string = '多行文本';
					break;
				case '3' :
					string = '单项选择';
					break;
				case '4' :
					string = '多项选择';
					break;
				case '5' :
					string = '下拉菜单';
					break;
				case '6' :
					string = '多项下拉菜单';
					break;
				case '7' :
					string = '文件上传';
					break;
				case '8' :
					string = '图片上传';
					break;
				default :
					break;
			}
			return string;
		},
		page : function(callback,code){
			if(code == null || code == undefined){
				/*
				 * 为每个页码绑定事件
				 * */
				$(document).off('click','.pagination>li.page').on('click','.pagination>li.page',function(){
					var pageNumber = $(this).find('a').text();
					$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
					callback();
				});
				/*
				 * 上一页
				 * */
				$(document).off('click','.pagination>li:first').on('click','.pagination>li:first',function(){
					if(!$(this).hasClass('disabled')){
						var pageNumber = parseInt($(this).parents('.paginate').find('.pageNumber').val()) - 1;
						$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
						callback();
					}
				});
				/*
				 * 下一页
				 * */
				$(document).off('click','.pagination>li:last').on('click','.pagination>li:last',function(){
					if(!$(this).hasClass('disabled')){
						var pageNumber = parseInt($(this).parents('.paginate').find('.pageNumber').val()) + 1;
						$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
						callback();
					}
				});
				/*
				 * 为每页显示条数绑定事件
				 * */
				$(document).off('change','.paginate select[name=pageSize]').on('change','.paginate select[name=pageSize]',function(){
					var pageSize = $(this).val();
					$(this).parents('.paginate').find('.pageSize').val(pageSize);
					$(this).parents('.paginate').find('.pageNumber').val('1');
					callback();
				});
				
				/*
				 * 跳到某页
				 * */
				$(document).off('click','#goPageNum').on('click','#goPageNum',function(){
					var pageNumber = $(this).prev().val();
					if(pageNumber > $(this).parents('.paginate').find('.totalPages').val()){
						artdialog.alert('输入页码超出总页数！');
					}else{
						$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
						callback();
					}
				});
			}else{
				var paginate = '.'+code+' ';
				/*
				 * 为每个页码绑定事件
				 * */
				$(document).off('click',paginate+'.pagination>li.page').on('click',paginate+'.pagination>li.page',function(){
					var pageNumber = $(this).find('a').text();
					$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
					callback();
				});
				/*
				 * 上一页
				 * */
				$(document).off('click',paginate+'.pagination>li:first').on('click',paginate+'.pagination>li:first',function(){
					if(!$(this).hasClass('disabled')){
						var pageNumber = parseInt($(this).parents('.paginate').find('.pageNumber').val()) - 1;
						$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
						callback();
					}
				});
				/*
				 * 下一页
				 * */
				$(document).off('click',paginate+'.pagination>li:last').on('click',paginate+'.pagination>li:last',function(){
					if(!$(this).hasClass('disabled')){
						var pageNumber = parseInt($(this).parents('.paginate').find('.pageNumber').val()) + 1;
						$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
						callback();
					}
				});
				/*
				 * 为每页显示条数绑定事件
				 * */
				$(document).off('change',paginate+'select[name=pageSize]').on('change',paginate+'select[name=pageSize]',function(){
					var pageSize = $(this).val();
					$(this).parents('.paginate').find('.pageSize').val(pageSize);
					$(this).parents('.paginate').find('.pageNumber').val('1');
					callback();
				});
				
				/*
				 * 跳到某页
				 * */
				$(document).off('click',paginate+'.goPageNum').on('click',paginate+'.goPageNum',function(){
					var pageNumber = $(this).prev().val();
					if(pageNumber > $(this).parents('.paginate').find('.totalPages').val()){
						artdialog.alert('输入页码超出总页数！');
					}else{
						$(this).parents('.paginate').find('.pageNumber').val(pageNumber);
						callback();
					}
				});
			}
		},
		/*
		 * 根据pageNum,totalPage动态生成相应的页码
		 * */
		paginate : function(pageNum,pageSize,totalPage,code){
			var html = pageNum>1?'<li><a href="javascript:void(0);"><<上一页</a></li>':'<li class="disabled"><a href="javascript:void(0);"><<上一页</a></li>'
			if(totalPage<7){
				for(var i=1;i<totalPage+1;i++){
					html += i==pageNum?'<li class="active"><a href="javascript:void(0);">'+i+'</a></li>':'<li class="page"><a href="javascript:void(0);">'+i+'</a></li>'
				}
			}else if(totalPage>=7){
				if(pageNum>3&&pageNum<(totalPage-2)){
					html += '<li class="page"><a href="javascript:void(0);">'+(pageNum-3)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(pageNum-2)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(pageNum-1)+'</a></li>';
					html += '<li class="active"><a href="javascript:void(0);">'+pageNum+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(pageNum+1)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(pageNum+2)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(pageNum+3)+'</a></li>';
				}else if(pageNum<=3){
					html += pageNum==1?'<li class="active"><a href="javascript:void(0);">1</a></li>':'<li class="page"><a href="javascript:void(0);">1</a></li>';
					html += pageNum==2?'<li class="active"><a href="javascript:void(0);">2</a></li>':'<li class="page"><a href="javascript:void(0);">2</a></li>'
					html += pageNum==3?'<li class="active"><a href="javascript:void(0);">3</a></li>':'<li class="page"><a href="javascript:void(0);">3</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">4</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">5</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">6</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">7</a></li>';
				}else if(pageNum>=(totalPage-2)){
					html += '<li class="page"><a href="javascript:void(0);">'+(totalPage-6)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(totalPage-5)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(totalPage-4)+'</a></li>';
					html += '<li class="page"><a href="javascript:void(0);">'+(totalPage-3)+'</a></li>';
					html += pageNum==(totalPage-2)?'<li class="active"><a href="javascript:void(0);">'+(totalPage-2)+'</a></li>':'<li class="page"><a href="javascript:void(0);">'+(totalPage-2)+'</a></li>';
					html += pageNum==(totalPage-1)?'<li class="active"><a href="javascript:void(0);">'+(totalPage-1)+'</a></li>':'<li class="page"><a href="javascript:void(0);">'+(totalPage-1)+'</a></li>';
					html += pageNum==totalPage?'<li class="active"><a href="javascript:void(0);">'+totalPage+'</a></li>':'<li class="page"><a href="javascript:void(0);">'+totalPage+'</a></li>';
				}
			}
			html += pageNum<totalPage?'<li><a href="javascript:void(0);">下一页>></a></li>':'<li class="disabled"><a href="javascript:void(0);">下一页>></a></li>';
			if(code == null || code == undefined){
				$('.pagination').html(html);
				$('select[name=pageSize]').val(pageSize);
			}else{
				var paginate = '.'+code+' ';
				$(paginate+'.pagination').html(html);
				$(paginate+'select[name=pageSize]').val(pageSize);
			}
		},
		
		/*格式化时间*/
		formatTime: function(time){
			var date = new Date(time);
			var year = date.getFullYear();
			var month = date.getMonth()<10?"0"+(date.getMonth()+1):date.getMonth()+1;
			var day = date.getDate()<10?"0"+date.getDate().toString():date.getDate();
			var hour = date.getHours()<10?"0"+date.getHours().toString():date.getHours();
			var minute = date.getMinutes()<10?"0"+date.getMinutes().toString():date.getMinutes();
			var dateTime = year + "-" + month + '-' + day + ' ' + hour + ':' + minute + ':00';
			return dateTime;
		},
		
		/*
		 * 裁剪
		 * 
		 */
		jcrop: function(){
			/*
			 * 图片预览裁剪
			 */
			$(document).off('click','#util-choseBtn').on('click','#util-choseBtn',function(){
				$('#util-choseImg').click();
			});
			$(document).off('click','#util-reChoseBtn').on('click','#util-reChoseBtn',function(){
				jcrop.destroy();
				var img = document.getElementById('util-choseImg');
				img.outerHTML = img.outerHTML;
				$('#util-choseImg').click();
			});
			
			var jcrop = {};
			var src = "";
			$(document).off('change','#util-choseImg').on('change','#util-choseImg',function(){
				var img = document.getElementById('util-choseImg');
				var file = img.files[0];
				 //检测是否为图片类型
		        if(/image\/\w+/.test(file.type)){
		            var reader = new FileReader();
		            reader.onload = function(e){
		            	src = e.target.result;
		                document.getElementById("util-viewPic").src=e.target.result;
		                //$('#util-previewPic-1').css('background-image','url('+e.target.result+')');
		                $('#util-viewPic').Jcrop({
		                	aspectRatio: 1,
		                	boxHeight: 400,
		                	boxWidth: 400,
		                	bgColor: "transparent",
		                	minSize: [50,50],
		                	setSelect: [0,0,400,400],
		                	onSelect: select
		                },function(){
		                	jcrop = this;
		                	select();
		                });
		            };
		            reader.readAsDataURL(file);
		            $('.util-chosePic').hide();
		            $('.util-cropPic').show();
		        }else{
		            artdialog.alert("文件不是图像类型",function(){
		            	//清除已选的图片
		            	portrait.outerHTML = portrait.outerHTML;
		            });
		        }
			});
			function select(){
				var select = jcrop.getSelection();
	    		var scale = select.h/150;
	    		var width = $('.jcrop-active').width()/scale;
	    		var height = $('.jcrop-active').height()/scale;
	    		var sx = select.x/scale;
	    		var sy = select.y/scale;
	    		$('#util-previewPic-1').css("cssText","background-image:url("+src+");"+"background-size:"+width+"px "+height +"px !important;"+"background-position:-"+sx+"px -"+ sy +"px !important");
	    	}
		}
	}
	/*
	 * 时间插件绑定
	 * .datePickerFull : yyyy-MM-dd HH:mm:ss
	 * .datePickerDay : yyyy-MM-dd
	 * .datePickerTime : HH:mm:ss
	 * 
	$(document).on('click','.datePickerFull',function(){
		WdatePicker({dateFmt:"yyyy-MM-dd HH:mm:ss"});
	});
	$(document).on('click','.datePickerDay',function(){
		WdatePicker({dateFmt:"yyyy-MM-dd"});
	});
	$(document).on('click','.datePickerTime',function(){
		WdatePicker({dateFmt:"HH:mm:ss"});
	});*/
	/*
	 * 全选操作
	 **/
	$(document).off('change','.allCheckbox').on('change','.allCheckbox',function(){
		var checkList = $(this).parents('table').find('tbody').find('input[type="checkbox"]');
		if($(this).prop('checked')){
			for(var i=0;i<checkList.length;i++){
				$(checkList[i]).prop('checked','checked');
			}
		}else{
			for(var i=0;i<checkList.length;i++){
				$(checkList[i]).removeAttr('checked');
			}
		}
		
	});
	
	/*
	 * 拖拽
	 * */
	$.fn.drag = function(){
		var _move=false;//移动标记  
		var _x,_y;//鼠标离控件左上角的相对位置  
	    $(".drag").click(function(){  
	        //alert("click");//点击（松开后触发）  
	        }).mousedown(function(e){  
	        _move=true;  
	        _x=e.pageX-parseInt($(".drag").css("left"));  
	        _y=e.pageY-parseInt($(".drag").css("top"));  
	        $(".drag").fadeTo(20, 0.5);//点击后开始拖动并透明显示  
	    });  
	    $(document).mousemove(function(e){  
	        if(_move){  
	            var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
	            var y=e.pageY-_y;  
	            $(".drag").css({top:y,left:x});//控件新位置  
	        }  
	    }).mouseup(function(){  
	    _move=false;  
	    $(".drag").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明  
	  });  
	}
	
	module.exports = util;
});
