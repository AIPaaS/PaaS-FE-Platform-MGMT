package com.aic.paas.console.res.bean;

import java.util.List;

public class ResDetailInfo {
	Long resCenterId;
	String resCenterName;
	Long dataCenterId;
	String dataCenterName;
	String imagePath;
	List<PcComputer> corePartList;
	List<PcComputer> visitPartList;
	List<PcComputer> slavePartList;
	List<PcComputer> computerList;
	
	public List<PcComputer> getComputerList() {
		return computerList;
	}
	public void setComputerList(List<PcComputer> computerList) {
		this.computerList = computerList;
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
