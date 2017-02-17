define(function(require,exports,module){
	var $ = require('jquery');
	
	/*
	  	<div id="area-init">
	  		<select class="country"></select>
	  		<select class="province"></select>
	  		<select class="city"></select>
	  		<select class="town"></select>
	  	</div>
	 */
	var area = {
		el : '',
		$el : {},
		init : function(el,id){
			area.el = el;
			area.$el = $("#area-init");
			area.$el.find('.country').html('<option value="">国家</option>');
			area.$el.find('.province').html('<option value="">省份</option>');
			area.$el.find('.city').html('<option value="">城市</option>');
			area.$el.find('.town').html('<option value="">区县</option>');
			if(id == undefined){
				area.getCountry();
			}else{
				area.getAreaById(id);
			}
		},
		
		/*
		 * 获取全部的国家
		 */
		getCountry : function(){
			$.ajax({
				type:"post",
				url: basePath + 'area/query',
				success: function(result){
					var $country = area.$el.find('.country');
					var html = '<option value="">国家</option>';
					for(var i=0;i<result.data.length;i++){
						html += '<option value='+result.data[i].id+'>'+result.data[i].areaName+'</option>';
					}
					$country.html(html);
				},
				error : function(){
					artdialog.alert('服务器无响应！');
				}
			});
		},
		/*
		 * 根据国家获取省份
		 */
		getProvince : function(id){
			$.ajax({
				type:"post",
				url: basePath + 'area/query?pid='+id,
				success: function(result){
					var $province = area.$el.find('.province');
					var html = '<option value="">省份</option>';
					for(var i=0;i<result.data.length;i++){
						html += '<option value='+result.data[i].id+'>'+result.data[i].areaName+'</option>';
					}
					$province.html(html);
				},
				error : function(){
					artdialog.alert('服务器无响应！');
				}
			});
		},
		/*
		 * 根据省份获取城市
		 */
		getCity : function(id){
			$.ajax({
				type:"post",
				url: basePath + 'area/query?pid='+id,
				success: function(result){
					var $city = area.$el.find('.city');
					var html = '<option value="">城市</option>';
					for(var i=0;i<result.data.length;i++){
						html += '<option value='+result.data[i].id+'>'+result.data[i].areaName+'</option>';
					}
					$city.html(html);
				},
				error : function(){
					artdialog.alert('服务器无响应！');
				}
			});
		},
		/*
		 * 根据城市获取乡镇
		 */
		getTown : function(id){
			$.ajax({
				type:"post",
				url: basePath + 'area/query?pid='+id,
				success: function(result){
					var $town = area.$el.find('.town');
					var html = '<option value="">区县</option>';
					for(var i=0;i<result.data.length;i++){
						html += '<option value='+result.data[i].id+'>'+result.data[i].areaName+'</option>';
					}
					$town.html(html);
				},
				error : function(){
					artdialog.alert('服务器无响应！');
				}
			});
		},
		
		/*
		 * 根据区域id获取地区列表
		 * 
		 */
		getAreaById : function(id){
			$.ajax({
				type:"post",
				url: basePath + 'area/getAreaInfo?id='+id,
				success: function(data){
					if(data.result == "SUCCESS"){
						var $country = area.$el.find('.country');
						var html = '<option value="">国家</option>';
						for(var i=0;i<data.data.first.length;i++){
							if(data.data.first[i].selected == 1){
								html += '<option value='+data.data.first[i].id+' selected="selected">'+data.data.first[i].areaName+'</option>';
							}else{
								html += '<option value='+data.data.first[i].id+'>'+data.data.first[i].areaName+'</option>';
							}
						}
						$country.html(html);
						
						var $province = area.$el.find('.province');
						var html = '<option value="">省份</option>';
						for(var i=0;i<data.data.second.length;i++){
							if(data.data.second[i].selected == 1){
								html += '<option value='+data.data.second[i].id+' selected="selected">'+data.data.second[i].areaName+'</option>';
							}else{
								html += '<option value='+data.data.second[i].id+'>'+data.data.second[i].areaName+'</option>';
							}
						}
						$province.html(html);
						
						var $city = area.$el.find('.city');
						var html = '<option value="">城市</option>';
						for(var i=0;i<data.data.third.length;i++){
							if(data.data.third[i].selected == 1){
								html += '<option value='+data.data.third[i].id+' selected="selected">'+data.data.third[i].areaName+'</option>';
							}else{
								html += '<option value='+data.data.third[i].id+'>'+data.data.third[i].areaName+'</option>';
							}
						}
						$city.html(html);
					}else{
						artdialog.alert('获取区域失败！');
					}
				},
				error : function(){
					artdialog.alert('服务器无响应！');
				}
			});
		}
	};
	/*
	 * 绑定事件
	 */
	$(document).off('change',area.el+' .country').on('change',area.el+' .country',function(){
		if(area.$el.find('.province').length>0){
			if($(this).val() != '国家'){
				var id = $(this).val();
				area.getProvince(id);
				area.$el.find('.city').html('<option value="">城市</option>');
				area.$el.find('.town').html('<option value="">区县</option>');
			}else{
				area.$el.find('.province').html('<option value="">省份</option>');
				area.$el.find('.city').html('<option value="">城市</option>');
				area.$el.find('.town').html('<option value="">区县</option>');
			}
		}
	});
	$(document).off('change',area.el+' .province').on('change',area.el+' .province',function(){
		if(area.$el.find('.city').length>0){
			if($(this).val() != '省份'){
				var id = $(this).val();
				area.getCity(id);
				area.$el.find('.town').html('<option value="">区县</option>');
			}else{
				area.$el.find('.city').html('<option value="">城市</option>');
				area.$el.find('.town').html('<option value="">区县</option>');
			}
		}
	});
	$(document).off('change',area.el+' .city').on('change',area.el+' .city',function(){
		if(area.$el.find('.town').length>0){
			if($(this).val() != '城市'){
				var id = $(this).val();
				area.getTown(id);
			}else{
				area.$el.find('.town').html('<option value="">区县</option>');
			}
		}
	});
	
	module.exports = area;
});