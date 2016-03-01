package com.aic.paas.console.res.bean;




import com.binary.framework.bean.Condition;


/**
 * condition-table: 租户资源申请表[PS_MNT_RES_APPLY]
 */
public class CPsMntResApply implements Condition {
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
	 * condition-field: 申请单号[CODE] operate-Equal[=]
	 */
	private Long code;


	/**
	 * condition-field: 申请单号[CODE] operate-In[in]
	 */
	private Long[] codes;


	/**
	 * condition-field: 申请单号[CODE] operate-GTEqual[>=]
	 */
	private Long startCode;

	/**
	 * condition-field: 申请单号[CODE] operate-LTEqual[<=]
	 */
	private Long endCode;


	/**
	 * condition-field: 所属租户[MNT_ID] operate-Equal[=]
	 */
	private Long mntId;


	/**
	 * condition-field: 所属租户[MNT_ID] operate-In[in]
	 */
	private Long[] mntIds;


	/**
	 * condition-field: 所属租户[MNT_ID] operate-GTEqual[>=]
	 */
	private Long startMntId;

	/**
	 * condition-field: 所属租户[MNT_ID] operate-LTEqual[<=]
	 */
	private Long endMntId;


	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-Equal[=]
	 */
	private Long dataCenterId;


	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-In[in]
	 */
	private Long[] dataCenterIds;


	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-GTEqual[>=]
	 */
	private Long startDataCenterId;

	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-LTEqual[<=]
	 */
	private Long endDataCenterId;


	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-Equal[=]
	 */
	private Long resCenterId;


	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-In[in]
	 */
	private Long[] resCenterIds;


	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-GTEqual[>=]
	 */
	private Long startResCenterId;

	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-LTEqual[<=]
	 */
	private Long endResCenterId;


	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-Equal[=]
	 */
	private Long netZoneId;


	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-In[in]
	 */
	private Long[] netZoneIds;


	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-GTEqual[>=]
	 */
	private Long startNetZoneId;

	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-LTEqual[<=]
	 */
	private Long endNetZoneId;


	/**
	 * condition-field: CPU个数[CPU_COUNT] operate-Equal[=]
	 * 单位：0.00个
	 */
	private Long cpuCount;


	/**
	 * condition-field: CPU个数[CPU_COUNT] operate-In[in]
	 * 单位：0.00个
	 */
	private Long[] cpuCounts;


	/**
	 * condition-field: CPU个数[CPU_COUNT] operate-GTEqual[>=]
	 * 单位：0.00个
	 */
	private Long startCpuCount;

	/**
	 * condition-field: CPU个数[CPU_COUNT] operate-LTEqual[<=]
	 * 单位：0.00个
	 */
	private Long endCpuCount;


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
	 * condition-field: 存储大小[DISK_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long diskSize;


	/**
	 * condition-field: 存储大小[DISK_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] diskSizes;


	/**
	 * condition-field: 存储大小[DISK_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startDiskSize;

	/**
	 * condition-field: 存储大小[DISK_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endDiskSize;


	/**
	 * condition-field: 备注[REMARK] operate-Like[like]
	 */
	private String remark;


	/**
	 * condition-field: 状态[STATUS] operate-Equal[=]
	 * 0=待审批 1=审批通过 2=审批退回 9=撤销
	 */
	private Integer status;


	/**
	 * condition-field: 状态[STATUS] operate-In[in]
	 * 0=待审批 1=审批通过 2=审批退回 9=撤销
	 */
	private Integer[] statuss;


	/**
	 * condition-field: 状态[STATUS] operate-GTEqual[>=]
	 * 0=待审批 1=审批通过 2=审批退回 9=撤销
	 */
	private Integer startStatus;

	/**
	 * condition-field: 状态[STATUS] operate-LTEqual[<=]
	 * 0=待审批 1=审批通过 2=审批退回 9=撤销
	 */
	private Integer endStatus;


	/**
	 * condition-field: 申请时间[APPLY_TIME] operate-Equal[=]
	 */
	private Long applyTime;


	/**
	 * condition-field: 申请时间[APPLY_TIME] operate-In[in]
	 */
	private Long[] applyTimes;


	/**
	 * condition-field: 申请时间[APPLY_TIME] operate-GTEqual[>=]
	 */
	private Long startApplyTime;

	/**
	 * condition-field: 申请时间[APPLY_TIME] operate-LTEqual[<=]
	 */
	private Long endApplyTime;


	/**
	 * condition-field: 申请人ID[APPLIOR_ID] operate-Equal[=]
	 */
	private Long appliorId;


	/**
	 * condition-field: 申请人ID[APPLIOR_ID] operate-In[in]
	 */
	private Long[] appliorIds;


	/**
	 * condition-field: 申请人ID[APPLIOR_ID] operate-GTEqual[>=]
	 */
	private Long startAppliorId;

	/**
	 * condition-field: 申请人ID[APPLIOR_ID] operate-LTEqual[<=]
	 */
	private Long endAppliorId;


	/**
	 * condition-field: 申请人姓名[APPLIOR_NAME] operate-Like[like]
	 */
	private String appliorName;


	/**
	 * condition-field: 申请人姓名[APPLIOR_NAME] operate-Equal[=]
	 */
	private String appliorNameEqual;


	/**
	 * condition-field: 申请人姓名[APPLIOR_NAME] operate-In[in]
	 */
	private String[] appliorNames;


	/**
	 * condition-field: 审批时间[CHECK_TIME] operate-Equal[=]
	 */
	private Long checkTime;


	/**
	 * condition-field: 审批时间[CHECK_TIME] operate-In[in]
	 */
	private Long[] checkTimes;


	/**
	 * condition-field: 审批时间[CHECK_TIME] operate-GTEqual[>=]
	 */
	private Long startCheckTime;

	/**
	 * condition-field: 审批时间[CHECK_TIME] operate-LTEqual[<=]
	 */
	private Long endCheckTime;


	/**
	 * condition-field: 审批意见[CHECK_DESC] operate-Like[like]
	 */
	private String checkDesc;


	/**
	 * condition-field: 审批人姓名[CHECKER_NAME] operate-Like[like]
	 */
	private String checkerName;


	/**
	 * condition-field: 审批人姓名[CHECKER_NAME] operate-Equal[=]
	 */
	private String checkerNameEqual;


	/**
	 * condition-field: 审批人姓名[CHECKER_NAME] operate-In[in]
	 */
	private String[] checkerNames;


	/**
	 * condition-field: 审批人ID[CHECKER_ID] operate-Equal[=]
	 */
	private Long checkerId;


	/**
	 * condition-field: 审批人ID[CHECKER_ID] operate-In[in]
	 */
	private Long[] checkerIds;


	/**
	 * condition-field: 审批人ID[CHECKER_ID] operate-GTEqual[>=]
	 */
	private Long startCheckerId;

	/**
	 * condition-field: 审批人ID[CHECKER_ID] operate-LTEqual[<=]
	 */
	private Long endCheckerId;


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


	public Long getCode() {
		return this.code;
	}
	public void setCode(Long code) {
		this.code = code;
	}


	public Long[] getCodes() {
		return this.codes;
	}
	public void setCodes(Long[] codes) {
		this.codes = codes;
	}


	public Long getStartCode() {
		return this.startCode;
	}
	public void setStartCode(Long startCode) {
		this.startCode = startCode;
	}


	public Long getEndCode() {
		return this.endCode;
	}
	public void setEndCode(Long endCode) {
		this.endCode = endCode;
	}


	public Long getMntId() {
		return this.mntId;
	}
	public void setMntId(Long mntId) {
		this.mntId = mntId;
	}


	public Long[] getMntIds() {
		return this.mntIds;
	}
	public void setMntIds(Long[] mntIds) {
		this.mntIds = mntIds;
	}


	public Long getStartMntId() {
		return this.startMntId;
	}
	public void setStartMntId(Long startMntId) {
		this.startMntId = startMntId;
	}


	public Long getEndMntId() {
		return this.endMntId;
	}
	public void setEndMntId(Long endMntId) {
		this.endMntId = endMntId;
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


	public Long getCpuCount() {
		return this.cpuCount;
	}
	public void setCpuCount(Long cpuCount) {
		this.cpuCount = cpuCount;
	}


	public Long[] getCpuCounts() {
		return this.cpuCounts;
	}
	public void setCpuCounts(Long[] cpuCounts) {
		this.cpuCounts = cpuCounts;
	}


	public Long getStartCpuCount() {
		return this.startCpuCount;
	}
	public void setStartCpuCount(Long startCpuCount) {
		this.startCpuCount = startCpuCount;
	}


	public Long getEndCpuCount() {
		return this.endCpuCount;
	}
	public void setEndCpuCount(Long endCpuCount) {
		this.endCpuCount = endCpuCount;
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


	public Long getApplyTime() {
		return this.applyTime;
	}
	public void setApplyTime(Long applyTime) {
		this.applyTime = applyTime;
	}


	public Long[] getApplyTimes() {
		return this.applyTimes;
	}
	public void setApplyTimes(Long[] applyTimes) {
		this.applyTimes = applyTimes;
	}


	public Long getStartApplyTime() {
		return this.startApplyTime;
	}
	public void setStartApplyTime(Long startApplyTime) {
		this.startApplyTime = startApplyTime;
	}


	public Long getEndApplyTime() {
		return this.endApplyTime;
	}
	public void setEndApplyTime(Long endApplyTime) {
		this.endApplyTime = endApplyTime;
	}


	public Long getAppliorId() {
		return this.appliorId;
	}
	public void setAppliorId(Long appliorId) {
		this.appliorId = appliorId;
	}


	public Long[] getAppliorIds() {
		return this.appliorIds;
	}
	public void setAppliorIds(Long[] appliorIds) {
		this.appliorIds = appliorIds;
	}


	public Long getStartAppliorId() {
		return this.startAppliorId;
	}
	public void setStartAppliorId(Long startAppliorId) {
		this.startAppliorId = startAppliorId;
	}


	public Long getEndAppliorId() {
		return this.endAppliorId;
	}
	public void setEndAppliorId(Long endAppliorId) {
		this.endAppliorId = endAppliorId;
	}


	public String getAppliorName() {
		return this.appliorName;
	}
	public void setAppliorName(String appliorName) {
		this.appliorName = appliorName;
	}


	public String getAppliorNameEqual() {
		return this.appliorNameEqual;
	}
	public void setAppliorNameEqual(String appliorNameEqual) {
		this.appliorNameEqual = appliorNameEqual;
	}


	public String[] getAppliorNames() {
		return this.appliorNames;
	}
	public void setAppliorNames(String[] appliorNames) {
		this.appliorNames = appliorNames;
	}


	public Long getCheckTime() {
		return this.checkTime;
	}
	public void setCheckTime(Long checkTime) {
		this.checkTime = checkTime;
	}


	public Long[] getCheckTimes() {
		return this.checkTimes;
	}
	public void setCheckTimes(Long[] checkTimes) {
		this.checkTimes = checkTimes;
	}


	public Long getStartCheckTime() {
		return this.startCheckTime;
	}
	public void setStartCheckTime(Long startCheckTime) {
		this.startCheckTime = startCheckTime;
	}


	public Long getEndCheckTime() {
		return this.endCheckTime;
	}
	public void setEndCheckTime(Long endCheckTime) {
		this.endCheckTime = endCheckTime;
	}


	public String getCheckDesc() {
		return this.checkDesc;
	}
	public void setCheckDesc(String checkDesc) {
		this.checkDesc = checkDesc;
	}


	public String getCheckerName() {
		return this.checkerName;
	}
	public void setCheckerName(String checkerName) {
		this.checkerName = checkerName;
	}


	public String getCheckerNameEqual() {
		return this.checkerNameEqual;
	}
	public void setCheckerNameEqual(String checkerNameEqual) {
		this.checkerNameEqual = checkerNameEqual;
	}


	public String[] getCheckerNames() {
		return this.checkerNames;
	}
	public void setCheckerNames(String[] checkerNames) {
		this.checkerNames = checkerNames;
	}


	public Long getCheckerId() {
		return this.checkerId;
	}
	public void setCheckerId(Long checkerId) {
		this.checkerId = checkerId;
	}


	public Long[] getCheckerIds() {
		return this.checkerIds;
	}
	public void setCheckerIds(Long[] checkerIds) {
		this.checkerIds = checkerIds;
	}


	public Long getStartCheckerId() {
		return this.startCheckerId;
	}
	public void setStartCheckerId(Long startCheckerId) {
		this.startCheckerId = startCheckerId;
	}


	public Long getEndCheckerId() {
		return this.endCheckerId;
	}
	public void setEndCheckerId(Long endCheckerId) {
		this.endCheckerId = endCheckerId;
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


