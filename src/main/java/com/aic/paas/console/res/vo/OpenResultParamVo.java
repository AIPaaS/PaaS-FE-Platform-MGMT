package com.aic.paas.console.res.vo;

import java.io.Serializable;

public class OpenResultParamVo implements Serializable{

	private  String  resultCode;
	
	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	private  String  resultMsg;
	
	private static final long serialVersionUID = 3516594882924001947L;

}
