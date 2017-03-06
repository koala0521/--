var islock = true;
var dh = document.documentElement.clientHeight; //可视区高度
var dw = document.documentElement.clientWidth; //可视区宽度

	
function gestureFn(){  //相册多指操作函数
	
	var imgs = $(".bigImgWarp .bigImg img"),
		startRotate = 0,
		startScale =0;

	for (var i = 0; i < imgs.length; i++) {

		css(imgs[i],"translateZ",0.01);
		
		setGesture({
			
			el:imgs[i],
			
			start:function(e){

				startRotate = css(this,"rotate");
				
				startScale = css(this,"scale");
				
			},
			change:function(e){

				css(this,"rotate",startRotate + e.rotation);
				
				css(this,"scale",startScale * e.scale);
				
			},
			end:function(e){
				
				var _this = this;
				
				if( css( this,"scale" ) < 100 || css( this,"rotate" ) !== 0 ){
					
					$(this).css("transition","300ms");
					
					setTimeout(function(){
						
						setTimeout(function(){
							
							$(_this).css("transition","none");
							
							$(_this).data( "scale",css( this,"scale" )/100 );
							
						},300)
						
						css( _this,"scale",100 );
						
						css( _this,"rotate",0 );
						
					},0)
					
				}
			}
		})
		
	}		
	
}

(function(){
	// 解锁操作
	var disx = 0,
		pagex = 0,
		eLeft = $("#lock")[0].offsetLeft;
		
	$("#lock .open").eq(0).on("touchstart",function(event){
		
		var e = event.changedTouches[0];
			pagex = e.pageX;
			disx = pagex - eLeft;
		
	})
	
	$("#lock .open").eq(0).on("touchmove",function(event){
		
		var e = event.changedTouches[0];
		
		$("#lock").eq(0).css("-webkit-transform","translateX("+ (e.pageX - disx) +"px)");
		
	})
	
	$("#lock .open").eq(0).on("touchend",function(event){
		
		var e = event.changedTouches[0];
		
		var moveDis = e.pageX - pagex;
		
		$("#lock").eq(0).css("transition","300ms");
		
		setTimeout(function(){
			
			setTimeout(function(){
				$("#lock").eq(0).css("transition","none");
			},300)
			
			if( moveDis < $("#lock")[0].offsetWidth/2 ){   	//解锁失败

				$("#lock").eq(0).css("-webkit-transform","translateX(0px)");
				
			}else{	//解锁成功
				
				islock = false;
				$("#lock").eq(0).css("-webkit-transform","translateX(100vw)");				
				$(".page ul li").addClass("show");
				$(".warp .fixed").addClass("show");
				$("#state .time").eq(0).show();
			}			

		},0)

	})
	
})();

;(function(){

	//顶部菜单下拉操作
	var disY = 0;
		
	$(".head_show").eq(0).on("touchstart",function(event){
		var e = event.changedTouches[0];
		disY = e.pageY;
	})
	
	$(".head_show").eq(0).on("touchmove",function(event){
		
		var e = event.changedTouches[0];
		
		var y =  e.pageY - disY;
		
		y < 0 ? y = 0 : y;
		
		$("#lock").addClass("active");
		
		$("#head").addClass("active");
		
		$(".head_show").eq(0).css("-webkit-transform","translateY("+ y +"px)");
		
		$("#head").eq(0).css("-webkit-transform","translateY("+ y +"px)");
		
		if( islock ){
			
			$("#head").addClass("lock");
			
		} else{
			
			$("#head").addClass("unlock");
		}
		
	})
	
	$(".head_show").eq(0).on("touchend",function(event){
		
		var e = event.changedTouches[0];
		
		var scale = e.pageY / dh;
		
		if( scale < 0.3 ){
			
			$(".head_show").eq(0).css("transition","300ms")
			$("#head").eq(0).css("transition","300ms");
			
			setTimeout(function(){
				
				setTimeout(function(){
					
					$(".head_show").eq(0).css("transition","none")
					$("#head").eq(0).css("transition","none")				
					$("#lock").removeClass("active");
					$("#head").removeClass("active");
					
					if( islock ){
						
						$("#head").removeClass("lock");
						
					} else{
						
						$("#head").removeClass("unlock");
					}

				},300)
				
				$(".head_show").eq(0).css("-webkit-transform","translateY(0px)");
				
				$("#head").eq(0).css("-webkit-transform","translateY(0px)");	
	
				
			},0)
			
		}else if( scale >= 0.3){
			
			$(".head_show").eq(0).css("transition","300ms");
			
			$("#head").eq(0).css("transition","300ms");
			
			setTimeout(function(){
				
				setTimeout(function(){
					
					setTimeout(function(){
						
						$(".head_show").eq(0).css("transition","none");
						
						$("#head").eq(0).css("transition","none");
						
						
						$("#head").eq(0).css("-webkit-transform","translateY(100vh)");
						
						$(".head_show").eq(0).hide();
					},50)
					
				$("#head").eq(0).css("-webkit-transform","translateY(95vh)");
					
				},300)
				
				$(".head_show").eq(0).css("-webkit-transform","translateY(100vh)");
				
				$("#head").eq(0).css("-webkit-transform","translateY(100vh)");
				
				
			},0)
		}	
	})
	
	//顶部菜单上滑操作
	var start = 0;
	$("#head .back").eq(0).on("touchstart",function(){
		
		var e = event.changedTouches[0];		
		start = e.pageY;
	})
	
	$("#head .back").eq(0).on("touchmove",function(){
		
		var e = event.changedTouches[0];
		
		var y = (e.pageY - start)/ dh*100;
		
		y > 0 ? y = 0 : y;
		
		$("#head").eq(0).css("-webkit-transform","translateY("+ ( 100 + y ) +"vh)");			

	})
	
	$("#head .back").eq(0).on("touchend",function(){
		var e = event.changedTouches[0];
		var y = (e.pageY - start)/ dh*100;
		
		$("#head").eq(0).css("transition","300ms");		
		if( y < -15 ){

			setTimeout(function(){
				
				setTimeout(function(){
					
					$("#head").eq(0).css("transition","none");
					$(".head_show").eq(0).show();
					$(".head_show").eq(0).css("-webkit-transform","translateY(0vh)");
					
					$("#lock").removeClass("active");					
					$("#head").removeClass("active");
					
				},300);
				
				$("#head").eq(0).css("-webkit-transform","translateY(0vh)");
				
			},0);
			
		}else{
			setTimeout(function(){
				
				setTimeout(function(){
					
					setTimeout(function(){
	
							$("#head").eq(0).css("transition","none");
							
							$("#head").eq(0).css("-webkit-transform","translateY(100vh)");
					},50);
						
					$("#head").eq(0).css("-webkit-transform","translateY(95vh)");
						
				},300);			
	
				$("#head").eq(0).css("-webkit-transform","translateY(100vh)");

			},0);	
		}

	})

	$("#head input").eq(0).on("touchstart",function(event){
		
		$(this).addClass("active");
		$(this).focus();
		event.stopPropagation();
	})
		
	$(document).on("touchstart",function(){
		
		$("#head input").removeClass("active");
		$("#head input").blur();
	})
	
})();

(function(){
	
	//底部菜单上滑操作
	
	var disY = 0,
		maxY = $("#foot")[0].offsetHeight + 20,
		moveY = 0,
		isShow = false;
	$(".foot_show").eq(0).on("touchstart",function(event){
		var e = event.changedTouches[0];
		disY = e.pageY;
	})
	
	$(".foot_show").eq(0).on("touchmove",function(event){
		
		var e = event.changedTouches[0];
		
		var y =  e.pageY - disY;
		
		y > 0 ? y = 0 : y;		
		
		Math.abs(y) > maxY ? y = -maxY : y;	
		
		moveY = Math.abs(y);
		
		$(".foot_show").eq(0).css("-webkit-transform","translateY("+ y +"px)");
		
		$("#foot").eq(0).css("-webkit-transform","translateY("+ y +"px)");
		
	})
	
	$(".foot_show").eq(0).on("touchend",function(){
		
		$("#foot").eq(0).css("transition","300ms");
		
		if( moveY < maxY/2 ){
			
			setTimeout(function(){
				
				setTimeout(function(){
					
					$("#foot").eq(0).css("transition","none");
					
				},300)
						
				$(".foot_show").eq(0).css("-webkit-transform","translateY(0px)");
				
				$("#foot").eq(0).css("-webkit-transform","translateY(0px)");				
				
			},0)
			
		} else {  // 底部菜单栏显示

			setTimeout(function(){
				
				setTimeout(function(){
					
					$("#foot").eq(0).css("transition","none");
					
				},300)
						
				$(".foot_show").eq(0).css("-webkit-transform","translateY(0px)");
				
				$(".foot_show").eq(0).hide();
				
				$("#foot").eq(0).css("-webkit-transform","translateY("+ -maxY +"px)");
				
				$("#foot").eq(0).addClass("active");
				
				$("#mask").addClass("active");
				
				$("#mask").css("opacity" , opacity);
				
				isShow = true;
				
			},0)
			
		}
	})
	
	$("#foot").eq(0).on("touchend",function(event){
		
		
		event.stopPropagation();	
	})
	
	
	$(document).on("touchend",function(){
		
		if( isShow ) {
			
			$("#foot").eq(0).css("transition","300ms");
			
			setTimeout(function(){
				
				setTimeout(function(){
					
					$("#foot").eq(0).css("transition","none");
					
					$(".foot_show").eq(0).show();
					
					$("#foot").eq(0).removeClass("active");
				
					$("#mask").removeClass("active");
					
					$("#mask").css("opacity" , "0.4");
					
					isShow = false;				
					
				},300)
						
				$("#foot").eq(0).css("-webkit-transform","translateY(0px)");				
				
			},0)		
			
		}
	})
	
	// 底部菜单栏事件	
	$("#foot .items li").on("touchstart",function(){
		
		$(this).toggleClass("active");
		
	})

	// 声音调节按钮

	var startX,
		opacity = 0.4,
		disX = 0,
		upWidth = $(".sound .line_up")[0].offsetWidth,		
		currentX = 0,
		pInfo = $(".sound .line_down")[0].getBoundingClientRect();		

	$(".sound .soundBtn").eq(0).on("touchstart",function(event){
		
		var e = event.changedTouches[0];
		
		startX = e.pageX;	//开始的位置
		
		$(".sound .soundIcon").css("color","#fff");
		
	})
	
	$(".sound .soundBtn").eq(0).on("touchmove",function(event){
		
		var e = event.changedTouches[0];
		
		pageX = e.pageX; 
		
		pageX < pInfo.left ? pageX = pInfo.left : pageX;
		
		pageX > pInfo.right ? pageX = pInfo.right : pageX;
		
		disX = parseInt( pageX - startX);  //运动距离   

		var x = disX + currentX;	//运动时的实时位置
		
		opacity = 1 - (x/pInfo.width + 0.5);
		
		opacity > 0.8 ? opacity = 0.8 : opacity;
		
		$("#mask").css( "opacity" , opacity );
		
		$(this).css("-webkit-transform","translateX("+ x +"px)");
			
		$(".sound .line_up").css("width", (upWidth + x) +"px");
	})
	
	$(".sound .soundBtn").eq(0).on("touchend",function(event){	
		
		currentX = disX + currentX;  // 保存移动后的位置
		
		$(".sound .soundIcon").css("color","#333");

	})
	// Air功能开关
	$(".air div").on("touchstart",function(){
		
		$(this).toggleClass("active");
	})
	
	// 夜间模式
	$(".night div").on("touchstart",function(){
		
		$(this).toggleClass("active");
	})
	
})();

// 滑屏切换操作
(function(){
	
	var start,
		currentX = 0,
		startTime = 0,
		isMove = true,
		disTime = Infinity,
		num = 0,
		disX;
	
	$(".warp .page").eq(0).on("touchstart",function(event){
		if( !isMove ){
			return;
		}
		var e = event.changedTouches[0];
		start = e.pageX;
		disX = 0;
		startTime = new Date().getTime();
		
	})
	
	$(".warp .page").eq(0).on("touchmove",function(event){  //滑屏
		
		if( !isMove ){
			
			return;
		}		
		var e = event.changedTouches[0];
		
		if( num === 0 ){
			
			start = e.pageX;
		}
		
		num++;
		
		disX = e.pageX - start;
	
		if( currentX === 0 &&  disX > 0 ){ 

			$(this).css("-webkit-transform","translateX("+ ( -currentX*dw + disX*0.3 ) +"px)");	
			
		}else if( currentX === $(".page ul").length - 1 && disX < 0  ){

			$(this).css("-webkit-transform","translateX("+ ( -currentX*dw + disX*0.3 ) +"px)");	
			
		} else{
			
			$(this).css("-webkit-transform","translateX("+ ( -currentX*dw + disX ) +"px)");	
		}

	})
	
	
	$(".warp .page").eq(0).on("touchend",function(ev){
		
		if( !isMove ){
			return;
		}		
		var e = ev.changedTouches[0];

		isMove = false;
		
		num = 0;
		
		disTime = new Date().getTime() - startTime;
		
		$(this).css("transition","300ms");
		
		var that = this;
		
		setTimeout(function(){
			
			setTimeout(function(){
				
				isMove = true;
				
				$(that).eq(0).css("transition","none");
				
				$(".fixed .icon span").removeClass("active");
				
				$(".fixed .icon span").eq( currentX ).addClass("active");
				
			},300)

			if( ( disX/dw ) > 0.5 || ( ( disX/dw ) > 0.25 && (disTime < 300) ) ){	//向右滑屏
				
				currentX--;
	
				currentX < 0 ? currentX = 0 : currentX;
				
	
				$(that).css("-webkit-transform","translateX("+ -currentX*dw +"px)");
				
			} else if ( (disX/dw) < -0.5 || ( ( disX/dw ) < -0.25 && (disTime < 300) ) ) { //向左滑屏
				
				currentX++;
	
				currentX > $(".page ul").length - 1 ? currentX = $(".page ul").length - 1 : currentX;
				
				$(that).css("-webkit-transform","translateX("+ -currentX*dw +"px)");
	
			}else{	//滑屏翻页失败，返回当前页
				
				$(that).css("-webkit-transform","translateX("+ -currentX*dw +"px)");
			}

		},0)

	})	
	
})();

// app事件
(function(){
	
	var isMove = false,
		isclick,
		timer,
		disX,
		disY,
		left,
		top,
		ulclient,
		time = 0;
		
	function position(arrElement){ //浮动转定位
		var arr = [];
		for( var i=0; i< arrElement.length; i++ ){
			
			var obj = {
						left: arrElement[i].offsetLeft,						
						top: arrElement[i].offsetTop	
					}
			
			arr.push(obj);
		
		}
		
		for( var i=0; i< arrElement.length; i++ ){
			
			arrElement[i].style.cssText = "position:absolute;margin:0px;float:none";
			
			arrElement[i].style.left = arr[i].left + "px";
			
			arrElement[i].style.top = arr[i].top + "px";
				
		}
	
	}
	
	position($(".page li"));
	
		
	$(".page li").on("touchstart",function(event){
		
		var e = event.changedTouches[0];
		
		var clientInfo = this.getBoundingClientRect();
		
		ulclient = this.parentNode.getBoundingClientRect();
		
		disX = e.pageX - clientInfo.left;
		
		disY = e.pageY - clientInfo.top;
		
		left = parseInt(getComputedStyle(this).left);
		
		top = parseInt(getComputedStyle(this).top);
		
		time = new Date().getTime();
		
		isMove = false;
		
		isclick = false;
		
		clearTimeout(timer);
		
		$(this).css("z-index",1);
		
		timer = setTimeout(function(){
			
			if( !isMove && !isclick ){ //长按操作
							
				$(".page li").toggleClass("active");
				
				$(".fixed_items li").toggleClass("active");
				
			}
	
		},500)

	})
	
	
	$(".page li").on("touchmove",function(event){
		
		var e = event.changedTouches[0];
		
		if( !isMove ){ //移动改变状态
			
			isMove = true;
		}
			
		if( $(this).hasClass("active") ){  //选中时移动就拖拽
			
			event.stopPropagation();
			
			$(this).css("transition","none");
			
			$(this).css("left",(e.pageX - disX ) + "px");
			
			$(this).css("top", (e.pageY - disY - ulclient.top ) + "px");
			
			$(this).css("z-index",10);
			
		}
		
	})
	
	function remove(element,celection){ //删除app封装
		
		var index = element.index();
		
		var parent = element.parent();
		
		var arr = [];
		
		var j = 0;
		
		for (var i = index; i < (celection.length-1); i++,j++) {
			
			arr[j] = [celection.eq(i).css("left"),celection.eq(i).css("top")];
		}
		
		element.remove();
	
		for (var i = 0; i < arr.length; i++,index++) {
			
			parent.find("li").eq(index).css("left",arr[i][0]);
			
			parent.find("li").eq(index).css("top",arr[i][1]);
		}
		
		return element;
	}
	
	
	$(".page li").on("touchend",function(event){
		
		var e = event.changedTouches[0];

		if( !isMove ){ //单击操作
			
			time = new Date().getTime() - time; //时间差

			if( time <= 500 ){
				
				isclick = true;
				
				if( !$(this).hasClass("active") ){
					
//					console.log("点击事件");
					//点击事件接口
					
				}else{

					if( $(this).data("candel") ){ //删除功能
						
						$("#mask").show();

						var _this = $(this);
						
						var obj = {
							title:'移除“' + $(this).find(".title").eq(0).text() + '”？',
							
							ok(){

								$(this.parentNode).hide();
								
								$("#mask").hide();
								
								var tl = new tools( _this.parent().data("page"),_this.data("index") );
								
								var a = tl.removeData();
								
								remove(_this,_this.parent().find("li")); //最后删除元素
								
							},
							cancel(){								
								
								
								$(this.parentNode).hide();
								
								$("#mask").hide();
							}
						};
						
						new Dialog(obj);
					}
				}

			}
		} else {
			
			if( $(this).hasClass("active") ){
				
				$(this).css("left",left + "px");
				
				$(this).css("top",top + "px");
				
				$(this).css("z-index",0);
			}

		}
	
	})
	
	
	// 底部固定栏 app
	$(".fixed_items li.app").on("touchstart",function(){
		
		time = new Date().getTime();
		
		isMove = false;
		
	})
	
	$(".fixed_items li.app").on("touchmove",function(){
		
		isMove = true;
	})
	
	$(".fixed_items li.app").on("touchend",function(){
		
		time = new Date().getTime() - time;
		
	})
	

	$(".app").on("touchend",function(){ //进入app页面
		
		if( !isMove && !$(this).hasClass("active") && time < 500 ){

			var text = $(this).find("span.title").text();
			
			$(".fixed").removeClass("show");
			
			$(".page ul li").removeClass("show"); 
			
			$(".appContent").show();
			
						
			if( text === "相册" ){
				
				$(".appContent .album").show();
				
				var scroll = new IScroll(".appContent .album",{
//					
//					scrollbars:true,
//					interactiveScrollbars:true
				});
				
			}else if( text === "我的音乐" ){
				
				$(".appContent .musicPlayer").show();
				
			}else{
				
				$(".appContent .noInfo").show();
			}
			
			setTimeout(function(){
				
				$(".appContent").addClass("show");
				
				$(".fixed").hide();
				
			},100)
		}
		
	})
	
})();

 // app内部点击事件
;(function(){
	
	var isMove;
	
	$(".appContent .menu .iconBack").on("touchstart",function(){
		
		isMove = false;
		
		$(this).addClass("active");
		
	})
	
	$(".appContent .menu .iconBack").on("touchmove",function(){
		
		isMove = true;
		
	})	
	
	$(".appContent .menu .iconBack").on("touchend",function(event){
		
		$(this).removeClass("active");
		
		if( isMove ){
			
			return
		}
		
		var e = event.changedTouches;
			
		$(".appContent").removeClass("show");
		
		setTimeout(function(){
			
			$(".appContent").hide();
			
			$(".appContent div.info").hide();
			
			$(".fixed").show();
			
			setTimeout(function(){
				
				$(".fixed").addClass("show");
				
				$(".page ul li").addClass("show"); 
				
			},0)

		},300)
		
	})
	
})();

//相册操作
;(function(){
	
	var canDel = true,
		indexArr =[],	//记录选中的照片的索引值
		index; 	//记录点击的照片
	

	$(".album .titie .select").on("touchstart",function(){ //选择照片按钮
		
		if( !$(this).data("onoff") ){
			
			$(this).data("onoff",true);
			
			$(".album .titie .delet").show();
			
			$(this).html("取消");
			
			$(".album .titie p").show();
			
		} else {
			
			$(this).data("onoff",false);
			
			$(".album .titie .delet").hide();
			
			$(this).html("选择");
			
			$(".album_list li .mask").hide();
			
			$(".album .titie p").hide();
			
			$(".album_list li").removeClass("active");
//			
//			$(".bigImg div").removeClass("active");
			
			$(".album .titie p").text("已选择0项");
		}

	})
	
	//删除照片功能
	
	$(".album .titie .delet").on("touchmove",function(){
		
		canDel = false;
	})
	
	$(".album .titie .delet").on("touchend",function(){
		
		if( !canDel ){
			
			canDel = true;
			
		}else{
			
			$("#mask").show();
			
			new Dialog({
				title:"删除 "+$(".album_list li.active").length +" 张照片？",
				content:"这些照片将被删除，此操作不能撤销。",
				ok:function(){
									
			
					indexArr = $(".album_list li.active").map(function(index,items){
						
						return $(items).index();
						
					})
					
					indexArr.sort(function(a,b){
						return b - a
					})
					
					for (var i = 0; i < indexArr.length; i++) {
						
						photosData.splice(indexArr[i],1);
					}
					
					
					
					// 重新生成相册列表				
					var photos = { data : photosData };
		
					$(".appContent .album_list").html( template('photosHtml', photos) ); 
					
					
					$(".bigImg").css("width",photosData.length*100 +"vw");
					
					var imgStr = "";
					
					for (var i = 0; i < photosData.length; i++) {
						
						imgStr += "<div><img src='"+ photosData[i] +"' /></div>";
					}
		
					$(".bigImg").html( imgStr );
					
					$(".album .titie p").text("已选择0项");
					
					new IScroll(".appContent .album",{});
					
					gestureFn(); //相册多指操作
				
					$("#mask").hide();
					$(".dialog").hide();
					$(".dialog").remove();
				},
				cancel:function(){
					
					$("#mask").hide();
					$(".dialog").remove();
				}
			});
			
		}
		
		
	})
	
	// 返回小图按钮
	
	$(".album .titie .back").on("touchstart",function(){
		
		$(".bigImgWarp").css({
				
			"transform":"scale(0)",
			
			"-webkit-transform":"scale(0)"				
		});
		
		$(".bigImgWarp .bigImg").data("currentIndex",null);

		$(".album .titie .select").show();
		
		$(".album .titie").removeClass("noBg");
		
		$(".bigImgWarp .bigImg img").css({
				
									"transform":"scale(1) translateX(0) translateY(0)",
									"-webkit-transform":"scale(1) translateX(0) translateY(0)"
										});

		$(".bigImgWarp .bigImg img").data("scale",1);
		
		$(this).hide();
		
		$(".menu").show();
					
		setTimeout(function(){
			
			$(".album_list li").css("opacity","1");

		},200)
		
	})
	
	// 点击照片
	var isMove;
	
	$(".album .album_list").on("touchstart",function(){
		
		isMove = false;
	})
	
	$(".album .album_list").on("touchmove",function(){
		
		isMove = true;
	})
	
	$(".album .album_list").on("touchend",function(evevt){
		
		var target = event.target;

		var bl = $(".album .titie .select").data("onoff");
		
		var imgIndex,
			len;
		
		if( isMove ){
			
			return
		}
		
		if( target.nodeName !== "LI" ){
			
			if( $(target).parents().filter("li").length ){
				
				target = $(target).parents().filter("li")[0];
				
			} else {
				
				return
			}

		}
		
		if( bl ){	//选择照片
			
			$(target).toggleClass("active");
						
			$(target).find(".mask").toggle();
			
			len = $(this).find("li.active").length;
			
			$(".album .titie p").text("已选择"+ len +"项");
			
		}else{	//查看照片大图

			$(this).find("li").css("opacity",0);
			
			$(".album .titie").addClass("noBg");
			
			index = $(target).index();
			
			imgIndex = $(target).index();

			$(".bigImgWarp .bigImg").data("currentIndex",imgIndex);
			
			$(".bigImgWarp .bigImg").css("transform","translateX("+ -imgIndex*dw +"px)");
			
			$(".bigImgWarp .bigImg img").removeClass("active");
			
			$(".bigImgWarp .bigImg img").eq(index).addClass("active");

			setTimeout(function(){
				
				$(".bigImgWarp").css({
				
					"transform":"scale(1)",
					
					"-webkit-transform":"scale(1)"
				});
				
			},0);

			$(".album .titie .back").show();

			$(".album .titie .select").hide();
			
			$(".menu").hide();
			
		}
	})
	
})();

// 相册大图左右滑动功能

;(function(){
	
	var start,
		moveTime,
		moveDis,
		index,
		touchesLen,
		num = 0,
		isMove = false;
	
	$(".bigImgWarp").on("touchstart",function(evevt){ 	//按下
		
		touchesLen = event.touches.length;
		
		
		if( isMove || touchesLen > 1 ){
			
			return		
		}
		
		var e = event.changedTouches[0];

		index = $(".bigImgWarp .bigImg").data("currentIndex");
		
		$(".bigImgWarp .bigImg img").removeClass("active");
		
		$(".bigImgWarp .bigImg img").eq(index).addClass("active");
			
		moveTime = 0;
		
		moveDis = 0;
		
		start = e.pageX;
		
		moveTime = new Date().getTime();
		
	})
	
	$(".bigImgWarp").on("touchmove",function(event){ //滑动
		
		touchesLen = event.touches.length;
		
		var scale = $(event.target).data("scale");
		
		if( isMove || touchesLen > 1 || scale > 1 ){
			
			return		
		}
		
		var e = event.changedTouches[0];
		
		if( num === 0 ){
			
			start = e.pageX;
			
			moveTime = 0;
		
			moveDis = 0;
			
			moveTime = new Date().getTime();
			
		}
		
		num++;
		
		moveDis = parseInt(e.pageX - start);
		
		if( index === 0 && moveDis > 0 ){

			$(".bigImgWarp .bigImg").css("transform","translateX("+ (-index*dw + moveDis*0.3) +"px)");			
			return
		}
		
		if( index === photosData.length -1 && moveDis < 0 ){

			$(".bigImgWarp .bigImg").css("transform","translateX("+ (-index*dw + moveDis*0.3) +"px)");
			return
		} 
		
		$(".bigImgWarp .bigImg").css("transform","translateX("+ (-index*dw + moveDis) +"px)");
		
		$(".bigImgWarp .bigImg").css("-webkit-transform","translateX("+ ( -index*dw + moveDis) +"px)");
		
	})
	
	$(".bigImgWarp").on("touchend",function(){ //抬起
		
		touchesLen = event.touches.length;
		
		num = 0;
		
		if( isMove || touchesLen > 1 ){
			
			return		
		}
		
		isMove = true;
		
		moveTime = new Date().getTime() - moveTime;
		
		var _this = this;
				
		if( Math.abs(moveDis) >= (dw/2) || ( moveTime < 300 && ( Math.abs(moveDis) > (dw/3)) ) || ( moveTime < 150 && ( Math.abs(moveDis) > (dw/4)) ) ){
			
			$(".bigImgWarp .bigImg").css("transition","400ms");

			setTimeout(function(){				
				
				setTimeout(function(){
					
					$(".bigImgWarp .bigImg").css("transition","none");						

					isMove = false;

				},410)							
				
				if( moveDis > 0 && index ){ //向右滑屏 
					
					index--;
					
					index < 0 ? index = 0 : index;
					
					$(".bigImgWarp .bigImg").data("currentIndex",index);
					
				} else if( moveDis < 0 && index < (photosData.length - 1) ){ //向左滑屏

					index++;
					
					index > (photosData.length -1) ? index = (photosData.length -1) : index;
					$(".bigImgWarp .bigImg").data("currentIndex",index);
					
				}
				
				$(".bigImgWarp .bigImg img").removeClass("active");
				
				$(".bigImgWarp .bigImg img").eq(index).addClass("active");	
				
				$(".bigImgWarp .bigImg").css("transform","translateX("+ -index*dw +"px)");
			
				$(".bigImgWarp .bigImg").css("-webkit-transform","translateX("+ -index*dw +"px)");				
				
			},0)

			
		} else { //距离太短，滑屏失败
						
			$(".bigImgWarp .bigImg").css("transition","300ms");				
			
			setTimeout(function(){
				
				setTimeout(function(){
					
					$(".bigImgWarp .bigImg").css("transition","none");
					
					isMove = false;
					
				},310)

				
				$(".bigImgWarp .bigImg").css("transform","translateX("+ -index*dw +"px)");
			
				$(".bigImgWarp .bigImg").css("-webkit-transform","translateX("+ -index*dw +"px)");				
				
			},0)
			
		}

	})	
	
})();

// 相册多指操作

gestureFn();





