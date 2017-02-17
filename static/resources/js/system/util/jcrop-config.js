define(function(require,exports,module){
	var $ = require('jquery');
	var artdialog = require('artDialog-config');
	require('Jcrop');
	
	var jcrop = function(callback){
		
			var self = this.prototype = {
					file : null,
					src: null,
					jcrop : null,
					//图片原尺寸
					imgSize: null,
					//
					selection: null
			};
		
			var html = '<div class="modal fade" id="jcropModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">';
				html+= '	<div class="modal-dialog">';
				html+= '	   	<div class="modal-content">';
				html+= '	   		<div class="modal-header">';
				html+= '	   			<a type="button" class="close" data-dismiss="modal"><i class="mwifont mwi-remove font18"></i></a>';
				html+= '	   			<h4 class="modal-title text-center">上传图片</h4>';
				html+= '	   		</div>';
				html+= '	   		<div class="modal-body clearfix">';
				html+= '   				<div class="util-initPic">';
				html+= '	   				<div class="util-chosePic">';
				html+= '						<button class="social-btn social-btn-default-full" id="util-choseBtn"><i class="mwifont mwi-plus mr10"></i>上传图片</button>';
				html+= '						<input type="file" class="hidden" id="util-choseImg"/>';
				html+= '	   				</div>';
				html+= '	   				<div class="util-cropPic display-none">';
				html+= '	   					<div class="util-viewArea">';
				html+= '							<img src="" id="util-viewPic">';
				html+= '	   					</div>';
				html+= '	   					<hr>';
				html+= '	   					<div class="text-center">';
				html+= '	   						<button class="social-btn social-btn-default-full" id="util-reChoseBtn">重新上传</button>';
				html+= '	   					</div>';
				html+= '	   				</div>';
				html+= '   				</div>';
				html+= '   				<div class="util-previewPic text-center">';
				html+= '   					<p class="gray999-text">预览</p>';
				html+= '   					<div id="util-previewPic-1"></div>';
				html+= '   				</div>';
				html+= '	   		</div>';
				html+= '	   		<div class="modal-footer text-center">';
				html+= '	   			<button type="button" class="social-btn social-btn-default-full" id="jcropBtn">确定</button>';
				html+= '	   			<button type="button" class="social-btn social-btn-gray-full" id="jcropCloseModal">取消</button>';
				html+= '	   		</div>';
				html+= '	   	</div>';
				html+= '	</div>';
				html+= '</div>';
		
			//将模态框添加到页面中
			$('body').append(html);
			$('#jcropModal').modal('show');
			//模态框关闭时，从页面中完全删除
			
			$('#jcropModal').on('hidden.bs.modal',function(){
				$(this).remove();
			});
			
			$(document).off('click','#jcropCloseModal').on('click','#jcropCloseModal',function(){
				$('#jcropModal').modal('hide');
			});
			
			//点击确定时，执行回调函数，并关闭模态框
			$(document).off('click','#jcropBtn').on('click','#jcropBtn',function(){
				$('#jcropModal').modal('hide');
				callback(self);
			});
			
			/*
			 * 图片预览裁剪
			 */
			$(document).off('click','#util-choseBtn').on('click','#util-choseBtn',function(){
				$('#util-choseImg').click();
			});
			
			//重新上传
			$(document).off('click','#util-reChoseBtn').on('click','#util-reChoseBtn',function(){
				self.jcrop.destroy();
				var img = document.getElementById('util-choseImg');
				img.outerHTML = img.outerHTML;
				$('#util-choseImg').click();
			});
			
			//当文件变化时重新加载图片
			$(document).off('change','#util-choseImg').on('change','#util-choseImg',function(){
				var img = document.getElementById('util-choseImg');
				var file = img.files[0];
				
				self.file = file;
				
				 //检测是否为图片类型
		        if(/image\/\w+/.test(file.type)){
		            var reader = new FileReader();
		            reader.onload = function(e){
		            	self.src = e.target.result;
		                document.getElementById("util-viewPic").src=e.target.result;
		                $('#util-viewPic').Jcrop({
		                	aspectRatio: 1,
		                	boxHeight: 400,
		                	boxWidth: 400,
		                	bgColor: "transparent",
		                	minSize: [50,50],
		                	setSelect: [0,0,400,400],
		                	onSelect: select
		                },function(){
		                	self.jcrop = this;
		                	select();
		                });
		            };
		            reader.readAsDataURL(file);
		            $('.util-chosePic').hide();
		            $('.util-cropPic').show();
		        }else{
		            artdialog.alert("文件不是图像类型",function(){
		            	//清除已选的文件
		            	img.outerHTML = img.outerHTML;
		            });
		        }
			});
			
			//jcrop选择事件
			var select = function(){
				var select = self.jcrop.getSelection();
				
				self.selection = self.jcrop.unscale(select);
				//图片原尺寸
				self.imgSize = {
						width: $('.jcrop-active').width()*self.jcrop.opt.xscale,
						height: $('.jcrop-active').height()*self.jcrop.opt.yscale
				}
				
	    		var scale = select.h/150;
	    		var width = $('.jcrop-active').width()/scale;
	    		var height = $('.jcrop-active').height()/scale;
	    		var sx = select.x/scale;
	    		var sy = select.y/scale;
	    		$('#util-previewPic-1').css("cssText","background-image:url("+self.src+");"+"background-size:"+width+"px "+height +"px !important;"+"background-position:-"+sx+"px -"+ sy +"px !important;background-repeat:no-repeat;");
	    	}
	}
	module.exports = jcrop;
});