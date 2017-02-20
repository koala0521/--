var domTools = {		
		// 判断元素是否有指定的className
		hasclass:function hasclass(e,className){
			var arrClass = e.className.split(" ");
			var className = className.substring(1);
			for (var i = 0; i < arrClass.length; i++) {
				if( className == arrClass[i] ){
					return true;						
				}
			}				
			return false;
		},
		//找某个元素符合条件的父级元素或者自身
		findParent:function findParent(e,attr){
			var first = attr.charAt(0);
			if(first == "."){	//如果传入的是class
				if( domTools.hasclass(e,attr) ){
					return e;
				}else{					
					while(e.nodeType != 9 && !domTools.hasclass(e,attr) ){
						e = e.parentNode;	
					}
				}
			}else if(first == "#"){	//如果传入的是id
				if( e.id == attr.substring(1)){
					return e;
				}else{
					
					while(e.nodeType != 9 && e.id != attr.substring(1) ){
						e = e.parentNode;	
					}
				}
			} else{	//如果传入的是标签名
				if( e.nodeName.toLowerCase() == attr){
					return e;
				}else{
					
					while(e.nodeType != 9 && e.nodeName.toLowerCase() != attr ){
						e = e.parentNode;	
					}
				}
			}				
			return e.nodeType == 9? null : e;
			
		},
		//根据ID找自身元素  第一个参数(arrData)为一个元素集合 ,第二个参数为 指定的id
		findAllChildrenbyId : function findAllChildrenbyId(arrData,id){
			var slef = arrData.find(function(v){
				return v.dataset._id == id;
			})
			return slef;
		},
		//碰撞检测
	    peng:function peng(obj1,obj2){//返回结果如果为true，说明碰到
	    	var pos1 = obj1.getBoundingClientRect();
	    	var pos2 = obj2.getBoundingClientRect();
	    	
	    	return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && pos1.top < pos2.bottom;
	    },
	    
	    //添加class
	    addClass:function addClass(e, classname){
	    	
	    	e.className += " "+ classname;
	    },
	    //删除指定class
	    removeClass:function addClass(e, classname){
	    	
	    	var arr = e.className.split(" ");
	    	arr = arr.filter(function( v ){
	    		
	    		return v != classname;
	    	})
	    	
	    	e.className = arr.join(" ");
	    },
	    //获取元素方法（静态方法）:  第一个参数(attr)为属性名或者标签名，需小写； 第二个参数（parent）为获取源 ，可不写，默认为document; 返回值：找到的一个元素 或者一组元素
	    $e: function $e(attr,parent){
	    	var first = attr.charAt(0);
	    	parent = parent ? parent : document;
	    	var e = null;
	    	if(first === "#"){
	    		e = parent.querySelector(attr);
	    	}else{	    		
	    		e = parent.querySelectorAll(attr);
	    	}	    	
	    	return e;
	    }
	    
}
