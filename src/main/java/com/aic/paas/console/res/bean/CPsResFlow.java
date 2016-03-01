package com.aic.paas.console.res.bean;




import com.binary.framework.bean.Condition;


/**
 * condition-table: 资源流水表[PS_RES_FLOW]
 */
public class CPsResFlow implements Condition {
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
	 * condition-field: 所属资源中心资源[RES_ID] operate-Equal[=]
	 */
	private Long resId;


	/**
	 * condition-field: 所属资源中心资源[RES_ID] operate-In[in]
	 */
	private Long[] resIds;


	/**
	 * condition-field: 所属资源中心资源[RES_ID] operate-GTEqual[>=]
	 */
	private Long startResId;

	/**
	 * condition-field: 所属资源中心资源[RES_ID] operate-LTEqual[<=]
	 */
	private Long endResId;


	/**
	 * condition-field: 更新时间[UP_TIME] operate-Equal[=]
	 */
	private Long upTime;


	/**
	 * condition-field: 更新时间[UP_TIME] operate-In[in]
	 */
	private Long[] upTimes;


	/**
	 * condition-field: 更新时间[UP_TIME] operate-GTEqual[>=]
	 */
	private Long startUpTime;

	/**
	 * condition-field: 更新时间[UP_TIME] operate-LTEqual[<=]
	 */
	private Long endUpTime;


	/**
	 * condition-field: 更新类型[UP_TYPE] operate-Equal[=]
	 * 1=增加 2=扣减
	 */
	private Integer upType;


	/**
	 * condition-field: 更新类型[UP_TYPE] operate-In[in]
	 * 1=增加 2=扣减
	 */
	private Integer[] upTypes;


	/**
	 * condition-field: 更新类型[UP_TYPE] operate-GTEqual[>=]
	 * 1=增加 2=扣减
	 */
	private Integer startUpType;

	/**
	 * condition-field: 更新类型[UP_TYPE] operate-LTEqual[<=]
	 * 1=增加 2=扣减
	 */
	private Integer endUpType;


	/**
	 * condition-field: 更新前CPU个数[BEFORE_CPU_COUNT] operate-Equal[=]
	 * 单位：个
	 */
	private Long beforeCpuCount;


	/**
	 * condition-field: 更新前CPU个数[BEFORE_CPU_COUNT] operate-In[in]
	 * 单位：个
	 */
	private Long[] beforeCpuCounts;


	/**
	 * condition-field: 更新前CPU个数[BEFORE_CPU_COUNT] operate-GTEqual[>=]
	 * 单位：个
	 */
	private Long startBeforeCpuCount;

	/**
	 * condition-field: 更新前CPU个数[BEFORE_CPU_COUNT] operate-LTEqual[<=]
	 * 单位：个
	 */
	private Long endBeforeCpuCount;


	/**
	 * condition-field: 更新前内存大小[BEFORE_MEM_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long beforeMemSize;


	/**
	 * condition-field: 更新前内存大小[BEFORE_MEM_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] beforeMemSizes;


	/**
	 * condition-field: 更新前内存大小[BEFORE_MEM_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startBeforeMemSize;

	/**
	 * condition-field: 更新前内存大小[BEFORE_MEM_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endBeforeMemSize;


	/**
	 * condition-field: 更新前存储大小[BEFORE_DISK_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long beforeDiskSize;


	/**
	 * condition-field: 更新前存储大小[BEFORE_DISK_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] beforeDiskSizes;


	/**
	 * condition-field: 更新前存储大小[BEFORE_DISK_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startBeforeDiskSize;

	/**
	 * condition-field: 更新前存储大小[BEFORE_DISK_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endBeforeDiskSize;


	/**
	 * condition-field: 更新后CPU个数[AFTER_CPU_COUNT] operate-Equal[=]
	 * 单位：个
	 */
	private Long afterCpuCount;


	/**
	 * condition-field: 更新后CPU个数[AFTER_CPU_COUNT] operate-In[in]
	 * 单位：个
	 */
	private Long[] afterCpuCounts;


	/**
	 * condition-field: 更新后CPU个数[AFTER_CPU_COUNT] operate-GTEqual[>=]
	 * 单位：个
	 */
	private Long startAfterCpuCount;

	/**
	 * condition-field: 更新后CPU个数[AFTER_CPU_COUNT] operate-LTEqual[<=]
	 * 单位：个
	 */
	private Long endAfterCpuCount;


	/**
	 * condition-field: 更新后内存大小[AFTER_MEM_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long afterMemSize;


	/**
	 * condition-field: 更新后内存大小[AFTER_MEM_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] afterMemSizes;


	/**
	 * condition-field: 更新后内存大小[AFTER_MEM_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startAfterMemSize;

	/**
	 * condition-field: 更新后内存大小[AFTER_MEM_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endAfterMemSize;


	/**
	 * condition-field: 更新后存储大小[AFTER_DISK_SIZE] operate-Equal[=]
	 * 单位：M
	 */
	private Long afterDiskSize;


	/**
	 * condition-field: 更新后存储大小[AFTER_DISK_SIZE] operate-In[in]
	 * 单位：M
	 */
	private Long[] afterDiskSizes;


	/**
	 * condition-field: 更新后存储大小[AFTER_DISK_SIZE] operate-GTEqual[>=]
	 * 单位：M
	 */
	private Long startAfterDiskSize;

	/**
	 * condition-field: 更新后存储大小[AFTER_DISK_SIZE] operate-LTEqual[<=]
	 * 单位：M
	 */
	private Long endAfterDiskSize;


	/**
	 * condition-field: 更新人员[UPOR] operate-Like[like]
	 */
	private String upor;


	/**
	 * condition-field: 更新人员[UPOR] operate-Equal[=]
	 */
	private String uporEqual;


	/**
	 * condition-field: 更新人员[UPOR] operate-In[in]
	 */
	private String[] upors;


	/**
	 * condition-field: 更新描述[UP_DESC] operate-Like[like]
	 */
	private String upDesc;


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


	public Long getResId() {
		return this.resId;
	}
	public void setResId(Long resId) {
		this.resId = resId;
	}


	public Long[] getResIds() {
		return this.resIds;
	}
	public void setResIds(Long[] resIds) {
		this.resIds = resIds;
	}


	public Long getStartResId() {
		return this.startResId;
	}
	public void setStartResId(Long startResId) {
		this.startResId = startResId;
	}


	public Long getEndResId() {
		return this.endResId;
	}
	public void setEndResId(Long endResId) {
		this.endResId = endResId;
	}


	public Long getUpTime() {
		return this.upTime;
	}
	public void setUpTime(Long upTime) {
		this.upTime = upTime;
	}


	public Long[] getUpTimes() {
		return this.upTimes;
	}
	public void setUpTimes(Long[] upTimes) {
		this.upTimes = upTimes;
	}


	public Long getStartUpTime() {
		return this.startUpTime;
	}
	public void setStartUpTime(Long startUpTime) {
		this.startUpTime = startUpTime;
	}


	public Long getEndUpTime() {
		return this.endUpTime;
	}
	public void setEndUpTime(Long endUpTime) {
		this.endUpTime = endUpTime;
	}


	public Integer getUpType() {
		return this.upType;
	}
	public void setUpType(Integer upType) {
		this.upType = upType;
	}


	public Integer[] getUpTypes() {
		return this.upTypes;
	}
	public void setUpTypes(Integer[] upTypes) {
		this.upTypes = upTypes;
	}


	public Integer getStartUpType() {
		return this.startUpType;
	}
	public void setStartUpType(Integer startUpType) {
		this.startUpType = startUpType;
	}


	public Integer getEndUpType() {
		return this.endUpType;
	}
	public void setEndUpType(Integer endUpType) {
		this.endUpType = endUpType;
	}


	public Long getBeforeCpuCount() {
		return this.beforeCpuCount;
	}
	public void setBeforeCpuCount(Long beforeCpuCount) {
		this.beforeCpuCount = beforeCpuCount;
	}


	public Long[] getBeforeCpuCounts() {
		return this.beforeCpuCounts;
	}
	public void setBeforeCpuCounts(Long[] beforeCpuCounts) {
		this.beforeCpuCounts = beforeCpuCounts;
	}


	public Long getStartBeforeCpuCount() {
		return this.startBeforeCpuCount;
	}
	public void setStartBeforeCpuCount(Long startBeforeCpuCount) {
		this.startBeforeCpuCount = startBeforeCpuCount;
	}


	public Long getEndBeforeCpuCount() {
		return this.endBeforeCpuCount;
	}
	public void setEndBeforeCpuCount(Long endBeforeCpuCount) {
		this.endBeforeCpuCount = endBeforeCpuCount;
	}


	public Long getBeforeMemSize() {
		return this.beforeMemSize;
	}
	public void setBeforeMemSize(Long beforeMemSize) {
		this.beforeMemSize = beforeMemSize;
	}


	public Long[] getBeforeMemSizes() {
		return this.beforeMemSizes;
	}
	public void setBeforeMemSizes(Long[] beforeMemSizes) {
		this.beforeMemSizes = beforeMemSizes;
	}


	public Long getStartBeforeMemSize() {
		return this.startBeforeMemSize;
	}
	public void setStartBeforeMemSize(Long startBeforeMemSize) {
		this.startBeforeMemSize = startBeforeMemSize;
	}


	public Long getEndBeforeMemSize() {
		return this.endBeforeMemSize;
	}
	public void setEndBeforeMemSize(Long endBeforeMemSize) {
		this.endBeforeMemSize = endBeforeMemSize;
	}


	public Long getBeforeDiskSize() {
		return this.beforeDiskSize;
	}
	public void setBeforeDiskSize(Long beforeDiskSize) {
		this.beforeDiskSize = beforeDiskSize;
	}


	public Long[] getBeforeDiskSizes() {
		return this.beforeDiskSizes;
	}
	public void setBeforeDiskSizes(Long[] beforeDiskSizes) {
		this.beforeDiskSizes = beforeDiskSizes;
	}


	public Long getStartBeforeDiskSize() {
		return this.startBeforeDiskSize;
	}
	public void setStartBeforeDiskSize(Long startBeforeDiskSize) {
		this.startBeforeDiskSize = startBeforeDiskSize;
	}


	public Long getEndBeforeDiskSize() {
		return this.endBeforeDiskSize;
	}
	public void setEndBeforeDiskSize(Long endBeforeDiskSize) {
		this.endBeforeDiskSize = endBeforeDiskSize;
	}


	public Long getAfterCpuCount() {
		return this.afterCpuCount;
	}
	public void setAfterCpuCount(Long afterCpuCount) {
		this.afterCpuCount = afterCpuCount;
	}


	public Long[] getAfterCpuCounts() {
		return this.afterCpuCounts;
	}
	public void setAfterCpuCounts(Long[] afterCpuCounts) {
		this.afterCpuCounts = afterCpuCounts;
	}


	public Long getStartAfterCpuCount() {
		return this.startAfterCpuCount;
	}
	public void setStartAfterCpuCount(Long startAfterCpuCount) {
		this.startAfterCpuCount = startAfterCpuCount;
	}


	public Long getEndAfterCpuCount() {
		return this.endAfterCpuCount;
	}
	public void setEndAfterCpuCount(Long endAfterCpuCount) {
		this.endAfterCpuCount = endAfterCpuCount;
	}


	public Long getAfterMemSize() {
		return this.afterMemSize;
	}
	public void setAfterMemSize(Long afterMemSize) {
		this.afterMemSize = afterMemSize;
	}


	public Long[] getAfterMemSizes() {
		return this.afterMemSizes;
	}
	public void setAfterMemSizes(Long[] afterMemSizes) {
		this.afterMemSizes = afterMemSizes;
	}


	public Long getStartAfterMemSize() {
		return this.startAfterMemSize;
	}
	public void setStartAfterMemSize(Long startAfterMemSize) {
		this.startAfterMemSize = startAfterMemSize;
	}


	public Long getEndAfterMemSize() {
		return this.endAfterMemSize;
	}
	public void setEndAfterMemSize(Long endAfterMemSize) {
		this.endAfterMemSize = endAfterMemSize;
	}


	public Long getAfterDiskSize() {
		return this.afterDiskSize;
	}
	public void setAfterDiskSize(Long afterDiskSize) {
		this.afterDiskSize = afterDiskSize;
	}


	public Long[] getAfterDiskSizes() {
		return this.afterDiskSizes;
	}
	public void setAfterDiskSizes(Long[] afterDiskSizes) {
		this.afterDiskSizes = afterDiskSizes;
	}


	public Long getStartAfterDiskSize() {
		return this.startAfterDiskSize;
	}
	public void setStartAfterDiskSize(Long startAfterDiskSize) {
		this.startAfterDiskSize = startAfterDiskSize;
	}


	public Long getEndAfterDiskSize() {
		return this.endAfterDiskSize;
	}
	public void setEndAfterDiskSize(Long endAfterDiskSize) {
		this.endAfterDiskSize = endAfterDiskSize;
	}


	public String getUpor() {
		return this.upor;
	}
	public void setUpor(String upor) {
		this.upor = upor;
	}


	public String getUporEqual() {
		return this.uporEqual;
	}
	public void setUporEqual(String uporEqual) {
		this.uporEqual = uporEqual;
	}


	public String[] getUpors() {
		return this.upors;
	}
	public void setUpors(String[] upors) {
		this.upors = upors;
	}


	public String getUpDesc() {
		return this.upDesc;
	}
	public void setUpDesc(String upDesc) {
		this.upDesc = upDesc;
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


