;(function(){
	
var content = document.getElementById("content");
var filesNavBox = document.getElementById("filesNav").getElementsByClassName("nav")[0];
var filesBox = document.getElementById("filesBox");
var listBox = document.getElementById("listBox");
var Data = data.files;
var checkAll = document.getElementById("checkAll");
var falseBox = document.getElementById("falseBox"); //新建失败的弹窗
//生成结构


//生成导航栏数据
function creatNav(arrData,id){
	
	var arrNav = tools.findParentsDataById(arrData,id).reverse();
	var str = "";
	for (var i = 0; i < arrNav.length; i++) {
		if( i == arrNav.length-1 ){
			str += "<a class='active' data-_id="+ arrNav[i].id +" href='javascript:;'>"+ arrNav[i].title +"</a> <span class='noDir'></span>";
		}else{
			str += "<a data-_id="+ arrNav[i].id +" href='javascript:;'>"+ arrNav[i].title +"</a> <span class=''></span>";
		}
		
	}	
	return str;
}
//生成内容区数据
function creatContent(arrData,id){
	
	var arrContent = tools.findchildrenDataById(arrData,id);
	var str = "";
	for (var i = 0; i < arrContent.length; i++) {
		
		str += "<div class = 'bg1 items' data-_id='"+ arrContent[i].id +"' data-_index='"+ (i+1) +"'> <span class='checkbox' data-onoff = 'false' data-_index='"+ (i+1) +"' /> </span> <input class='text' type='text' value='"+ arrContent[i].title + "' data-_index='"+ (i+1) +"' /> </div>";

	}
	
	return str;
}
//生成左侧菜单

function creatList(arrData,id){	
	var str = "";	
	if(id == -1){
		str+= "<ul id='aside'>";
	}else{
		str += "<ul>";
	}	
	var children = tools.findchildrenDataById(arrData,id);
		for (var i = 0; i < children.length; i++) {
			var childrenLen = tools.findchildrenDataById(arrData,children[i].id).length;//当前这条数据的子数据数量
			var parentsLen = tools.findParentsDataById(arrData,children[i].id).length;//当前这条数据的所有父级数据数量
			var addClass = childrenLen? 'normal' : ''; //如果有子数据，就添加class
			
			str += "<li><h3 style='padding-left :"+ parentsLen*20 +"px' data-_id="+ children[i].id +"><i class='"+ addClass +"'></i> <span class='icon'></span><span class='font'>"+ children[i].title +"</span></h3>";
			str += creatList(arrData,children[i].id)+"</li>";	
	}	
	str += "</ul>";
	
	return str;
}

listBox.innerHTML = creatList(Data,-1); //生成菜单栏

filesBox.innerHTML = creatContent(Data,0);//生成内容区

filesNavBox.innerHTML = creatNav(Data,0); //默认生成最顶层

//内容区函数封装

function showContent(Data,id){  //Data 为数据, id为点击的元素的id
	var arrChildren = tools.findchildrenDataById(Data,id).length;
	
		if(!arrChildren){ //不存在子元素的话显示背景图片
			filesBox.innerHTML = "<div class='filesBoxBg'>" + "</div>";
			
		}else{//存在子元素的话显示对应的内容
			filesBox.innerHTML = creatContent(Data,id);
		}
}

// 全选按钮的取消封装
function cancelCheckAll(){	 //取消全选		
	checkAll.innerHTML = "";
	checkAll.dataset.onoff = "false";
}
//判断是否全选函数
function iScheckedAll(){
	var checkBox = Array.from(filesBox.getElementsByClassName("checkbox"));
	var onOff = false;
	onOff = checkBox.every(function( v ){
		return v.dataset.onoff == "true";
	})
	if(onOff){
		checkAll.innerHTML = "✔";
		checkAll.dataset.onoff = "true";
	}else{
		checkAll.innerHTML = "";
		checkAll.dataset.onoff = "false";
	}
	
}


//事件绑定区
var h3s = listBox.getElementsByTagName("h3");
var last = 0;
var files = filesBox.getElementsByClassName("items");
var checkBox = filesBox.getElementsByClassName("checkbox");
tools.findElementById(h3s,last).className = "active";
var downTarget = null;


//左侧菜单栏事件添加

listBox.addEventListener("click",function(ev){
	var h3s = listBox.getElementsByTagName("h3");
	var targrt = ev.target;
	targrt = domTools.findParent(targrt,"h3");
	if( targrt ){
		tools.findElementById(h3s,last).className = "";
		targrt.className = "active";
		last = targrt.dataset._id;
		filesNavBox.innerHTML = creatNav(Data,targrt.dataset._id);	//导航区		
		showContent(Data,targrt.dataset._id); //内容区显示
		 //取消全选
		cancelCheckAll();
		
		ev.preventDefault();
	}
	
})

//导航栏的事件绑定

filesNavBox.addEventListener("click",function( ev ){

	if(ev.target.nodeName.toLowerCase() == "a" && ev.target.className!="active"){
			
		ev.target.className = "active";
		
		filesNavBox.innerHTML = creatNav(Data,ev.target.dataset._id); //默认生成最顶层		
		showContent(Data,ev.target.dataset._id);//生成内容区				
		//取消全选
		cancelCheckAll();
		
		//切换左侧菜单栏的选中效果
		tools.findElementById(h3s,last).className  = "";  //清空上一个
		tools.findElementById(h3s,ev.target.dataset._id).className = "active";  //给当前添加
		last = ev.target.dataset._id;  //给上一个从新赋值
	}
	
})

//内容区域的事件绑定

filesBox.addEventListener("mouseup",function(ev){
	var h3s = listBox.getElementsByTagName("h3");
	var e = ev.target;

	var checkBox = Array.from(filesBox.getElementsByClassName("checkbox"));
	
//	console.log(downTarget,e);
	
	if( !(downTarget === e) ){
		return;
	}

	if(e.dataset._id){ //如果点击的是整个div
//		
		var onoff = e.getElementsByClassName("checkbox")[0].dataset.onoff;
		if( onoff === "true" ){ //如果 div 被选中， return
			return;
		}
		
		tools.findElementById(h3s,last).className  = "";	
		
		last = e.dataset._id;
		
		tools.findElementById(h3s,last).className = "active";
		
		filesNavBox.innerHTML = creatNav(Data,e.dataset._id); //生成最顶层
		showContent(Data,e.dataset._id);//生成内容区
		
		//取消全选
		cancelCheckAll();

	}else if(e.nodeName.toLowerCase() == "span"){ //如果点击的是勾选框

		if(e.dataset.onoff == "true"){
			e.dataset.onoff = false;
			checked(e,e.dataset.onoff);
			
		}else{
			e.dataset.onoff = true;
			checked(e,e.dataset.onoff);
		}
		
		iScheckedAll(); //判断选框是否选中来显示对应的状态
		
	}else if(e.nodeName.toLowerCase() == "input"){  //如果点击的是输入框
		
		return;
		
		if( hasChecked().length != 1 ){ //判断是否选中一个text
			tipWin(null,"请选择一个元素~");
			ev.preventDefault();
			return;
		}
		
		e.style.backgroundColor = "rgba(255,255,255,1)";
		e.select();
		var value = e.value;
		e.onblur = function(){
			this.style.backgroundColor = "rgba(255,255,255,0)";
			if(this.value ==""){
				this.value = value;
			}
		}
	}	
	ev.preventDefault();	// 阻止浏览器默认事件
	ev.cancelable = true;
})

//内容区的鼠标移入事件
filesBox.addEventListener("mouseover",function(ev){
	var checkBox = this.getElementsByClassName("checkbox");
	var e = ev.target;
	if( domTools.findParent(e,"div").dataset._id  ){ //如果移入的是整个div，显示这个DIV下的全选框
		e = domTools.findParent(e,"div");
		var checkBox = e.getElementsByClassName("checkbox")[0];		
		checkBox.style.display = "block"; 
		
	}else{	//否则隐藏没有选中的所有的全选框
		for (var i = 0; i < checkBox.length; i++) {
			if(checkBox[i].dataset.onoff == "false"){
				checkBox[i].style.display = "none";
			}			
		}
	}
	
})

//全选按钮的鼠标指针样式
checkAll.addEventListener("mouseover",function(){
	var len = filesBox.getElementsByClassName("checkbox").length;
	if(!len){
		checkAll.style.cursor = "not-allowed";
	}else{
		checkAll.style.cursor = "pointer";
	}
});

checkAll.addEventListener("mouseout",function(){
	checkAll.style.cursor = "pointer";
});

//全选和全不选功能
checkAll.addEventListener("click",checkedAll);


//全选和全不选功能函数封装
function checkedAll(){
	var checkBox = filesBox.getElementsByClassName("checkbox");
	
	if(checkBox.length > 0){
		checkAll.style.cursor = "pointer";
		if(checkAll.dataset.onoff=="false"){
			checkAll.dataset.onoff=true;
			checkAll.innerHTML = "✔";
			for (var i = 0; i < checkBox.length; i++) {
				checkBox[i].dataset.onoff = true;
				checked(checkBox[i],checkBox[i].dataset.onoff);
			}
		}else{
			//取消全选
			cancelCheckAll();
			for (var i = 0; i < checkBox.length; i++) {
				checkBox[i].dataset.onoff = false;
				checked(checkBox[i],checkBox[i].dataset.onoff);
			}
		}		
	}	
}

//勾选框的事件封装
function checked(e,onoff){ //第一个参数为一个元素 ，第二个参数是他身上的自定义属性 data-onoff
	
	if(onoff === "false"){
		e.style.display = "none";
		e.parentNode.style.backgroundColor = "#EAEDF4";
		e.parentNode.style.boxShadow = "none";
		e.innerHTML = "";
		e.style.background = "";
		e.dataset.onoff = false;
		
	}else{	
		e.style.display = "block";
		e.parentNode.style.backgroundColor = "#fff";			
		e.parentNode.style.boxShadow = "0 0 3px 3px rgba(85,173,200,.3)";
		e.innerHTML = "✔";
		e.style.background = "#55addc";	
		e.dataset.onoff = true;
		
	}
}
	var nav = document.getElementById("nav");
	var as = nav.getElementsByTagName("a");
	var rebuildOnoff = true;
//-----------------------------------------提示框弹出函数封装---------------------------------
//提示框弹出函数封装
//	var tipTimer = null;
	function tipWin(className,str){
		
		falseBox.innerHTML = str;
		falseBox.style.transition = "none";
		falseBox.style.top = "-100px";
		
		setTimeout(function(){
			falseBox.style.transition = "500ms";
			falseBox.style.top = "0px";
		},0)
		clearTimeout(falseBox.tipTimer);
		falseBox.tipTimer = setTimeout(function(){
			falseBox.style.top = "-100px";
		},1500)
	}

//---------------------------------新建功能------------------------------------------	
	as[5].addEventListener("mouseup",rebuild);
	function rebuild(ev){
		
		if(rebuildOnoff){
			rebuildOnoff = false;
			filesBox.innerHTML = "<div id = 'rebuild'  class = 'bg1' data-_id='-999' data-_index='-999'> <span class='checkbox' data-onoff = 'false' data-_index='' /> </span> <input class='text' type='text' value='' data-_index='' /> </div>" + filesBox.innerHTML;
			
			text1 = filesBox.getElementsByClassName("text")[0];
			text1.focus();			
			text1.addEventListener("mousedown",function(ev){
				ev.stopPropagation();
				
			})			
		}
		text1.focus();
		text1.style.backgroundColor = "rgba(255,255,255,1)";

//		ev.stopPropagation();
	}
// 点击其他地方判断 新建文件夹是否成功
document.addEventListener("mousedown",function(){
	var oRebuild = document.getElementById("rebuild");
	
	if(oRebuild){ 
		var text1 = oRebuild.getElementsByClassName("text")[0];
		var v = text1.value.trim();			
			if(v ==""){	//没有输入名字，新建失败
				
			filesBox.removeChild(filesBox.children[0]);
			//新建失败提示框
			tipWin(null,"新建失败~~");
			rebuildOnoff = true;
		}else if(tools.findSameTitle(Data,v,last)){	//名字重复，新建失败
			filesBox.removeChild(filesBox.children[0]);
			//新建失败提示框
			tipWin(null,"名字已存在，新建失败~~");
			rebuildOnoff = true;
		} else { //新建成功
			var obj = {
				id:Number(last) + 123 + Math.floor(Math.random()*100),
				pid:last,
				title:text1.value,
				type:"file"
			}
			Data.unshift(obj);
			
			//新建成功提示框
			tipWin(null,"新建成功~~");
			
			if( checkAll.dataset.onoff == "true"){ //如果全选按钮选中的话
				//取消全选
				cancelCheckAll();
			}
			
			filesBox.innerHTML = creatContent(Data,last);//重新渲染内容区
			listBox.innerHTML =	creatList(Data,-1);	//重新渲染菜单区
			var h3 = listBox.getElementsByTagName("h3");			
			tools.findElementById(h3s,last).className = "active";  //给当前添加
			
			rebuildOnoff = true;
		}	
	}
})

//-------------------------------------删除功能---------------------------------
var delBox = document.getElementById("delBox");
var delBtn = delBox.getElementsByClassName("btn");

//弹框默认事件阻止
delBox.addEventListener("mousedown",function(e){
	
	e.stopPropagation();
});

//----------------------------------弹框组件封装----------------------------------------

function popBox(className,tit,html){
	
	delBox.style.display = "block";		
	delBox.children[0].className = "move";
	delBox.children[0].getElementsByTagName("h3")[0].innerHTML = tit;
	
}


//删除事件
as[4].addEventListener("mouseup",deleTip);

function deleTip(){
	
	var checkBoxs = Array.from(checkBox);
	var arr =  checkBoxs.filter(function( v ){ //判断是否有选中的元素
		return v.dataset.onoff == "true";
	})
	
	if( !arr.length ){ //如果没有选中元素的话
		
		tipWin(null,"没有选中的元素~");

	}else{//点击删除按钮如果有选中的元素的话
		
		dialog({
			
			title:"删除文件",
			content:"确定要删除这个文件夹吗？<div style = ' color:#aaa;line-height:30px'>已删除的文件可以在回收站找到</div>",
			okFn:function(){
				dele();
			}
			
		})
	
	}
}

function dele(){
	var checkBoxs = Array.from(checkBox);
	var arr =  checkBoxs.filter(function( v ){ //判断是否有选中的元素
		return v.dataset.onoff == "true";
	})
	if( !arr.length ){ //如果没有选中元素的话
		
		tipWin(null,"没有选中的元素~");

	}else{//点击删除按钮如果有选中的元素的话
		
		var ah3 = [];
		
		for (var i = 0; i < arr.length; i++) { //查找选择的所有元素 和他们所有的子孙元素			
			var id = arr[i].parentNode.dataset._id;
			var h3 = tools.findElementById(h3s,id);			
			ah3 = ah3.concat( Array.from(h3.parentNode.getElementsByTagName("h3") ) );
		}
		
		for (var i = 0; i < ah3.length; i++) {	//删除选择的所有元素 和他们所有的子孙元素对应的数据
			
			var index = tools.findSelfIndex(Data,ah3[i].dataset._id);
			
			Data.splice(index,1);
			
		}		
		
		if( checkAll.dataset.onoff == "true"){ //如果全选按钮选中的话
			//取消全选
			cancelCheckAll();
		}
		
		showContent(Data,last);					//重新渲染内容区
		listBox.innerHTML =	creatList(Data,-1);	//重新渲染菜单区
		tools.findElementById(h3s,last).className = "active";
	}
	delBox.style.display = "none";
	
}
//--------------------------------碰撞检测---------------------------------
var main = filesBox.parentNode;
document.addEventListener("mousedown",creatDiv);//鼠标按下  创建框选 div

function creatDiv(e){
	var target = e.target;
	var oriX = e.clientX;
	var oriY = e.clientY;
	
	if(e.which != 1){
		return;
	}

	if( domTools.findParent(target,"#rebuild") || domTools.findParent(target,"a") || target.id === "checkAll" || target.className === "checkbox" ){
		return;
	}
	
	if( target = domTools.findParent(target,".items") ){		//判断是否是在items 身上按下  如果是给 target赋值
		var onoff = target.getElementsByClassName("checkbox")[0].dataset.onoff; 
		if( onoff === "true"){  // 移动到功能接口			
			return;
		}
		
		
	}

	var div = document.createElement("div");

	document.body.appendChild(div);
	document.addEventListener("mousemove",check); //鼠标移动 框选 div跟着鼠标移动
	function check(e){
		
		if(  Math.abs( e.clientX - oriX ) > 20 || Math.abs( e.clientY - oriY ) > 20 ){
			
			div.className = "box";
			div.style.zIndex = 999;
			
			div.style.left = oriX + "px";
			div.style.top = oriY + "px";			
		}
		
		div.style.width = Math.abs( e.clientX - oriX ) + "px";
		div.style.height = Math.abs( e.clientY - oriY ) + "px";
		div.style.left = Math.min( e.clientX,oriX ) + "px";
		div.style.top = Math.min( e.clientY,oriY ) + "px";	
		
		for (var i = 0; i < files.length; i++) {
			if(domTools.peng(div,files[i])){				
				checkBox[i].dataset.onoff = true;
				
			}else{
				checkBox[i].dataset.onoff = false;
			}			
			checked(checkBox[i],checkBox[i].dataset.onoff);
			
			iScheckedAll();
		}
		
	}
	// 鼠标抬起事件
	document.addEventListener("mouseup",clearFn);

	function clearFn(){
		document.body.removeChild( div );	
		document.removeEventListener("mousemove",check);
		document.removeEventListener("mouseup",clearFn);
	}
	
}

//检测内容区是否有选中的checkBox ,返回一个数组 包含选中的checkBox
function hasChecked(){
	var checkBoxs = Array.from(checkBox);
	var arr =  checkBoxs.filter(function( v ){ //判断是否有选中的元素
		return v.dataset.onoff == "true";
	})	
	return arr;
}
//检测内容区是否有选中的checkBox ,返回一个数组 包含 没有选中 的checkBox
function noChecked(){
	var checkBoxs = Array.from(checkBox);
	var arr =  checkBoxs.filter(function( v ){ //判断是否有选中的元素
		return v.dataset.onoff == "false";
	})	
	return arr;
}

//--------------------------------------重命名---------------------------------
var resetName = nav.getElementsByClassName("resetName")[0];
resetName.addEventListener("mouseup",reName);
function reName(){
	if(hasChecked().length === 0){
		tipWin(null,"没有选中元素~");
		return;
	}
	if( hasChecked().length > 1 ){
		
		tipWin(null,"选中太多，请选择一个~");
		return;
	}
	if(hasChecked().length === 1){
		
		var text = hasChecked()[0].parentNode.getElementsByClassName("text")[0];
		text.focus();
		text.select();
		
		return;
	}
}
//---------------------------------------------保存命名------------------------------
document.addEventListener("mousedown",function(ev){

	var focusEvent = document.activeElement; //获取当前有焦点的元素的方法

	
	if( focusEvent.nodeName != "BODY" && focusEvent.parentNode.id  !== "rebuild" ){  //判断是否正在重命名	
		
		if( ev.target == focusEvent ){
			return;
		}
		
		var id = domTools.findParent(focusEvent,".items").dataset._id;  //找到text 父级身上的 _id
		var obj = tools.findSelfById(Data,id);// 根据 _id 找到对应的数据
		
		var value = focusEvent.value; //焦点元素的value值
		
		if( obj.title !== value ){ //判断是否修改了名字
			
			if( tools.findSameTitle(Data,value,last) ){	//判断是否重复名字
				focusEvent.value = obj.title;
				
				focusEvent.focus();
				focusEvent.select();
				tipWin(null,"名字已存在，请重新设置~");
				ev.preventDefault(); // 阻止浏览器默认事件
				return;
			}
			obj.title = value; // 修改名字，保存到数据中
			tipWin(null,"修改成功~");			
			listBox.innerHTML =	creatList(Data,-1);	//重新渲染菜单区
			var hasckeck = hasChecked()[0];
			
			checked(hasckeck,"false"); //修改名字完成 取消选中状态
			
		}		
		focusEvent.blur(); //让text失去焦点
	}		
	ev.preventDefault(); // 阻止浏览器默认事件
},true)

//---------------------------------------拖拽------------------------------------------

filesBox.addEventListener("mousedown",moveFile);
	
var t = domTools.$e(".move-file-tip")[0];
var x = null;
var y = null;
var len = 0;
function moveFile(e){
	downTarget = e.target;
	if(e.which != 1 ){
		return;
	}
	var target = e.target;
	x =  e.clientX;
	y = e.clientY;
	if( domTools.findParent(target,".checkbox") || domTools.findParent(target,".text") ){
		return;		
	}	
	if( domTools.findParent(target,".items") ){
				
		var onoff = target.getElementsByClassName("checkbox")[0].dataset.onoff; 
		if( onoff === "true"){  // 移动到功能接口
			//记录选中的div的个数
			len = hasChecked().length;
			
			document.addEventListener("mousemove",moveTip); 			
			//抬起事件
			document.addEventListener("mouseup",clearMoveTip);			
			return;
		}
		
	}
}
//-----------------------拖拽小提示的移动函数---------------------- 
function moveTip(e){
	
	var oriX = e.clientX;
	var oriY = e.clientY;
	if(  Math.abs( x - oriX ) > 20 || Math.abs( y - oriY ) > 20 ){
		t.style.left = oriX + 15 + "px";
		t.style.top = oriY + 15 + "px";
		t.innerHTML = len;
		t.style.display = "block";			
	}
	
}
//抬起清除拖拽
function clearMoveTip(e){
	var target = e.target;
	var noSelect = noChecked().map(function( v ){ //找到没有选中的items放进 arr
		return domTools.findParent(v,".items");
	});
	var onoff =  noSelect.find(function(v){ 	//在 arr中找 target
		console.log("12-21/16:15修改")
		console.log(target);
		if( target  ){
			target = domTools.findParent(target,".items");
		}
		
		return v == target;
	});
	if( onoff ){ //如果能找到说明鼠标抬起的目标带点在没有选中的 某一个items上 
		var hasSelect =  hasChecked().map(function( v ){
			return domTools.findParent(v,".items").dataset._id;
		})
		
		
		hasSelect = hasSelect.map(function( v ){ //根据选中的元素找对应的数据
			return tools.findSelfById(Data,v);
		})
		
		//-------------------------------- 检测同名------------------------------

		var hasSelectItems = hasChecked().map(function( v ){
			return domTools.findParent(v,".items");
		})		
				//判断是否重名
				var onoff = false;
				var curentChildren = tools.findchildrenDataById(Data,target.dataset._id); //点击的数据的子数据
				for (var i = 0; i < hasSelect.length; i++) {
					var title = hasSelect[i].title;		//选中的元素的title
					if( tools.findSameTitle(Data,title,target.dataset._id) ){ //重名情况
						onoff = true;
					}else{											//没有重名情况
						hasSelect[i].pid = target.dataset._id;
						filesBox.removeChild( hasSelectItems[i] );
					}
				}				
				if( onoff ){
					
					tipWin(null,"有重名，部分移动失败~");
				}				
//		filesBox.innerHTML = creatContent(Data,last);//重新渲染内容区
		listBox.innerHTML =	creatList(Data,-1);	//重新渲染菜单区
		tools.findElementById(h3s,last).className = "active";

	}
	t.style.display = "none";	
	//清除拖拽
	document.removeEventListener("mousemove",moveTip); 	
	//抬起清除拖拽事件
	document.removeEventListener("mouseup",clearMoveTip);
}

//------------------------------------------------移动到------------------------------

domTools.$e(".moveTo")[0].addEventListener("mouseup",moveToFn);
var selectId = null;
var lastE = null;
var bl = true;
function moveToFn(){
	var arrElement = hasChecked().map(function( v ){	//根据选中的 checkebox 找到对应的items;
		return domTools.findParent(v,".items");
	})
	
	var arr = hasChecked().map(function( v ){	//根据选中的 checkebox 找到对应的items的 自定义属性_id;
		return domTools.findParent(v,".items").dataset._id;
	})
	
	if(hasChecked().length === 0){
		tipWin(null,"没有选中元素~");
		return;
	}
	if(hasChecked().length){
		//显示弹框
		dialog({
			
			title:"选择储存位置",
			content:creatPopList(Data,-1),
			okFn:function(){
				var moveList = document.getElementsByClassName("pop_list")[0];
				var onoff = false;

				if( bl ){
					return bl;
				}				
				//判断是否重名
				var curentChildren = tools.findchildrenDataById(Data,selectId); //点击的数据的子数据
				for (var i = 0; i < arr.length; i++) {
					var title = tools.findSelfById(Data,arr[i]).title;
					if( tools.findSameTitle(Data,title,selectId) ){ //重名情况
						onoff = true;
					}else{											//没有重名情况
						var obj = tools.findSelfById(Data,arr[i]);
						obj.pid = selectId;
						filesBox.removeChild( arrElement[i] );
					}
				}				
				if( onoff ){
					
					tipWin(null,"有重名，部分移动失败~");
				}
				
				var l = Array.from(filesBox.getElementsByClassName("checkbox")).length; //判断全选能否取消
				if( l == 0 ){
					cancelCheckAll();
					filesBox.innerHTML = "<div class='filesBoxBg'>" + "</div>";
				}
				//重新渲染
				listBox.innerHTML = creatList(Data,-1); //生成菜单栏

				return bl;
			}			
		})
		
		//重置变量		
		selectId = null;
		lastE = null;
		bl = true;
		console.log( selectId , lastE,bl);
		//---------------"移动到" 事件添加------------------------------
		var moveList = document.getElementsByClassName("pop_list")[0];
		moveList.addEventListener("mouseup",toTarget);
	}
	//------------------------移动到函数--------------------------------------
	function toTarget(e){

		var errorTip = document.querySelector(".full-pop .error");
		if( lastE ){
			lastE.className = "";
		}
		if( !domTools.findParent(e.target,"h3") ){
			
			return;
		}
		
		selectId = domTools.findParent(e.target,"h3").dataset._id; //弹框中选中的h3的自定义属性_id；
		
		domTools.findParent(e.target,"h3").className = "active";	//弹框中选中的h3加class
		
		lastE = domTools.findParent(e.target,"h3");		//弹框中选中的h3赋值给上一个,方便下次清除
	
		//判断是否移动到目前所在的文件夹
		if( tools.findSelfById(Data,arr[0]).pid == selectId  ){	
			
			errorTip.innerHTML = "该文件下已存在";
			return;
			
		}else{		
			
			errorTip.innerHTML = "";
		}
		var selectchildren =  tools.getChildsAllByIdarr(Data,arr); //选中的文件对应的数据 和所有子数据
		
		var selectchildrenId = selectchildren.map(function( v ){   //选中的文件对应的数据id 和所有子数据的id
			return v.id;
		})
		
		var isSelf = selectchildrenId.find( function( v ){   //判断是否移动到自身或者子文件下面 
			return v == selectId;
		} )
	
		if( isSelf ){   
			errorTip.innerHTML = "不能移动到自身或者子文件下面";
			return;
		}else{
			errorTip.innerHTML = "";
			bl = false;
		}		
	}

	return;
}
//生成左侧菜单
function creatPopList(arrData,id){
	var str = "";	
	if(id == -1){
		str+= "<ul class='pop_list' style = ''>";
	}else{
		str += "<ul>";
	}	
	var children = tools.findchildrenDataById(arrData,id);
		for (var i = 0; i < children.length; i++) {
			var childrenLen = tools.findchildrenDataById(arrData,children[i].id).length;//当前这条数据的子数据数量
			var parentsLen = tools.findParentsDataById(arrData,children[i].id).length;//当前这条数据的所有父级数据数量
			var addClass = childrenLen? 'normal' : ''; //如果有子数据，就添加class
			
			str += "<li><h3 style='padding-left :"+ (parentsLen*10-10) +"px;' data-_id="+ children[i].id +"><i class='"+ addClass +"'></i> <span class='icon'></span><span class='font'>"+ children[i].title +"</span></h3>";
			str += creatPopList(arrData,children[i].id)+"</li>";	
	}	
	str += "</ul>";
	
	return str;
}


//---------------------测试------------------------------


})()
