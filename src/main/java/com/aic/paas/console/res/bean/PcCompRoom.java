package com.aic.paas.console.res.bean;




import com.binary.framework.bean.EntityBean;


/**
 * mapping-table: 服务器机房表[PC_COMP_ROOM]
 */
public class PcCompRoom implements EntityBean {
	private static final long serialVersionUID = 1L;


	/**
	 * mapping-field: ID[ID]
	 */
	private Long id;


	/**
	 * mapping-field: 机房编号[ROOM_CODE]
	 */
	private String roomCode;


	/**
	 * mapping-field: 机房名称[ROOM_NAME]
	 */
	private String roomName;


	/**
	 * mapping-field: 省份ID[PROVINCE_ID]
	 */
	private Long provinceId;


	/**
	 * mapping-field: 地市ID[CITY_ID]
	 */
	private Long cityId;


	/**
	 * mapping-field: 区县ID[COUNTY_ID]
	 */
	private Long countyId;


	/**
	 * mapping-field: 机房地址[ROOM_ADDR]
	 */
	private String roomAddr;


	/**
	 * mapping-field: 机房描述[REMARK]
	 */
	private String remark;


	/**
	 * mapping-field: 机房联系人[CONTACT_NAME]
	 */
	private String contactName;


	/**
	 * mapping-field: 机房联系电话[CONTACT_PHONE]
	 */
	private String contactPhone;


	/**
	 * mapping-field: 机房联系电话2[CONTACT_PHONE2]
	 */
	private String contactPhone2;


	/**
	 * mapping-field: 机房联系邮箱[CONTACT_EMAIL]
	 */
	private String contactEmail;


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
	 * mapping-field: 状态[STATUS]
	 * 1=有效 0=无效
	 */
	private Integer status;


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


	public String getRoomCode() {
		return this.roomCode;
	}
	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}


	public String getRoomName() {
		return this.roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}


	public Long getProvinceId() {
		return this.provinceId;
	}
	public void setProvinceId(Long provinceId) {
		this.provinceId = provinceId;
	}


	public Long getCityId() {
		return this.cityId;
	}
	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}


	public Long getCountyId() {
		return this.countyId;
	}
	public void setCountyId(Long countyId) {
		this.countyId = countyId;
	}


	public String getRoomAddr() {
		return this.roomAddr;
	}
	public void setRoomAddr(String roomAddr) {
		this.roomAddr = roomAddr;
	}


	public String getRemark() {
		return this.remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}


	public String getContactName() {
		return this.contactName;
	}
	public void setContactName(String contactName) {
		this.contactName = contactName;
	}


	public String getContactPhone() {
		return this.contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}


	public String getContactPhone2() {
		return this.contactPhone2;
	}
	public void setContactPhone2(String contactPhone2) {
		this.contactPhone2 = contactPhone2;
	}


	public String getContactEmail() {
		return this.contactEmail;
	}
	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
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


	public Integer getStatus() {
		return this.status;
	}
	public void setStatus(Integer status) {
		this.status = status;
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


