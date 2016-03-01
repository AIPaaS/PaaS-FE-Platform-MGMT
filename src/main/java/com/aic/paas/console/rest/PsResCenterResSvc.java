package com.aic.paas.console.rest;

import java.util.List;

import com.aic.paas.console.res.bean.CPsResCenterRes;
import com.aic.paas.console.res.bean.CPsResFlow;
import com.aic.paas.console.res.bean.PsResCenterRes;
import com.aic.paas.console.res.bean.PsResFlow;
import com.aic.paas.console.res.bean.ResItems;
import com.binary.jdbc.Page;

public interface PsResCenterResSvc {
	
	
	
	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<PsResCenterRes> queryResPage(Integer pageNum, Integer pageSize, CPsResCenterRes cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<PsResCenterRes> queryResList(CPsResCenterRes cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public PsResCenterRes queryResById(Long id);
	
	
	
	
	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<PsResFlow> queryFlowPage(Integer pageNum, Integer pageSize, CPsResFlow cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<PsResFlow> queryFlowList(CPsResFlow cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public PsResFlow queryFlowById(Long id);
	
	
	
	
	/**
	 * 创建资源
	 * @param dataCenterId
	 * @param resCenterId
	 * @param netZoneId
	 * @return
	 */
	public PsResCenterRes createRes(Long dataCenterId, Long resCenterId, Long netZoneId);
	
	
	
	/**
	 * 添加总资源
	 * @param netZoneId 网络区域ID
	 * @param items 添加资源项目
	 * @param upor 更新人
	 * @param remark 说明
	 * @return
	 */
	public Integer addTotalResByNetZoneId(Long netZoneId, ResItems items);
	
	
	
	
	
	/**
	 * 扣减总资源
	 * @param netZoneId 网络区域ID
	 * @param items 添加资源项目
	 * @return
	 */
	public Integer reduceTotalResByNetZoneId(Long netZoneId, ResItems items);
	
	
	
	
	/**
	 * 添加资源, 资源项目数据如果有负值则取绝对值
	 * @param netZoneId 网络区域ID
	 * @param items 添加资源项目
	 * @param upor 更新人
	 * @param remark 说明
	 * @return
	 */
	public Integer addResByNetZoneId(Long netZoneId, ResItems items, String upor, String remark);
	
	
	
	
	
	/**
	 * 扣减资源
	 * @param netZoneId 网络区域ID
	 * @param items 添加资源项目
	 * @param upor 更新人
	 * @param remark 说明
	 * @param validity 是否需要验证扣减有效性, 缺省为true
	 * @return
	 */
	public Integer reduceResByNetZoneId(Long netZoneId, ResItems items, String upor, String remark, Boolean validity);
	
	
	
	
	

}
