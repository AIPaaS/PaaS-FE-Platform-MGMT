package com.aic.paas.console.res.bean;

import java.io.Serializable;

import com.aic.paas.frame.cross.bean.WsMerchent;

public class MntResApplyInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	
	/** 申请单 **/
	private PsMntResApply apply;
	
	/** 申请租户 **/
	private WsMerchent merchent;
	
	
	

	public PsMntResApply getApply() {
		return apply;
	}

	public void setApply(PsMntResApply apply) {
		this.apply = apply;
	}

	public WsMerchent getMerchent() {
		return merchent;
	}

	public void setMerchent(WsMerchent merchent) {
		this.merchent = merchent;
	}
	
	
	
	
	
}
