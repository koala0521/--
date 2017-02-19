var tools = {
		//函数封装 根据传入的数据的 id值 从传入的数组中找所有父级数据 包含自身
			findParentsDataById : function findParentsDataById(arrData,id){
				var arr = [];
				var obj = arrData.find(function( v ){ //根据id找数据并返回
					return v.id == id;
				}) 				
				if( obj){ //如果数据存在存在数组中
					arr.unshift( obj );
					arr = arr.concat( findParentsDataById( arrData,obj.pid) );
				}				
				return arr;
			},
		//函数封装 根据传入的数据的 id值 从传入的数组找第一级子级数据
			findchildrenDataById : function findchildrenDataById(arrData,id){				
				return arrData.filter(function(v){
					return v.pid == id;
				})
			},			
			
			//根据ID找自身对应的数据
			findSelfById : function findSelfById(arrData,id){
				var objSelf = arrData.find(function( v ){ //根据id找数据并返回
					return v.id == id;
				}) 					
				return objSelf;
			},
			//根据ID找自身元素  第一个参数(elements)为一个元素集合 ,第二个参数为 指定的id
			findElementById : function findElementById(elements,id){
				var arr = Array.from(elements);
				var slef = arr.find(function(v){
					return v.dataset._id == id;
				})
				return slef;
			},			
			//根据ID找自身的索引
			findSelfIndex : function findSelfIndex(arrData,id){
				return arrData.findIndex(function( v ){ //根据id找数据的索引并返回
					return v.id == id;
				}) 					
			}
			,
			//根据元素的id找对应的所有子数据 (不包含自身)
			findAllChidrenById:function findAllChidrenById(arrData,id){
//				var self = tools.findSelfById(arrData,id);
				var arr = arrData.filter(function( v ){
					return v.pid == id;
				})
//				console.log(arr);
				if(arr.length){
					arr.forEach(function(v){
						arr = arr.concat(tools.findAllChidrenById(arrData,v.id));
					})
				}
				return arr;
			},
//			//检测重名  返回值为布尔值 true代表 有重名 ； false 代表 没有重名
			findSameTitle:function findSameTitle(arrData,value,id){
				var arr = tools.findchildrenDataById(arrData,id);
				var index = arr.findIndex(function( v ){
					return v.title == value;
				})
				
				return index != -1;
			},
//				//通过指定id，找到这个id的所有的子孙数据（包括自身），放在数组中
			getChildsAll:function getChildsAll(arrData,id){
				var arr = [];
		
				var self = tools.findSelfById(arrData,id);
				arr.push(self);
				var child = tools.findchildrenDataById(arrData,self.id);
				child.forEach(function(v){
					arr = arr.concat( tools.getChildsAll(arrData,v.id) );
				})
				return arr;
			},
			//指定多个id存在数组中，找到这些id的每一个数据的子孙数据
			getChildsAllByIdarr:function getChildsAllByIdarr(arrData,idArr){
				var arr = [];
				
				idArr.forEach(function ( v ){	
					arr = arr.concat(tools.getChildsAll(arrData,v));
				})		
				return arr;
			},
			// 判断两个数组中是否有相同的id; 参数为两个数组 ，数组1 存放选中的id;  数组2 存放数据中跟数组1中某一个id同级的所有数据的 id;
			findSameId:function findSameId(arrSlect,arr2){
				
				for (var i = 0; i < arrSlect.length; i++) {
					
				}
				
			}
			
			
}

