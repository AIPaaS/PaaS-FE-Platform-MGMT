
function Cookie() {
	
	var thiz = this;
	
	/**
	 * 添加cookie
	 * @param key: 键
	 * @param value: 值
	 * @param config: cookie配制对象, 其内部属性包括:
	 * 			expires:
	 * 			path:
	 * 			domain:
	 * 			secure: 
	 */
	this.put = function(key, value, config) {
		if(config==undefined || config==null) config = {};
		if(config.expires==undefined || config.expires==null) {
			var expdate = new Date(); 
		    expdate.setTime(expdate.getTime()+(1000*60*60*24*14));
		    config.expires = expdate;
		}
		if(config.path==undefined || config.path==null) config.path = "/";
		var cookie = key+"="+escape(value)+";expires="+config.expires.toGMTString()+";path="+config.path;
		if(config.domain!=undefined && config.domain!=null) cookie += ";domain="+config.domain;
		if(config.secure == true) cookie += ";secure";
		document.cookie = cookie;
	};
	
	/**
	 * 获取cookie
	 */
	this.get = function(key) {
		var arg = key + "=";
	    var alen = arg.length;
	    var clen = document.cookie.length;
	    var i = 0;
	    var j = 0;
	    while(i < clen){
	        j = i + alen;
	        if (document.cookie.substring(i, j) == arg)
	            return thiz.getCookieValue(j);
	        i = document.cookie.indexOf(" ", i) + 1;
	        if(i == 0)
	            break;
	    }
	    return null;
	};
	
	/**
	 * 删除cookie
	 */
	this.remove = function(key) {
		if(thiz.get(key)){
		    var expdate = new Date(); 
		    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
		    thiz.put(key, "", expdate); 
		}
	};
	
	this.getCookieValue = function(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if(endstr == -1){
		    endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	};
}
