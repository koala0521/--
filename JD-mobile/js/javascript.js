			var dpr = 1 / window.devicePixelRatio;
			document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale='+dpr+',minimum-scale='+dpr+',maximum-scale='+dpr+'" />')
			var fz = document.documentElement.clientWidth / 10;
			//alert(fz);
			document.getElementsByTagName('html')[0].style.fontSize = fz + 'px';