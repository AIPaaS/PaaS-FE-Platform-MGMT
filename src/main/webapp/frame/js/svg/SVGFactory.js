

function SVGFactory(SVG) {
	var thiz = this;
	
	/**
	 * 创建元素
	 * @param {} tagName
	 * @param {} config
	 * @return {}
	 */
	this.getEl = function(tagName, config) {
		var el = document.createElement(tagName);
		SU.setAttributes(el,config);
		return el;
	}
	
	
	/**
	 * 圆
	 * @param {} config
	 * @return {}
	 */
	this.getCircle = function(config) {
		return thiz.getEl("circle", config);
	}
	
	/**
	 * 距形
	 * @param {} config
	 */
	this.getRect = function(config) {
		return thiz.getEl("rect", config);
	}
	
	/**
	 * 线
	 * @param {} config
	 * @return {}
	 */
	this.getLine = function(config) {
		return thiz.getEl("line", config);
	}
	
	/**
	 * 路径
	 * @param {} config
	 * @return {}
	 */
	this.getPath = function(config) {
		return thiz.getEl("path", config);
	}
	
	/**
	 * 路径
	 * @param {} config
	 * @return {}
	 */
	this.getImage = function(config) {
		return thiz.getEl("image", config);
	}
	
	/**
	 * 文本
	 * @param {} config
	 * @return {}
	 */
	this.getText = function(config) {
		return thiz.getEl("text", config);
	}
	
	/**
	 * 组
	 * @param {} config
	 */
	this.getGroup = function(config) {
		var childs = config.childs;
		delete config.childs;
		var el = thiz.getEl("g",config);
		if(childs!=null && childs!==undefined) {
			for(var i=0; i<childs.length; i++) {
				el.appendChild(childs[i]);
			}
		}
		return el;
	};
	
}