package com.aic.paas.console.res.bean;




import com.binary.framework.bean.Condition;


/**
 * condition-table: 服务器登记表[PC_COMPUTER]
 */
public class CPcComputer implements Condition {
	private static final long serialVersionUID = 1L;


	/**
	 * condition-field: ID[ID] operate-Equal[=]
	 */
	private Long id;


	/**
	 * condition-field: ID[ID] operate-In[in]
	 */
	private Long[] ids;


	/**
	 * condition-field: ID[ID] operate-GTEqual[>=]
	 */
	private Long startId;

	/**
	 * condition-field: ID[ID] operate-LTEqual[<=]
	 */
	private Long endId;


	/**
	 * condition-field: 服务器编号[CODE] operate-Like[like]
	 */
	private String code;


	/**
	 * condition-field: 服务器编号[CODE] operate-Equal[=]
	 */
	private String codeEqual;


	/**
	 * condition-field: 服务器编号[CODE] operate-In[in]
	 */
	private String[] codes;


	/**
	 * condition-field: 所属机房[ROOM_ID] operate-Equal[=]
	 */
	private Long roomId;


	/**
	 * condition-field: 所属机房[ROOM_ID] operate-In[in]
	 */
	private Long[] roomIds;


	/**
	 * condition-field: 所属机房[ROOM_ID] operate-GTEqual[>=]
	 */
	private Long startRoomId;

	/**
	 * condition-field: 所属机房[ROOM_ID] operate-LTEqual[<=]
	 */
	private Long endRoomId;


	/**
	 * condition-field: 所在机架[LOCATION] operate-Like[like]
	 */
	private String location;


	/**
	 * condition-field: 所属数据中心ID[DATA_CENTER_ID] operate-Equal[=]
	 */
	private Long dataCenterId;


	/**
	 * condition-field: 所属数据中心ID[DATA_CENTER_ID] operate-In[in]
	 */
	private Long[] dataCenterIds;


	/**
	 * condition-field: 所属数据中心ID[DATA_CENTER_ID] operate-GTEqual[>=]
	 */
	private Long startDataCenterId;

	/**
	 * condition-field: 所属数据中心ID[DATA_CENTER_ID] operate-LTEqual[<=]
	 */
	private Long endDataCenterId;


	/**
	 * condition-field: 所属资源中心ID[RES_CENTER_ID] operate-Equal[=]
	 */
	private Long resCenterId;


	/**
	 * condition-field: 所属资源中心ID[RES_CENTER_ID] operate-In[in]
	 */
	private Long[] resCenterIds;


	/**
	 * condition-field: 所属资源中心ID[RES_CENTER_ID] operate-GTEqual[>=]
	 */
	private Long startResCenterId;

	/**
	 * condition-field: 所属资源中心ID[RES_CENTER_ID] operate-LTEqual[<=]
	 */
	private Long endResCenterId;


	/**
	 * condition-field: 所属网络区域ID[NET_ZONE_ID] operate-Equal[=]
	 */
	private Long netZoneId;


	/**
	 * condition-field: 所属网络区域ID[NET_ZONE_ID] operate-In[in]
	 */
	private Long[] netZoneIds;


	/**
	 * condition-field: 所属网络区域ID[NET_ZONE_ID] operate-GTEqual[>=]
	 */
	private Long startNetZoneId;

	/**
	 * condition-field: 所属网络区域ID[NET_ZONE_ID] operate-LTEqual[<=]
	 */
	private Long endNetZoneId;


	/**
	 * condition-field: 服务器IP[IP] operate-Like[like]
	 */
	private String ip;


	/**
	 * condition-field: 服务器IP[IP] operate-Equal[=]
	 */
	private String ipEqual;


	/**
	 * condition-field: 服务器IP[IP] operate-In[in]
	 */
	private String[] ips;


	/**
	 * condition-field: CPU核数[CPU_COUNT] operate-Equal[=]
	 * 单位：0.00个
	 */
	private Integer cpuCount;


	/**
	 * condition-field: CPU核数[CPU_COUNT] operate-In[in]
	 * 单位：0.00个
	 */
	private Integer[] cpuCounts;


	/**
	 * condition-field: CPU核数[CPU_COUNT] operate-GTEqual[>=]
	 * 单位：0.00个
	 */
	private Integer startCpuCount;

	/**
	 * condition-field: CPU核数[CPU_COUNT] operate-LTEqual[<=]
	 * 单位：0.00个
	 */
	private Integer endCpuCount;


	/**
	 * condition-field: CPU可用于集群的核数[CPU_OFFER] operate-Equal[=]
	 */
	private Integer cpuOffer;


	/**
	 * condition-field: CPU可用于集群的核数[CPU_OFFER] operate-In[in]
	 */
	private Integer[] cpuOffers;


	/**
	 * condition-field: CPU可用于集群的核数[CPU_OFFER] operate-GTEqual[>=]
	 */
	private Integer startCpuOffer;

	/**
	 * condition-field: CPU可用于集群的核数[CPU_OFFER] operate-LTEqual[<=]
	 */
	private Integer endCpuOffer;


	/**
	 * condition-field: CPU主频[CPU_FREQUENCY] operate-Equal[=]
	 * 单位：Hz
	 */
	private Long cpuFrequency;


	/**
	 * condition-field: CPU主频[CPU_FREQUENCY] operate-In[in]
	 * 单位：Hz
	 */
	private Long[] cpuFrequencys;


	/**
	 * condition-field: CPU主频[CPU_FREQUENCY] operate-GTEqual[>=]
	 * 单位：Hz
	 */
	private Long startCpuFrequency;

	/**
	 * condition-field: CPU主频[CPU_FREQUENCY] operate-LTEqual[<=]
	 * 单位：Hz
	 */
	private Long endCpuFrequency;


	/**
	 * condition-field: CPU型号[CPU_MODEL] operate-Like[like]
	 */
	private String cpuModel;


	/**
	 * condition-field: 内存大小[MEM_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long memSize;


	/**
	 * condition-field: 内存大小[MEM_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] memSizes;


	/**
	 * condition-field: 内存大小[MEM_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startMemSize;

	/**
	 * condition-field: 内存大小[MEM_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endMemSize;


	/**
	 * condition-field: 可用于集群的内存[MEM_OFFER] operate-Equal[=]
	 */
	private Long memOffer;


	/**
	 * condition-field: 可用于集群的内存[MEM_OFFER] operate-In[in]
	 */
	private Long[] memOffers;


	/**
	 * condition-field: 可用于集群的内存[MEM_OFFER] operate-GTEqual[>=]
	 */
	private Long startMemOffer;

	/**
	 * condition-field: 可用于集群的内存[MEM_OFFER] operate-LTEqual[<=]
	 */
	private Long endMemOffer;


	/**
	 * condition-field: 内存类型[MEM_TYPE] operate-Like[like]
	 */
	private String memType;


	/**
	 * condition-field: 硬盘大小[DISK_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long diskSize;


	/**
	 * condition-field: 硬盘大小[DISK_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] diskSizes;


	/**
	 * condition-field: 硬盘大小[DISK_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startDiskSize;

	/**
	 * condition-field: 硬盘大小[DISK_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endDiskSize;


	/**
	 * condition-field: 存储类型[DISK_TYPE] operate-Like[like]
	 */
	private String diskType;


	/**
	 * condition-field: 带宽[BAND_WIDTH] operate-Equal[=]
	 * 单位：K
	 */
	private Long bandWidth;


	/**
	 * condition-field: 带宽[BAND_WIDTH] operate-In[in]
	 * 单位：K
	 */
	private Long[] bandWidths;


	/**
	 * condition-field: 带宽[BAND_WIDTH] operate-GTEqual[>=]
	 * 单位：K
	 */
	private Long startBandWidth;

	/**
	 * condition-field: 带宽[BAND_WIDTH] operate-LTEqual[<=]
	 * 单位：K
	 */
	private Long endBandWidth;


	/**
	 * condition-field: 操作系统[OS_NAME] operate-Like[like]
	 */
	private String osName;


	/**
	 * condition-field: 登录账号[LOGIN_NAME] operate-Like[like]
	 */
	private String loginName;


	/**
	 * condition-field: 登录账号[LOGIN_NAME] operate-Equal[=]
	 */
	private String loginNameEqual;


	/**
	 * condition-field: 登录账号[LOGIN_NAME] operate-In[in]
	 */
	private String[] loginNames;


	/**
	 * condition-field: 登录密码[LOGIN_PWD] operate-Like[like]
	 */
	private String loginPwd;


	/**
	 * condition-field: 登录密码[LOGIN_PWD] operate-Equal[=]
	 */
	private String loginPwdEqual;


	/**
	 * condition-field: 登录密码[LOGIN_PWD] operate-In[in]
	 */
	private String[] loginPwds;


	/**
	 * condition-field: 交换机[EX_SWITCH] operate-Like[like]
	 */
	private String exSwitch;


	/**
	 * condition-field: 子网[SUB_NET] operate-Like[like]
	 */
	private String subNet;


	/**
	 * condition-field: 机型[MODEM] operate-Like[like]
	 */
	private String modem;


	/**
	 * condition-field: 物理机[PHYSICAL_COMPUTER] operate-Like[like]
	 */
	private String physicalComputer;


	/**
	 * condition-field: 描述[REMARK] operate-Like[like]
	 */
	private String remark;


	/**
	 * condition-field: 状态[STATUS] operate-Equal[=]
	 * 0=无效 1=有效
	 */
	private Integer status;


	/**
	 * condition-field: 状态[STATUS] operate-In[in]
	 * 0=无效 1=有效
	 */
	private Integer[] statuss;


	/**
	 * condition-field: 状态[STATUS] operate-GTEqual[>=]
	 * 0=无效 1=有效
	 */
	private Integer startStatus;

	/**
	 * condition-field: 状态[STATUS] operate-LTEqual[<=]
	 * 0=无效 1=有效
	 */
	private Integer endStatus;


	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-Equal[=]
	 */
	private Long custom1;


	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-In[in]
	 */
	private Long[] custom1s;


	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-GTEqual[>=]
	 */
	private Long startCustom1;

	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-LTEqual[<=]
	 */
	private Long endCustom1;


	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-Equal[=]
	 */
	private Long custom2;


	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-In[in]
	 */
	private Long[] custom2s;


	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-GTEqual[>=]
	 */
	private Long startCustom2;

	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-LTEqual[<=]
	 */
	private Long endCustom2;


	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-Equal[=]
	 */
	private Long custom3;


	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-In[in]
	 */
	private Long[] custom3s;


	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-GTEqual[>=]
	 */
	private Long startCustom3;

	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-LTEqual[<=]
	 */
	private Long endCustom3;


	/**
	 * condition-field: 备用字段_4[CUSTOM_4] operate-Like[like]
	 */
	private String custom4;


	/**
	 * condition-field: 备用字段_5[CUSTOM_5] operate-Like[like]
	 */
	private String custom5;


	/**
	 * condition-field: 备用字段_6[CUSTOM_6] operate-Like[like]
	 */
	private String custom6;


	/**
	 * condition-field: 使用状态[USE_STATUS] operate-Equal[=]
	 */
	private Integer useStatus;


	/**
	 * condition-field: 使用状态[USE_STATUS] operate-In[in]
	 */
	private Integer[] useStatuss;


	/**
	 * condition-field: 使用状态[USE_STATUS] operate-GTEqual[>=]
	 */
	private Integer startUseStatus;

	/**
	 * condition-field: 使用状态[USE_STATUS] operate-LTEqual[<=]
	 */
	private Integer endUseStatus;


	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-Equal[=]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer dataStatus;


	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-In[in]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer[] dataStatuss;


	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-GTEqual[>=]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer startDataStatus;

	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-LTEqual[<=]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer endDataStatus;


	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-Equal[=]
	 * yyyyMMddHHmmss
	 */
	private Long createTime;


	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-In[in]
	 * yyyyMMddHHmmss
	 */
	private Long[] createTimes;


	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-GTEqual[>=]
	 * yyyyMMddHHmmss
	 */
	private Long startCreateTime;

	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-LTEqual[<=]
	 * yyyyMMddHHmmss
	 */
	private Long endCreateTime;


	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-Equal[=]
	 * yyyyMMddHHmmss
	 */
	private Long modifyTime;


	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-In[in]
	 * yyyyMMddHHmmss
	 */
	private Long[] modifyTimes;


	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-GTEqual[>=]
	 * yyyyMMddHHmmss
	 */
	private Long startModifyTime;

	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-LTEqual[<=]
	 * yyyyMMddHHmmss
	 */
	private Long endModifyTime;




	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public Long[] getIds() {
		return this.ids;
	}
	public void setIds(Long[] ids) {
		this.ids = ids;
	}


	public Long getStartId() {
		return this.startId;
	}
	public void setStartId(Long startId) {
		this.startId = startId;
	}


	public Long getEndId() {
		return this.endId;
	}
	public void setEndId(Long endId) {
		this.endId = endId;
	}


	public String getCode() {
		return this.code;
	}
	public void setCode(String code) {
		this.code = code;
	}


	public String getCodeEqual() {
		return this.codeEqual;
	}
	public void setCodeEqual(String codeEqual) {
		this.codeEqual = codeEqual;
	}


	public String[] getCodes() {
		return this.codes;
	}
	public void setCodes(String[] codes) {
		this.codes = codes;
	}


	public Long getRoomId() {
		return this.roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}


	public Long[] getRoomIds() {
		return this.roomIds;
	}
	public void setRoomIds(Long[] roomIds) {
		this.roomIds = roomIds;
	}


	public Long getStartRoomId() {
		return this.startRoomId;
	}
	public void setStartRoomId(Long startRoomId) {
		this.startRoomId = startRoomId;
	}


	public Long getEndRoomId() {
		return this.endRoomId;
	}
	public void setEndRoomId(Long endRoomId) {
		this.endRoomId = endRoomId;
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


	public Long[] getDataCenterIds() {
		return this.dataCenterIds;
	}
	public void setDataCenterIds(Long[] dataCenterIds) {
		this.dataCenterIds = dataCenterIds;
	}


	public Long getStartDataCenterId() {
		return this.startDataCenterId;
	}
	public void setStartDataCenterId(Long startDataCenterId) {
		this.startDataCenterId = startDataCenterId;
	}


	public Long getEndDataCenterId() {
		return this.endDataCenterId;
	}
	public void setEndDataCenterId(Long endDataCenterId) {
		this.endDataCenterId = endDataCenterId;
	}


	public Long getResCenterId() {
		return this.resCenterId;
	}
	public void setResCenterId(Long resCenterId) {
		this.resCenterId = resCenterId;
	}


	public Long[] getResCenterIds() {
		return this.resCenterIds;
	}
	public void setResCenterIds(Long[] resCenterIds) {
		this.resCenterIds = resCenterIds;
	}


	public Long getStartResCenterId() {
		return this.startResCenterId;
	}
	public void setStartResCenterId(Long startResCenterId) {
		this.startResCenterId = startResCenterId;
	}


	public Long getEndResCenterId() {
		return this.endResCenterId;
	}
	public void setEndResCenterId(Long endResCenterId) {
		this.endResCenterId = endResCenterId;
	}


	public Long getNetZoneId() {
		return this.netZoneId;
	}
	public void setNetZoneId(Long netZoneId) {
		this.netZoneId = netZoneId;
	}


	public Long[] getNetZoneIds() {
		return this.netZoneIds;
	}
	public void setNetZoneIds(Long[] netZoneIds) {
		this.netZoneIds = netZoneIds;
	}


	public Long getStartNetZoneId() {
		return this.startNetZoneId;
	}
	public void setStartNetZoneId(Long startNetZoneId) {
		this.startNetZoneId = startNetZoneId;
	}


	public Long getEndNetZoneId() {
		return this.endNetZoneId;
	}
	public void setEndNetZoneId(Long endNetZoneId) {
		this.endNetZoneId = endNetZoneId;
	}


	public String getIp() {
		return this.ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}


	public String getIpEqual() {
		return this.ipEqual;
	}
	public void setIpEqual(String ipEqual) {
		this.ipEqual = ipEqual;
	}


	public String[] getIps() {
		return this.ips;
	}
	public void setIps(String[] ips) {
		this.ips = ips;
	}


	public Integer getCpuCount() {
		return this.cpuCount;
	}
	public void setCpuCount(Integer cpuCount) {
		this.cpuCount = cpuCount;
	}


	public Integer[] getCpuCounts() {
		return this.cpuCounts;
	}
	public void setCpuCounts(Integer[] cpuCounts) {
		this.cpuCounts = cpuCounts;
	}


	public Integer getStartCpuCount() {
		return this.startCpuCount;
	}
	public void setStartCpuCount(Integer startCpuCount) {
		this.startCpuCount = startCpuCount;
	}


	public Integer getEndCpuCount() {
		return this.endCpuCount;
	}
	public void setEndCpuCount(Integer endCpuCount) {
		this.endCpuCount = endCpuCount;
	}


	public Integer getCpuOffer() {
		return this.cpuOffer;
	}
	public void setCpuOffer(Integer cpuOffer) {
		this.cpuOffer = cpuOffer;
	}


	public Integer[] getCpuOffers() {
		return this.cpuOffers;
	}
	public void setCpuOffers(Integer[] cpuOffers) {
		this.cpuOffers = cpuOffers;
	}


	public Integer getStartCpuOffer() {
		return this.startCpuOffer;
	}
	public void setStartCpuOffer(Integer startCpuOffer) {
		this.startCpuOffer = startCpuOffer;
	}


	public Integer getEndCpuOffer() {
		return this.endCpuOffer;
	}
	public void setEndCpuOffer(Integer endCpuOffer) {
		this.endCpuOffer = endCpuOffer;
	}


	public Long getCpuFrequency() {
		return this.cpuFrequency;
	}
	public void setCpuFrequency(Long cpuFrequency) {
		this.cpuFrequency = cpuFrequency;
	}


	public Long[] getCpuFrequencys() {
		return this.cpuFrequencys;
	}
	public void setCpuFrequencys(Long[] cpuFrequencys) {
		this.cpuFrequencys = cpuFrequencys;
	}


	public Long getStartCpuFrequency() {
		return this.startCpuFrequency;
	}
	public void setStartCpuFrequency(Long startCpuFrequency) {
		this.startCpuFrequency = startCpuFrequency;
	}


	public Long getEndCpuFrequency() {
		return this.endCpuFrequency;
	}
	public void setEndCpuFrequency(Long endCpuFrequency) {
		this.endCpuFrequency = endCpuFrequency;
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


	public Long[] getMemSizes() {
		return this.memSizes;
	}
	public void setMemSizes(Long[] memSizes) {
		this.memSizes = memSizes;
	}


	public Long getStartMemSize() {
		return this.startMemSize;
	}
	public void setStartMemSize(Long startMemSize) {
		this.startMemSize = startMemSize;
	}


	public Long getEndMemSize() {
		return this.endMemSize;
	}
	public void setEndMemSize(Long endMemSize) {
		this.endMemSize = endMemSize;
	}


	public Long getMemOffer() {
		return this.memOffer;
	}
	public void setMemOffer(Long memOffer) {
		this.memOffer = memOffer;
	}


	public Long[] getMemOffers() {
		return this.memOffers;
	}
	public void setMemOffers(Long[] memOffers) {
		this.memOffers = memOffers;
	}


	public Long getStartMemOffer() {
		return this.startMemOffer;
	}
	public void setStartMemOffer(Long startMemOffer) {
		this.startMemOffer = startMemOffer;
	}


	public Long getEndMemOffer() {
		return this.endMemOffer;
	}
	public void setEndMemOffer(Long endMemOffer) {
		this.endMemOffer = endMemOffer;
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


	public Long[] getDiskSizes() {
		return this.diskSizes;
	}
	public void setDiskSizes(Long[] diskSizes) {
		this.diskSizes = diskSizes;
	}


	public Long getStartDiskSize() {
		return this.startDiskSize;
	}
	public void setStartDiskSize(Long startDiskSize) {
		this.startDiskSize = startDiskSize;
	}


	public Long getEndDiskSize() {
		return this.endDiskSize;
	}
	public void setEndDiskSize(Long endDiskSize) {
		this.endDiskSize = endDiskSize;
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


	public Long[] getBandWidths() {
		return this.bandWidths;
	}
	public void setBandWidths(Long[] bandWidths) {
		this.bandWidths = bandWidths;
	}


	public Long getStartBandWidth() {
		return this.startBandWidth;
	}
	public void setStartBandWidth(Long startBandWidth) {
		this.startBandWidth = startBandWidth;
	}


	public Long getEndBandWidth() {
		return this.endBandWidth;
	}
	public void setEndBandWidth(Long endBandWidth) {
		this.endBandWidth = endBandWidth;
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


	public String getLoginNameEqual() {
		return this.loginNameEqual;
	}
	public void setLoginNameEqual(String loginNameEqual) {
		this.loginNameEqual = loginNameEqual;
	}


	public String[] getLoginNames() {
		return this.loginNames;
	}
	public void setLoginNames(String[] loginNames) {
		this.loginNames = loginNames;
	}


	public String getLoginPwd() {
		return this.loginPwd;
	}
	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}


	public String getLoginPwdEqual() {
		return this.loginPwdEqual;
	}
	public void setLoginPwdEqual(String loginPwdEqual) {
		this.loginPwdEqual = loginPwdEqual;
	}


	public String[] getLoginPwds() {
		return this.loginPwds;
	}
	public void setLoginPwds(String[] loginPwds) {
		this.loginPwds = loginPwds;
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


	public Integer[] getStatuss() {
		return this.statuss;
	}
	public void setStatuss(Integer[] statuss) {
		this.statuss = statuss;
	}


	public Integer getStartStatus() {
		return this.startStatus;
	}
	public void setStartStatus(Integer startStatus) {
		this.startStatus = startStatus;
	}


	public Integer getEndStatus() {
		return this.endStatus;
	}
	public void setEndStatus(Integer endStatus) {
		this.endStatus = endStatus;
	}


	public Long getCustom1() {
		return this.custom1;
	}
	public void setCustom1(Long custom1) {
		this.custom1 = custom1;
	}


	public Long[] getCustom1s() {
		return this.custom1s;
	}
	public void setCustom1s(Long[] custom1s) {
		this.custom1s = custom1s;
	}


	public Long getStartCustom1() {
		return this.startCustom1;
	}
	public void setStartCustom1(Long startCustom1) {
		this.startCustom1 = startCustom1;
	}


	public Long getEndCustom1() {
		return this.endCustom1;
	}
	public void setEndCustom1(Long endCustom1) {
		this.endCustom1 = endCustom1;
	}


	public Long getCustom2() {
		return this.custom2;
	}
	public void setCustom2(Long custom2) {
		this.custom2 = custom2;
	}


	public Long[] getCustom2s() {
		return this.custom2s;
	}
	public void setCustom2s(Long[] custom2s) {
		this.custom2s = custom2s;
	}


	public Long getStartCustom2() {
		return this.startCustom2;
	}
	public void setStartCustom2(Long startCustom2) {
		this.startCustom2 = startCustom2;
	}


	public Long getEndCustom2() {
		return this.endCustom2;
	}
	public void setEndCustom2(Long endCustom2) {
		this.endCustom2 = endCustom2;
	}


	public Long getCustom3() {
		return this.custom3;
	}
	public void setCustom3(Long custom3) {
		this.custom3 = custom3;
	}


	public Long[] getCustom3s() {
		return this.custom3s;
	}
	public void setCustom3s(Long[] custom3s) {
		this.custom3s = custom3s;
	}


	public Long getStartCustom3() {
		return this.startCustom3;
	}
	public void setStartCustom3(Long startCustom3) {
		this.startCustom3 = startCustom3;
	}


	public Long getEndCustom3() {
		return this.endCustom3;
	}
	public void setEndCustom3(Long endCustom3) {
		this.endCustom3 = endCustom3;
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


	public Integer getUseStatus() {
		return this.useStatus;
	}
	public void setUseStatus(Integer useStatus) {
		this.useStatus = useStatus;
	}


	public Integer[] getUseStatuss() {
		return this.useStatuss;
	}
	public void setUseStatuss(Integer[] useStatuss) {
		this.useStatuss = useStatuss;
	}


	public Integer getStartUseStatus() {
		return this.startUseStatus;
	}
	public void setStartUseStatus(Integer startUseStatus) {
		this.startUseStatus = startUseStatus;
	}


	public Integer getEndUseStatus() {
		return this.endUseStatus;
	}
	public void setEndUseStatus(Integer endUseStatus) {
		this.endUseStatus = endUseStatus;
	}


	public Integer getDataStatus() {
		return this.dataStatus;
	}
	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}


	public Integer[] getDataStatuss() {
		return this.dataStatuss;
	}
	public void setDataStatuss(Integer[] dataStatuss) {
		this.dataStatuss = dataStatuss;
	}


	public Integer getStartDataStatus() {
		return this.startDataStatus;
	}
	public void setStartDataStatus(Integer startDataStatus) {
		this.startDataStatus = startDataStatus;
	}


	public Integer getEndDataStatus() {
		return this.endDataStatus;
	}
	public void setEndDataStatus(Integer endDataStatus) {
		this.endDataStatus = endDataStatus;
	}


	public Long getCreateTime() {
		return this.createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}


	public Long[] getCreateTimes() {
		return this.createTimes;
	}
	public void setCreateTimes(Long[] createTimes) {
		this.createTimes = createTimes;
	}


	public Long getStartCreateTime() {
		return this.startCreateTime;
	}
	public void setStartCreateTime(Long startCreateTime) {
		this.startCreateTime = startCreateTime;
	}


	public Long getEndCreateTime() {
		return this.endCreateTime;
	}
	public void setEndCreateTime(Long endCreateTime) {
		this.endCreateTime = endCreateTime;
	}


	public Long getModifyTime() {
		return this.modifyTime;
	}
	public void setModifyTime(Long modifyTime) {
		this.modifyTime = modifyTime;
	}


	public Long[] getModifyTimes() {
		return this.modifyTimes;
	}
	public void setModifyTimes(Long[] modifyTimes) {
		this.modifyTimes = modifyTimes;
	}


	public Long getStartModifyTime() {
		return this.startModifyTime;
	}
	public void setStartModifyTime(Long startModifyTime) {
		this.startModifyTime = startModifyTime;
	}


	public Long getEndModifyTime() {
		return this.endModifyTime;
	}
	public void setEndModifyTime(Long endModifyTime) {
		this.endModifyTime = endModifyTime;
	}


}


