function tools(n,m){
	
	this.data = data;
	
	if( n && (typeof n !== "number") ){
		
		throw new Error("n is not a numer");
	}
	
	if( m && (typeof m !== "number") ){
		
		throw new Error("m is not a numer");
	}				
	
	n =  (n === "undefined") ? -1 : n;
	
	m =  (m === "undefined") ? -1 : m;
		
	this.n = n;
	
	this.m = m;	

}
tools.prototype = {
	
	constructor:tools,
		
	findData(){ //找数据

		if( this.n === -1 || this.m === -1  ){
			
			return null
		}
		
		var data = null;
		
		for (var i = 0; i < this.data.length; i++) {
			
			if( this.data[i].page === this.n ){
				
				for (var j = 0; j < this.data[i].list.length; j++) {					
					
					if( this.data[i].list[j].index === this.m ){

						data = this.data[i].list[j];
						
						break
					}
						
				}
				
				break
			}
		}
		
		return data;

	},
	removeData(){ //删除数据

		var arr = this.data[this.n - 1].list;
		
		var data = null;

		for (var i = 0; i < arr.length; i++) {
			
			if( arr[i] === this.findData() ){
				
				data = arr[i];

				arr.splice(i,1);
				
				break
			}
		}
		
		return data;		
		
	}

	
}