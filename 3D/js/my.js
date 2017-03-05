(function(){
	
	var currentX = 0,		
		disX = 0,		
		moveDegX = 0,		
		startX = 0,
		list1 = $(".list").eq(0);
		
	$(document).on( "touchstart" , function(ev){
		
		var e = ev.changedTouches[0];
		
		startX = e.pageX;
		
		currentX = css( list1[0],"rotateY" );
		
	});
	
	$(document).on("touchmove",function(ev){
		
		var e = ev.changedTouches[0];
		
		disX = e.pageX - startX;
		
		moveDeg = Math.asin( disX/2/w )*180/Math.PI;
		
		css( list1[0] ,"rotateY", currentX - moveDegX );

	})
	
	$(document).on("touchend",function(){
		
		disX = 0;
		
		moveDegX = 0;
		
	})
	
}())
