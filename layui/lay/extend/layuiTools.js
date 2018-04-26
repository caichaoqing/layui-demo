  /**
  * 扩展一个模块
  * 该模块是一些公用的模块
  * 控制选项卡（NAV）
  * layer弹iframe修改
  */
layui.define(['element','layer'],function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
	var element = layui.element,
	layer = layui.layer,
	$ = layui.jquery;
	//触发事件
	var layuiTools = {
		tabStroe:[''],
		tabOpen: function(param) {
			var param = param || {};
			if(!_.contains(layuiTools.tabStroe,param.url)){
				//新增一个Tab项
				element.tabAdd('demo', {
					title: param.title || '新选项卡' //用于演示
					,content: '<iframe name="'+new Date()+'" src="'+param.url+'"></iframe>'
					,id: param.url || (location.href+'#') //实际使用一般是规定好的id，这里以时间戳模拟下
				});
				layuiTools.tabStroe.push(param.url);
			}else{
				if(param.reload == true){
					
				}
			}
			layuiTools.tabChange(param);
			fixFrame();
		},
		tabDelete: function(param) {
			layuiTools.tabStroe.splice(param,1);
		},
		tabChange: function(param) {
			//切换到指定Tab项
			element.tabChange('demo', param.url); //切换到：用户管理
		},
		openLayerFrame:function(param){
			var height = window.top.iFrameHeight+4;
			window.top.layer.open({
			  type: 2,
			  title: true,
			  shade: [0],
			  shadeClose:true,
			  area: ['80%', (height)+'px'],
			  offset: 'rb', //右下角弹出
			  anim: 7,
			  content: param.content, //iframe的url，no代表不显示滚动条
			  end: function(){ //此处用于演示
			    param.end && param.end();
			  },
			  success: function(layero, index){
					layero.find('iframe').height(window.top.innerHeight-60)
					console.log(window.top.innerHeight)
					layero.css('top',60+'px').css('heigh',(window.top.innerHeight-60)+'px');
			  	param.success && param.success(layero, index);
			  }
			});
		}
	};
	function fixFrame(){
		var iFrameHeight = window.top.innerHeight-60 - 3;
		iFrameHeight = iFrameHeight < 100 ? 500 : iFrameHeight;
		$('iframe').height(iFrameHeight);
		window.top.iFrameHeight = iFrameHeight;
		
		$('.layui-layer.layui-layer-iframe').css('top',60+'px').css('height',(iFrameHeight)+'px');
		
	}
	window.addEventListener('load',fixFrame)
	window.addEventListener('resize',fixFrame)

  
  //输出test接口
  exports('layuiTools', layuiTools);
}); 