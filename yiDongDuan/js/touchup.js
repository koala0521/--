function Touchup( el , fn1 ,fn2 ){ //fn1符合条件才会执行,fn2不管条件是否符合都会执行
	
	if( !el ){
		
		return;
	}
	
	this.e = el;
	
	this.fn1 = fn1;
	
	this.fn2 = fn2;
	
	this.init();
	
}

Touchup.prototype = {
	
	constructor:Touchup,
	
	init:function(){
	
		var sPointX,			
			sPointY,
			moveX = 0,				
			moveY = 0,
			_this = this;
			
		this.e.addEventListener("touchstart",function(ev){
			
			var e = ev.changedTouches[0];
			
			sPointX = e.pageX;
			
			sPointY = e.pageY;
			
		
		});
		
		this.e.addEventListener("touchmove",function(ev){
			
			var e = ev.changedTouches[0];
			
			moveX = e.pageX - sPointX;
			
			moveY = e.pageY - sPointY;
			
		});
		
		this.e.addEventListener("touchend",function(ev){
			
			if( Math.abs(moveX) < 80 && Math.abs(moveY) < 80 ){

				_this.fn1 && _this.fn1.call(this,ev);
				
			}
			
			_this.fn2 && _this.fn2.call(this,ev);
			
			moveX = 0;
			
			moveY = 0;
		});
		
	}
	
	
}