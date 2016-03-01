package com.aic.paas.console.res.bean;

import java.io.Serializable;


/**
 * 资源项目
 * @author wanwb
 *
 */
public class ResItems implements Serializable {
	private static final long serialVersionUID = 1L;

	
	/** CPU个数, 单位：0.00个 **/
	private Long cpuCount;
	
	/** 内存大小, 单位：M **/
	private Long memSize;
	
	/** 硬盘大小, 单位：M **/
	private Long diskSize;
	
	
	

	public Long getCpuCount() {
		return cpuCount;
	}

	public void setCpuCount(Long cpuCount) {
		this.cpuCount = cpuCount;
	}

	public Long getMemSize() {
		return memSize;
	}

	public void setMemSize(Long memSize) {
		this.memSize = memSize;
	}

	public Long getDiskSize() {
		return diskSize;
	}

	public void setDiskSize(Long diskSize) {
		this.diskSize = diskSize;
	}
	
	
	
	
	
	
	
}
