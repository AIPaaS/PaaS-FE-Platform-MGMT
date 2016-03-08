package com.aic.paas.console.res.bean;



import com.binary.framework.bean.EntityBean;


/**
 * mapping-table: 服务器登记表[PC_COMPUTER]
 */
public class PcComputer implements EntityBean {
	private static final long serialVersionUID = 1L;


	/**
	 * mapping-field: ID[ID]
	 */
	private Long id;


	/**
	 * mapping-field: 服务器编号[CODE]
	 */
	private String code;


	/**
	 * mapping-field: 所属机房[ROOM_ID]
	 */
	private Long roomId;


	/**
	 * mapping-field: 所在机架[LOCATION]
	 */
	private String location;


	/**
	 * mapping-field: 所属数据中心ID[DATA_CENTER_ID]
	 */
	private Long dataCenterId;


	/**
	 * mapping-field: 所属资源中心ID[RES_CENTER_ID]
	 */
	private Long resCenterId;


	/**
	 * mapping-field: 所属网络区域ID[NET_ZONE_ID]
	 */
	private Long netZoneId;


	/**
	 * mapping-field: 服务器IP[IP]
	 */
	private String ip;


	/**
	 * mapping-field: CPU核数[CPU_COUNT]
	 * 单位：0.00个
	 */
	private Integer cpuCount;


	/**
	 * mapping-field: CPU可用于集群的核数[CPU_OFFER]
	 */
	private Integer cpuOffer;


	/**
	 * mapping-field: CPU主频[CPU_FREQUENCY]
	 * 单位：Hz
	 */
	private Long cpuFrequency;


	/**
	 * mapping-field: CPU型号[CPU_MODEL]
	 */
	private String cpuModel;


	/**
	 * mapping-field: 内存大小[MEM_SIZE]
	 * 单位：M
	 */
	private Long memSize;


	/**
	 * mapping-field: 可用于集群的内存[MEM_OFFER]
	 */
	private Long memOffer;


	/**
	 * mapping-field: 内存类型[MEM_TYPE]
	 */
	private String memType;


	/**
	 * mapping-field: 硬盘大小[DISK_SIZE]
	 * 单位：M
	 */
	private Long diskSize;


	/**
	 * mapping-field: 存储类型[DISK_TYPE]
	 */
	private String diskType;


	/**
	 * mapping-field: 带宽[BAND_WIDTH]
	 * 单位：K
	 */
	private Long bandWidth;


	/**
	 * mapping-field: 操作系统[OS_NAME]
	 */
	private String osName;


	/**
	 * mapping-field: 登录账号[LOGIN_NAME]
	 */
	private String loginName;


	/**
	 * mapping-field: 登录密码[LOGIN_PWD]
	 */
	private String loginPwd;


	/**
	 * mapping-field: 交换机[EX_SWITCH]
	 */
	private String exSwitch;


	/**
	 * mapping-field: 子网[SUB_NET]
	 */
	private String subNet;


	/**
	 * mapping-field: 机型[MODEM]
	 */
	private String modem;


	/**
	 * mapping-field: 物理机[PHYSICAL_COMPUTER]
	 */
	private String physicalComputer;


	/**
	 * mapping-field: 描述[REMARK]
	 */
	private String remark;


	/**
	 * mapping-field: 状态[STATUS]
	 * 0=无效 1=有效
	 */
	private Integer status;


	/**
	 * mapping-field: 备用字段_1[CUSTOM_1]
	 */
	private Long custom1;


	/**
	 * mapping-field: 备用字段_2[CUSTOM_2]
	 */
	private Long custom2;


	/**
	 * mapping-field: 备用字段_3[CUSTOM_3]
	 */
	private Long custom3;


	/**
	 * mapping-field: 备用字段_4[CUSTOM_4]
	 */
	private String custom4;


	/**
	 * mapping-field: 备用字段_5[CUSTOM_5]
	 */
	private String custom5;


	/**
	 * mapping-field: 备用字段_6[CUSTOM_6]
	 */
	private String custom6;


	/**
	 * mapping-field: 数据状态[DATA_STATUS]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer dataStatus;


	/**
	 * mapping-field: 创建时间[CREATE_TIME]
	 * yyyyMMddHHmmss
	 */
	private Long createTime;


	/**
	 * mapping-field: 修改时间[MODIFY_TIME]
	 * yyyyMMddHHmmss
	 */
	private Long modifyTime;




	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public String getCode() {
		return this.code;
	}
	public void setCode(String code) {
		this.code = code;
	}


	public Long getRoomId() {
		return this.roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}


	public String getLocation() {
		return this.location;
	}
	public void setLocation(String location) {
		this.location = location;
	}


	public Long getDataCenterId() {
		return this.dataCenterId;
	}
	public void setDataCenterId(Long dataCenterId) {
		this.dataCenterId = dataCenterId;
	}


	public Long getResCenterId() {
		return this.resCenterId;
	}
	public void setResCenterId(Long resCenterId) {
		this.resCenterId = resCenterId;
	}


	public Long getNetZoneId() {
		return this.netZoneId;
	}
	public void setNetZoneId(Long netZoneId) {
		this.netZoneId = netZoneId;
	}


	public String getIp() {
		return this.ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}


	public Integer getCpuCount() {
		return this.cpuCount;
	}
	public void setCpuCount(Integer cpuCount) {
		this.cpuCount = cpuCount;
	}


	public Integer getCpuOffer() {
		return this.cpuOffer;
	}
	public void setCpuOffer(Integer cpuOffer) {
		this.cpuOffer = cpuOffer;
	}


	public Long getCpuFrequency() {
		return this.cpuFrequency;
	}
	public void setCpuFrequency(Long cpuFrequency) {
		this.cpuFrequency = cpuFrequency;
	}


	public String getCpuModel() {
		return this.cpuModel;
	}
	public void setCpuModel(String cpuModel) {
		this.cpuModel = cpuModel;
	}


	public Long getMemSize() {
		return this.memSize;
	}
	public void setMemSize(Long memSize) {
		this.memSize = memSize;
	}


	public Long getMemOffer() {
		return this.memOffer;
	}
	public void setMemOffer(Long memOffer) {
		this.memOffer = memOffer;
	}


	public String getMemType() {
		return this.memType;
	}
	public void setMemType(String memType) {
		this.memType = memType;
	}


	public Long getDiskSize() {
		return this.diskSize;
	}
	public void setDiskSize(Long diskSize) {
		this.diskSize = diskSize;
	}


	public String getDiskType() {
		return this.diskType;
	}
	public void setDiskType(String diskType) {
		this.diskType = diskType;
	}


	public Long getBandWidth() {
		return this.bandWidth;
	}
	public void setBandWidth(Long bandWidth) {
		this.bandWidth = bandWidth;
	}


	public String getOsName() {
		return this.osName;
	}
	public void setOsName(String osName) {
		this.osName = osName;
	}


	public String getLoginName() {
		return this.loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}


	public String getLoginPwd() {
		return this.loginPwd;
	}
	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}


	public String getExSwitch() {
		return this.exSwitch;
	}
	public void setExSwitch(String exSwitch) {
		this.exSwitch = exSwitch;
	}


	public String getSubNet() {
		return this.subNet;
	}
	public void setSubNet(String subNet) {
		this.subNet = subNet;
	}


	public String getModem() {
		return this.modem;
	}
	public void setModem(String modem) {
		this.modem = modem;
	}


	public String getPhysicalComputer() {
		return this.physicalComputer;
	}
	public void setPhysicalComputer(String physicalComputer) {
		this.physicalComputer = physicalComputer;
	}


	public String getRemark() {
		return this.remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}


	public Integer getStatus() {
		return this.status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}


	public Long getCustom1() {
		return this.custom1;
	}
	public void setCustom1(Long custom1) {
		this.custom1 = custom1;
	}


	public Long getCustom2() {
		return this.custom2;
	}
	public void setCustom2(Long custom2) {
		this.custom2 = custom2;
	}


	public Long getCustom3() {
		return this.custom3;
	}
	public void setCustom3(Long custom3) {
		this.custom3 = custom3;
	}


	public String getCustom4() {
		return this.custom4;
	}
	public void setCustom4(String custom4) {
		this.custom4 = custom4;
	}


	public String getCustom5() {
		return this.custom5;
	}
	public void setCustom5(String custom5) {
		this.custom5 = custom5;
	}


	public String getCustom6() {
		return this.custom6;
	}
	public void setCustom6(String custom6) {
		this.custom6 = custom6;
	}


	public Integer getDataStatus() {
		return this.dataStatus;
	}
	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}


	public Long getCreateTime() {
		return this.createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}


	public Long getModifyTime() {
		return this.modifyTime;
	}
	public void setModifyTime(Long modifyTime) {
		this.modifyTime = modifyTime;
	}


}


