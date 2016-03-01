package com.aic.paas.console.res.bean;




import com.binary.framework.bean.EntityBean;


/**
 * mapping-table: 资源流水表[PS_RES_FLOW]
 */
public class PsResFlow implements EntityBean {
	private static final long serialVersionUID = 1L;


	/**
	 * mapping-field: ID[ID]
	 */
	private Long id;


	/**
	 * mapping-field: 所属资源中心资源[RES_ID]
	 */
	private Long resId;


	/**
	 * mapping-field: 更新时间[UP_TIME]
	 */
	private Long upTime;


	/**
	 * mapping-field: 更新类型[UP_TYPE]
	 * 1=增加 2=扣减
	 */
	private Integer upType;


	/**
	 * mapping-field: 更新前CPU个数[BEFORE_CPU_COUNT]
	 * 单位：个
	 */
	private Long beforeCpuCount;


	/**
	 * mapping-field: 更新前内存大小[BEFORE_MEM_SIZE]
	 * 单位：M
	 */
	private Long beforeMemSize;


	/**
	 * mapping-field: 更新前存储大小[BEFORE_DISK_SIZE]
	 * 单位：M
	 */
	private Long beforeDiskSize;


	/**
	 * mapping-field: 更新后CPU个数[AFTER_CPU_COUNT]
	 * 单位：个
	 */
	private Long afterCpuCount;


	/**
	 * mapping-field: 更新后内存大小[AFTER_MEM_SIZE]
	 * 单位：M
	 */
	private Long afterMemSize;


	/**
	 * mapping-field: 更新后存储大小[AFTER_DISK_SIZE]
	 * 单位：M
	 */
	private Long afterDiskSize;


	/**
	 * mapping-field: 更新人员[UPOR]
	 */
	private String upor;


	/**
	 * mapping-field: 更新描述[UP_DESC]
	 */
	private String upDesc;


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


	public Long getResId() {
		return this.resId;
	}
	public void setResId(Long resId) {
		this.resId = resId;
	}


	public Long getUpTime() {
		return this.upTime;
	}
	public void setUpTime(Long upTime) {
		this.upTime = upTime;
	}


	public Integer getUpType() {
		return this.upType;
	}
	public void setUpType(Integer upType) {
		this.upType = upType;
	}


	public Long getBeforeCpuCount() {
		return this.beforeCpuCount;
	}
	public void setBeforeCpuCount(Long beforeCpuCount) {
		this.beforeCpuCount = beforeCpuCount;
	}


	public Long getBeforeMemSize() {
		return this.beforeMemSize;
	}
	public void setBeforeMemSize(Long beforeMemSize) {
		this.beforeMemSize = beforeMemSize;
	}


	public Long getBeforeDiskSize() {
		return this.beforeDiskSize;
	}
	public void setBeforeDiskSize(Long beforeDiskSize) {
		this.beforeDiskSize = beforeDiskSize;
	}


	public Long getAfterCpuCount() {
		return this.afterCpuCount;
	}
	public void setAfterCpuCount(Long afterCpuCount) {
		this.afterCpuCount = afterCpuCount;
	}


	public Long getAfterMemSize() {
		return this.afterMemSize;
	}
	public void setAfterMemSize(Long afterMemSize) {
		this.afterMemSize = afterMemSize;
	}


	public Long getAfterDiskSize() {
		return this.afterDiskSize;
	}
	public void setAfterDiskSize(Long afterDiskSize) {
		this.afterDiskSize = afterDiskSize;
	}


	public String getUpor() {
		return this.upor;
	}
	public void setUpor(String upor) {
		this.upor = upor;
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


