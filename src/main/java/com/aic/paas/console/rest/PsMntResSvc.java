package com.aic.paas.console.rest;

import java.util.List;

import com.aic.paas.console.res.bean.CPsMntRes;
import com.aic.paas.console.res.bean.CPsMntResFlow;
import com.aic.paas.console.res.bean.PsMntRes;
import com.aic.paas.console.res.bean.PsMntResFlow;
import com.aic.paas.console.res.bean.ResItems;
import com.aic.paas.frame.cross.bean.WsMerchent;
import com.binary.jdbc.Page;

public interface PsMntResSvc {
	
	
	
	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<PsMntRes> queryResPage(Integer pageNum, Integer pageSize, CPsMntRes cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<PsMntRes> queryResList(CPsMntRes cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public PsMntRes queryResById(Long id);
	
	
	
	
	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<PsMntResFlow> queryFlowPage(Integer pageNum, Integer pageSize, CPsMntResFlow cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<PsMntResFlow> queryFlowList(CPsMntResFlow cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public PsMntResFlow queryFlowById(Long id);
	
	
	
	
	/**
	 * 创建资源
	 * @param mntId
	 * @param dataCenterId
	 * @param resCenterId
	 * @param netZoneId
	 * @return
	 */
	public PsMntRes createRes(Long mntId, Long dataCenterId, Long resCenterId, Long netZoneId);
	
	
	
	/**
	 * 删除资源
	 * @param mntId
	 * @param netZoneId
	 */
	public void removeResByMnt(Long mntId, Long netZoneId, WsMerchent mnt);
	
	
	
	/**
	 * 删除所有资源
	 * @param mntId
	 */
	public void removeAllResByMnt(Long mntId, WsMerchent mnt);
	
	
	
	
	/**
	 * 添加总资源
	 * @param id 资源ID
	 * @param items 添加资源项目
	 * @param upor 更新人
	 * @param remark 说明
	 * @return
	 */
	public Integer addTotalRes(Long id, ResItems items);
	
	
	
	
	
	/**
	 * 扣减总资源
	 * @param id 资源ID
	 * @param items 添加资源项目
	 * @return
	 */
	public Integer reduceTotalRes(Long id, ResItems items);
	
	
	
	
	/**
	 * 添加资源, 资源项目数据如果有负值则取绝对值
	 * @param id 资源ID
	 * @param items 添加资源项目
	 * @param upor 更新人
	 * @param remark 说明
	 * @param applyId 对应申请单ID, 可为空
	 * @return
	 */
	public Integer addRes(Long id, ResItems items, String upor, String remark, Long applyId);
	
	
	
	
	
	/**
	 * 扣减资源
	 * @param id 资源ID
	 * @param items 添加资源项目
	 * @param upor 更新人
	 * @param remark 说明
	 * @param validity 是否需要验证扣减有效性, 缺省为true
	 * @param applyId 对应申请单ID, 可为空
	 * @return
	 */
	public Integer reduceRes(Long id, ResItems items, String upor, String remark, Long applyId, Boolean validity);
	
	
	
	
	

}




