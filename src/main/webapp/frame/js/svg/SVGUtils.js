

function SVGUtils() {
	var thisobj = this;
	
	this.setAttributes = function(el, atts) {
		if(PARENT.CU.isEmpty(el) || PARENT.CU.isEmpty(atts)) return ;
		for(var key in atts) {
			var v = atts[key];
			if(PARENT.CU.isEmpty(key) || PARENT.CU.isEmpty(v)) continue;
			if(PARENT.CU.isFunction(v)) {
				el.addEventListener(key,v,false);
			}else {
				key=thisobj.filterKey(key);
				if(key == "xlink:href") {
					el.setAttributeNS("http://www.w3.org/1999/xlink","href",v);
				}else {
					el.setAttribute(key, v);
				}
			}
		}
	}
	
	
	this.filterKey = function(key) {
		if(key == "strokeWidth") {
			return "stroke-width";
		}else if(key == "markerEnd") {
			return "marker-end";
		}else if(key == "xlinkHref") {
			return "xlink:href";
		}else if(key == "fillOpacity") {
			return "fill-opacity";
		}
		return key;
	}
}

