window.onload = function(){
	
	var obannerImg = document.getElementById("bannerImg");
	var obannerLeft = document.getElementById("bannerLeft");
	var obannerRight = document.getElementById("bannerRight");
	
	var oone = document.getElementById("one");
	var otwo = document.getElementById("two");
	var othree = document.getElementById("three");
	var ofour = document.getElementById("four");
	var ofive = document.getElementById("five");
	var osix = document.getElementById("six");
	
	
	var arr =['img/banner/banner1.jpg','img/banner/banner2.jpg','img/banner/banner3.jpg','img/banner/banner4.jpg','img/banner/banner5.jpg','img/banner/banner6.jpg'];
	var num = 0;
		

	obannerRight.onclick = function(){
		num++;
		if(num ==arr.length){
		num=0;
		}	
		obannerImg.src = arr[num];


	}

	obannerLeft.onclick = function(){
		num--;		
		if(num <0){
			num=arr.length - 1;
		}		

		obannerImg.src = arr[num];
	}
	
	oone.onclick = function(){
		obannerImg.src = 'img/banner/banner1.jpg';
	//	oone.style.background = 'url(../img/numberHover.png)';
	}
	
	otwo.onclick = function(){
		obannerImg.src = 'img/banner/banner2.jpg';
	}
	othree.onclick = function(){
		obannerImg.src = 'img/banner/banner3.jpg';
	}
	ofour.onclick = function(){
		obannerImg.src = 'img/banner/banner4.jpg';
	}
	ofive.onclick = function(){
		obannerImg.src = 'img/banner/banner5.jpg';
	}
	osix.onclick = function(){
		obannerImg.src = 'img/banner/banner6.jpg';
	}
	
	
	
	
}
