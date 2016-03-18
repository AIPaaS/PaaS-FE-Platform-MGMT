package com.aic.paas.console.res.vo;

import java.util.List;

import com.aic.paas.console.res.bean.PcComputer;


public class ResDetailInfo {
	
	private Long resCenterId;
	private String resCenterName;
	private Long dataCenterId;
	private String dataCenterName;
	private String imagePath;
	private String domain;
	private String externalDomain;
	
	//资源初始化状态
	private Integer initStatus;
	
	private List<PcComputer> corePartList;
	private List<PcComputer> visitPartList;
	private List<PcComputer> slavePartList;
	
	private List<PcComputer> computerList;
	
	public Integer getInitStatus() {
		return initStatus;
	}
	public void setInitStatus(Integer initStatus) {
		this.initStatus = initStatus;
	}
	public List<PcComputer> getComputerList() {
		return computerList;
	}
	public void setComputerList(List<PcComputer> computerList) {
		this.computerList = computerList;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getExternalDomain() {
		return externalDomain;
	}
	public void setExternalDomain(String externalDomain) {
		this.externalDomain = externalDomain;
	}
	public Long getResCenterId() {
		return resCenterId;
	}
	public void setResCenterId(Long resCenterId) {
		this.resCenterId = resCenterId;
	}
	public String getResCenterName() {
		return resCenterName;
	}
	public void setResCenterName(String resCenterName) {
		this.resCenterName = resCenterName;
	}
	public Long getDataCenterId() {
		return dataCenterId;
	}
	public void setDataCenterId(Long dataCenterId) {
		this.dataCenterId = dataCenterId;
	}
	public String getDataCenterName() {
		return dataCenterName;
	}
	public void setDataCenterName(String dataCenterName) {
		this.dataCenterName = dataCenterName;
	}
	public List<PcComputer> getCorePartList() {
		return corePartList;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public void setCorePartList(List<PcComputer> corePartList) {
		this.corePartList = corePartList;
	}
	public List<PcComputer> getVisitPartList() {
		return visitPartList;
	}
	public void setVisitPartList(List<PcComputer> visitPartList) {
		this.visitPartList = visitPartList;
	}
	public List<PcComputer> getSlavePartList() {
		return slavePartList;
	}
	public void setSlavePartList(List<PcComputer> slavePartList) {
		this.slavePartList = slavePartList;
	}
	
	
}
