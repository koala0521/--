
;(function(){
	
var view = document.documentElement;

var warp = document.getElementsByClassName("warp")[0];

var list = document.getElementById("list");

var sections = Array.from(document.getElementsByClassName("page"));

var as = document.getElementById("list").getElementsByTagName("a");

as = Array.from(as);

var isScroll = true;

var hash = window.location.hash?window.location.hash.slice(1):1;

hash = Number(hash)===Number(hash)?Number(hash):1;

var currentIndex = hash-1;

if(currentIndex !== 0 ){
	
isScroll = false;	

warp.style.transition = "none";

warp.style.transform = "translateY("+ -((currentIndex)*h) +"px)";

removeClass(sections[0],"active")

addClass(sections[currentIndex],"active");

setTimeout(function(){
	
	warp.style.transition = "700ms ease-in";
	isScroll = true;
		
},1500)	

}

addClass(as[currentIndex],"active");

	
function addScroll (obj,fnUp,fnDown) {	//为obj添加鼠标滚轮事件处理函数

	obj.onmousewheel = fn;
	obj.addEventListener("DOMMouseScroll",fn);
	
	function fn (e) {//只要滚动滚轮了，就会触发fn
		var e = e || event;
		if(e.wheelDelta){//chrome
			e.wheelDelta<0? fnDown(): fnUp();
			return false;
		}
		if(e.detail){//firefox
			e.detail>0? fnDown(): fnUp();
			e.preventDefault();
		}
	}
}

// 判断元素是否有指定的className
function hasclass(e,className){
	var arrClass = e.className.split(" ");
	var className = className.substring(1);
	for (var i = 0; i < arrClass.length; i++) {
		if( className == arrClass[i] ){
			return true;						
		}
	}				
	return false;
}

function addClass(e, value){	//添加class
	
	e.className += " "+ value;
}

function removeClass(e, value){	 //删除class
	    	
	var arr = e.className.split(" ");
	arr = arr.filter(function( v ){
		
		return v != value;
	})
	
	e.className = arr.join(" ");
}

addScroll (document,scrollUp,scrollDown); //滚轮事件

function scrollUp(){  //向上滚动
	
	if( currentIndex === 0 ){
		return
	}
	
	if(isScroll){
	
		isScroll = false;
		removeClass(as[currentIndex],"active")
		removeClass(sections[currentIndex],"active")
		currentIndex--;
		hash = currentIndex+1;
		window.location.hash = hash;
		addClass(sections[currentIndex],"active");
		addClass(as[currentIndex],"active");
		warp.style.transform = "translateY("+ -(currentIndex*h) +"px)";
		setTimeout(function(){
			
			isScroll = true;
				
		},1700)		
		
	}	
}

function scrollDown(){		// 向下滚动
	
	if( currentIndex === sections.length - 1 ){
		return
	}	

	if( isScroll ){

		isScroll = false;
		
		removeClass(sections[currentIndex],"active")
		removeClass(as[currentIndex],"active");
		currentIndex++;
		hash = currentIndex+1;
		window.location.hash = hash;
		addClass(sections[currentIndex],"active");
		addClass(as[currentIndex],"active");
		warp.style.transform = "translateY("+ -(currentIndex*h) +"px)";
		setTimeout(function(){
			
			isScroll = true;
				
		},1700)			
		
	}

}

	//------------------------- 导航事件 ---------------------------
	
list.addEventListener("mouseover",over);	//移入事件
list.addEventListener("mouseout",out);		//移出事件

function over(ev){
	
	var ev = ev || event;
	var target = ev.target;
	if(target.nodeName === "A"){
		var span = target.parentNode.getElementsByTagName("span")[0];
		span.innerHTML = target.parentNode.dataset.tooltip;
		span.style.display = "block";
	}
}
	
function out(ev){	
	var ev = ev || event;	
	var target = ev.target;
	if(target.nodeName === "A"){		
		var span = target.parentNode.getElementsByTagName("span")[0];
		span.style.display = "none";
	}
}	
list.addEventListener("click",fnClick);		// 点击跳转

function fnClick(ev){
	
	var ev = ev || event;
	var target = ev.target;
	if(target.nodeName === "A"){
		
		var differ = Math.abs( currentIndex - (parseInt(target.dataset.page) - 1) );

		if( !differ ){
			
			return
		}

		if( isScroll ){
			
			isScroll = false;
			
			if( differ > 1 ){
//				
				var differ = sections.filter(function(item){
					
					return parseInt(item.dataset.page)-1 !== currentIndex && parseInt(item.dataset.page) !== parseInt(target.dataset.page);
				})
				
				differ.forEach(function(item){
					
					item.style.display = "none";
				})				
//				
				warp.style.transition = "none";	
				
				if(  currentIndex < (parseInt(target.dataset.page) - 1) ){  // 向后跳多页
					warp.style.transition = "none";	
					warp.style.transform = "translateY(0px)";
					

				}else{	// 向前跳多页
					
					warp.style.transition = "none";	
					warp.style.transform = "translateY("+ -h +"px)";
									
				}
				
				setTimeout(function(){
					
					warp.style.transition = "700ms ease-in";
					
					removeClass(sections[currentIndex],"active");
					removeClass(as[currentIndex],"active");
					
					addClass(sections[parseInt(target.dataset.page)-1],"active");
					addClass( target,"active" );
					
					if( currentIndex < (parseInt(target.dataset.page) - 1) ){
						
						warp.style.transform = "translateY("+ -h +"px)";
						
					} else {
						
						warp.style.transform = "translateY(0px)";
						
					}
					
					
					currentIndex = parseInt(target.dataset.page)-1;
					hash = currentIndex + 1;
					window.location.hash = hash;
					
				},0)					
				
				
				setTimeout(function(){

					warp.style.transition = "none";					
					
					sections.forEach(function(item){
						
						item.style.display = "block";
					})
					
					warp.style.transform = "translateY("+ -(parseInt(target.dataset.page) - 1)*h +"px)";
									
					setTimeout(function(){
						
						warp.style.transition = "700ms ease-in";
						
						isScroll = true;
							
					},100)	

					
				},1600)
				
				return
			}

			
			removeClass(sections[currentIndex],"active");
			
			removeClass(as[currentIndex],"active");
			
			currentIndex = parseInt(target.dataset.page) - 1;
			
			hash = currentIndex + 1;
			
			window.location.hash = hash;
			
			addClass(sections[currentIndex],"active");
			
			addClass(as[currentIndex],"active");			
			
			warp.style.transform = "translateY("+ -(currentIndex*h) +"px)";
			
			setTimeout(function(){
				
				isScroll = true;
					
			},1700)		
			
		}

	}
}


})()
