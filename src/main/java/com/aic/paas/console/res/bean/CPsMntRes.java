package com.aic.paas.console.res.bean;




import com.binary.framework.bean.Condition;


/**
 * condition-table: 租户资源表[PS_MNT_RES]
 */
public class CPsMntRes implements Condition {
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
	 * condition-field: 所属租户ID[MNT_ID] operate-Equal[=]
	 */
	private Long mntId;


	/**
	 * condition-field: 所属租户ID[MNT_ID] operate-In[in]
	 */
	private Long[] mntIds;


	/**
	 * condition-field: 所属租户ID[MNT_ID] operate-GTEqual[>=]
	 */
	private Long startMntId;

	/**
	 * condition-field: 所属租户ID[MNT_ID] operate-LTEqual[<=]
	 */
	private Long endMntId;


	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-Equal[=]
	 * 资源的所属数据中心
	 */
	private Long dataCenterId;


	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-In[in]
	 * 资源的所属数据中心
	 */
	private Long[] dataCenterIds;


	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-GTEqual[>=]
	 * 资源的所属数据中心
	 */
	private Long startDataCenterId;

	/**
	 * condition-field: 所属数据中心[DATA_CENTER_ID] operate-LTEqual[<=]
	 * 资源的所属数据中心
	 */
	private Long endDataCenterId;


	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-Equal[=]
	 * 资源的所属资源中心
	 */
	private Long resCenterId;


	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-In[in]
	 * 资源的所属资源中心
	 */
	private Long[] resCenterIds;


	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-GTEqual[>=]
	 * 资源的所属资源中心
	 */
	private Long startResCenterId;

	/**
	 * condition-field: 所属资源中心[RES_CENTER_ID] operate-LTEqual[<=]
	 * 资源的所属资源中心
	 */
	private Long endResCenterId;


	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-Equal[=]
	 * 资源的所属网络区域
	 */
	private Long netZoneId;


	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-In[in]
	 * 资源的所属网络区域
	 */
	private Long[] netZoneIds;


	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-GTEqual[>=]
	 * 资源的所属网络区域
	 */
	private Long startNetZoneId;

	/**
	 * condition-field: 所属网络区域[NET_ZONE_ID] operate-LTEqual[<=]
	 * 资源的所属网络区域
	 */
	private Long endNetZoneId;


	/**
	 * condition-field: 总CPU个数[TOTAL_CPU_COUNT] operate-Equal[=]
	 * 单位：0.00个
	 */
	private Long totalCpuCount;


	/**
	 * condition-field: 总CPU个数[TOTAL_CPU_COUNT] operate-In[in]
	 * 单位：0.00个
	 */
	private Long[] totalCpuCounts;


	/**
	 * condition-field: 总CPU个数[TOTAL_CPU_COUNT] operate-GTEqual[>=]
	 * 单位：0.00个
	 */
	private Long startTotalCpuCount;

	/**
	 * condition-field: 总CPU个数[TOTAL_CPU_COUNT] operate-LTEqual[<=]
	 * 单位：0.00个
	 */
	private Long endTotalCpuCount;


	/**
	 * condition-field: 总内存大小[TOTAL_MEM_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long totalMemSize;


	/**
	 * condition-field: 总内存大小[TOTAL_MEM_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] totalMemSizes;


	/**
	 * condition-field: 总内存大小[TOTAL_MEM_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startTotalMemSize;

	/**
	 * condition-field: 总内存大小[TOTAL_MEM_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endTotalMemSize;


	/**
	 * condition-field: 总存储大小[TOTAL_DISK_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long totalDiskSize;


	/**
	 * condition-field: 总存储大小[TOTAL_DISK_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] totalDiskSizes;


	/**
	 * condition-field: 总存储大小[TOTAL_DISK_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startTotalDiskSize;

	/**
	 * condition-field: 总存储大小[TOTAL_DISK_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endTotalDiskSize;


	/**
	 * condition-field: 剩余CPU个数[CPU_COUNT] operate-Equal[=]
	 * 单位：0.00个
	 */
	private Long cpuCount;


	/**
	 * condition-field: 剩余CPU个数[CPU_COUNT] operate-In[in]
	 * 单位：0.00个
	 */
	private Long[] cpuCounts;


	/**
	 * condition-field: 剩余CPU个数[CPU_COUNT] operate-GTEqual[>=]
	 * 单位：0.00个
	 */
	private Long startCpuCount;

	/**
	 * condition-field: 剩余CPU个数[CPU_COUNT] operate-LTEqual[<=]
	 * 单位：0.00个
	 */
	private Long endCpuCount;


	/**
	 * condition-field: 剩余内存大小[MEM_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long memSize;


	/**
	 * condition-field: 剩余内存大小[MEM_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] memSizes;


	/**
	 * condition-field: 剩余内存大小[MEM_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startMemSize;

	/**
	 * condition-field: 剩余内存大小[MEM_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endMemSize;


	/**
	 * condition-field: 剩余存储大小[DISK_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long diskSize;


	/**
	 * condition-field: 剩余存储大小[DISK_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] diskSizes;


	/**
	 * condition-field: 剩余存储大小[DISK_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startDiskSize;

	/**
	 * condition-field: 剩余存储大小[DISK_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endDiskSize;


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


	public Long getTotalCpuCount() {
		return this.totalCpuCount;
	}
	public void setTotalCpuCount(Long totalCpuCount) {
		this.totalCpuCount = totalCpuCount;
	}


	public Long[] getTotalCpuCounts() {
		return this.totalCpuCounts;
	}
	public void setTotalCpuCounts(Long[] totalCpuCounts) {
		this.totalCpuCounts = totalCpuCounts;
	}


	public Long getStartTotalCpuCount() {
		return this.startTotalCpuCount;
	}
	public void setStartTotalCpuCount(Long startTotalCpuCount) {
		this.startTotalCpuCount = startTotalCpuCount;
	}


	public Long getEndTotalCpuCount() {
		return this.endTotalCpuCount;
	}
	public void setEndTotalCpuCount(Long endTotalCpuCount) {
		this.endTotalCpuCount = endTotalCpuCount;
	}


	public Long getTotalMemSize() {
		return this.totalMemSize;
	}
	public void setTotalMemSize(Long totalMemSize) {
		this.totalMemSize = totalMemSize;
	}


	public Long[] getTotalMemSizes() {
		return this.totalMemSizes;
	}
	public void setTotalMemSizes(Long[] totalMemSizes) {
		this.totalMemSizes = totalMemSizes;
	}


	public Long getStartTotalMemSize() {
		return this.startTotalMemSize;
	}
	public void setStartTotalMemSize(Long startTotalMemSize) {
		this.startTotalMemSize = startTotalMemSize;
	}


	public Long getEndTotalMemSize() {
		return this.endTotalMemSize;
	}
	public void setEndTotalMemSize(Long endTotalMemSize) {
		this.endTotalMemSize = endTotalMemSize;
	}


	public Long getTotalDiskSize() {
		return this.totalDiskSize;
	}
	public void setTotalDiskSize(Long totalDiskSize) {
		this.totalDiskSize = totalDiskSize;
	}


	public Long[] getTotalDiskSizes() {
		return this.totalDiskSizes;
	}
	public void setTotalDiskSizes(Long[] totalDiskSizes) {
		this.totalDiskSizes = totalDiskSizes;
	}


	public Long getStartTotalDiskSize() {
		return this.startTotalDiskSize;
	}
	public void setStartTotalDiskSize(Long startTotalDiskSize) {
		this.startTotalDiskSize = startTotalDiskSize;
	}


	public Long getEndTotalDiskSize() {
		return this.endTotalDiskSize;
	}
	public void setEndTotalDiskSize(Long endTotalDiskSize) {
		this.endTotalDiskSize = endTotalDiskSize;
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


