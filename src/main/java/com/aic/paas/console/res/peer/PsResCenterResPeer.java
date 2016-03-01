package com.aic.paas.console.res.peer;

import java.util.List;

import com.aic.paas.console.res.bean.CPsResCenterRes;
import com.aic.paas.console.res.bean.CPsResFlow;
import com.aic.paas.console.res.bean.PsResCenterRes;
import com.aic.paas.console.res.bean.PsResFlow;
import com.binary.jdbc.Page;

public interface PsResCenterResPeer {

	
	
	
	
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
	



}
