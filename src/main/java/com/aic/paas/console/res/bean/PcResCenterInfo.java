package com.aic.paas.console.res.bean;

import java.io.Serializable;

public class PcResCenterInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	/** 资源中心 **/
	private PcResCenter resCenter;
	
	
	/** 镜像库 **/
	private PcImageRepository imageResp;
	
	


	public PcResCenter getResCenter() {
		return resCenter;
	}


	public void setResCenter(PcResCenter resCenter) {
		this.resCenter = resCenter;
	}


	public PcImageRepository getImageResp() {
		return imageResp;
	}


	public void setImageResp(PcImageRepository imageResp) {
		this.imageResp = imageResp;
	}
	
	
	
	
	

}
