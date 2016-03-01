package com.aic.paas.console.res.bean;




import com.binary.framework.bean.Condition;


/**
 * condition-table: 服务器机房表[PC_COMP_ROOM]
 */
public class CPcCompRoom implements Condition {
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
	 * condition-field: 机房编号[ROOM_CODE] operate-Like[like]
	 */
	private String roomCode;


	/**
	 * condition-field: 机房编号[ROOM_CODE] operate-Equal[=]
	 */
	private String roomCodeEqual;


	/**
	 * condition-field: 机房编号[ROOM_CODE] operate-In[in]
	 */
	private String[] roomCodes;


	/**
	 * condition-field: 机房名称[ROOM_NAME] operate-Like[like]
	 */
	private String roomName;


	/**
	 * condition-field: 省份ID[PROVINCE_ID] operate-Equal[=]
	 */
	private Long provinceId;


	/**
	 * condition-field: 省份ID[PROVINCE_ID] operate-In[in]
	 */
	private Long[] provinceIds;


	/**
	 * condition-field: 省份ID[PROVINCE_ID] operate-GTEqual[>=]
	 */
	private Long startProvinceId;

	/**
	 * condition-field: 省份ID[PROVINCE_ID] operate-LTEqual[<=]
	 */
	private Long endProvinceId;


	/**
	 * condition-field: 地市ID[CITY_ID] operate-Equal[=]
	 */
	private Long cityId;


	/**
	 * condition-field: 地市ID[CITY_ID] operate-In[in]
	 */
	private Long[] cityIds;


	/**
	 * condition-field: 地市ID[CITY_ID] operate-GTEqual[>=]
	 */
	private Long startCityId;

	/**
	 * condition-field: 地市ID[CITY_ID] operate-LTEqual[<=]
	 */
	private Long endCityId;


	/**
	 * condition-field: 区县ID[COUNTY_ID] operate-Equal[=]
	 */
	private Long countyId;


	/**
	 * condition-field: 区县ID[COUNTY_ID] operate-In[in]
	 */
	private Long[] countyIds;


	/**
	 * condition-field: 区县ID[COUNTY_ID] operate-GTEqual[>=]
	 */
	private Long startCountyId;

	/**
	 * condition-field: 区县ID[COUNTY_ID] operate-LTEqual[<=]
	 */
	private Long endCountyId;


	/**
	 * condition-field: 机房地址[ROOM_ADDR] operate-Like[like]
	 */
	private String roomAddr;


	/**
	 * condition-field: 机房描述[REMARK] operate-Like[like]
	 */
	private String remark;


	/**
	 * condition-field: 机房联系人[CONTACT_NAME] operate-Like[like]
	 */
	private String contactName;


	/**
	 * condition-field: 机房联系人[CONTACT_NAME] operate-Equal[=]
	 */
	private String contactNameEqual;


	/**
	 * condition-field: 机房联系人[CONTACT_NAME] operate-In[in]
	 */
	private String[] contactNames;


	/**
	 * condition-field: 机房联系电话[CONTACT_PHONE] operate-Like[like]
	 */
	private String contactPhone;


	/**
	 * condition-field: 机房联系电话[CONTACT_PHONE] operate-Equal[=]
	 */
	private String contactPhoneEqual;


	/**
	 * condition-field: 机房联系电话[CONTACT_PHONE] operate-In[in]
	 */
	private String[] contactPhones;


	/**
	 * condition-field: 机房联系电话2[CONTACT_PHONE2] operate-Like[like]
	 */
	private String contactPhone2;


	/**
	 * condition-field: 机房联系电话2[CONTACT_PHONE2] operate-Equal[=]
	 */
	private String contactPhone2Equal;


	/**
	 * condition-field: 机房联系电话2[CONTACT_PHONE2] operate-In[in]
	 */
	private String[] contactPhone2s;


	/**
	 * condition-field: 机房联系邮箱[CONTACT_EMAIL] operate-Like[like]
	 */
	private String contactEmail;


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
	 * condition-field: 状态[STATUS] operate-Equal[=]
	 * 1=有效 0=无效
	 */
	private Integer status;


	/**
	 * condition-field: 状态[STATUS] operate-In[in]
	 * 1=有效 0=无效
	 */
	private Integer[] statuss;


	/**
	 * condition-field: 状态[STATUS] operate-GTEqual[>=]
	 * 1=有效 0=无效
	 */
	private Integer startStatus;

	/**
	 * condition-field: 状态[STATUS] operate-LTEqual[<=]
	 * 1=有效 0=无效
	 */
	private Integer endStatus;


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


	public String getRoomCode() {
		return this.roomCode;
	}
	public void setRoomCode(String roomCode) {
		this.roomCode = roomCode;
	}


	public String getRoomCodeEqual() {
		return this.roomCodeEqual;
	}
	public void setRoomCodeEqual(String roomCodeEqual) {
		this.roomCodeEqual = roomCodeEqual;
	}


	public String[] getRoomCodes() {
		return this.roomCodes;
	}
	public void setRoomCodes(String[] roomCodes) {
		this.roomCodes = roomCodes;
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


	public Long[] getProvinceIds() {
		return this.provinceIds;
	}
	public void setProvinceIds(Long[] provinceIds) {
		this.provinceIds = provinceIds;
	}


	public Long getStartProvinceId() {
		return this.startProvinceId;
	}
	public void setStartProvinceId(Long startProvinceId) {
		this.startProvinceId = startProvinceId;
	}


	public Long getEndProvinceId() {
		return this.endProvinceId;
	}
	public void setEndProvinceId(Long endProvinceId) {
		this.endProvinceId = endProvinceId;
	}


	public Long getCityId() {
		return this.cityId;
	}
	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}


	public Long[] getCityIds() {
		return this.cityIds;
	}
	public void setCityIds(Long[] cityIds) {
		this.cityIds = cityIds;
	}


	public Long getStartCityId() {
		return this.startCityId;
	}
	public void setStartCityId(Long startCityId) {
		this.startCityId = startCityId;
	}


	public Long getEndCityId() {
		return this.endCityId;
	}
	public void setEndCityId(Long endCityId) {
		this.endCityId = endCityId;
	}


	public Long getCountyId() {
		return this.countyId;
	}
	public void setCountyId(Long countyId) {
		this.countyId = countyId;
	}


	public Long[] getCountyIds() {
		return this.countyIds;
	}
	public void setCountyIds(Long[] countyIds) {
		this.countyIds = countyIds;
	}


	public Long getStartCountyId() {
		return this.startCountyId;
	}
	public void setStartCountyId(Long startCountyId) {
		this.startCountyId = startCountyId;
	}


	public Long getEndCountyId() {
		return this.endCountyId;
	}
	public void setEndCountyId(Long endCountyId) {
		this.endCountyId = endCountyId;
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


	public String getContactNameEqual() {
		return this.contactNameEqual;
	}
	public void setContactNameEqual(String contactNameEqual) {
		this.contactNameEqual = contactNameEqual;
	}


	public String[] getContactNames() {
		return this.contactNames;
	}
	public void setContactNames(String[] contactNames) {
		this.contactNames = contactNames;
	}


	public String getContactPhone() {
		return this.contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}


	public String getContactPhoneEqual() {
		return this.contactPhoneEqual;
	}
	public void setContactPhoneEqual(String contactPhoneEqual) {
		this.contactPhoneEqual = contactPhoneEqual;
	}


	public String[] getContactPhones() {
		return this.contactPhones;
	}
	public void setContactPhones(String[] contactPhones) {
		this.contactPhones = contactPhones;
	}


	public String getContactPhone2() {
		return this.contactPhone2;
	}
	public void setContactPhone2(String contactPhone2) {
		this.contactPhone2 = contactPhone2;
	}


	public String getContactPhone2Equal() {
		return this.contactPhone2Equal;
	}
	public void setContactPhone2Equal(String contactPhone2Equal) {
		this.contactPhone2Equal = contactPhone2Equal;
	}


	public String[] getContactPhone2s() {
		return this.contactPhone2s;
	}
	public void setContactPhone2s(String[] contactPhone2s) {
		this.contactPhone2s = contactPhone2s;
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


