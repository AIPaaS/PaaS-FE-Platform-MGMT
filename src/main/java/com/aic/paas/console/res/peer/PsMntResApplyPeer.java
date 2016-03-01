package com.aic.paas.console.res.peer;

import java.util.List;

import com.aic.paas.console.res.bean.CPsMntResApply;
import com.aic.paas.console.res.bean.MntResApplyInfo;
import com.aic.paas.console.res.bean.PsMntResApply;
import com.binary.jdbc.Page;

public interface PsMntResApplyPeer {
	
	
	
	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<PsMntResApply> queryPage(Integer pageNum, Integer pageSize, CPsMntResApply cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<PsMntResApply> queryList(CPsMntResApply cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public PsMntResApply queryById(Long id);
	
	
	
	
	
	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<MntResApplyInfo> queryInfoPage(Integer pageNum, Integer pageSize, CPsMntResApply cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<MntResApplyInfo> queryInfoList(CPsMntResApply cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public MntResApplyInfo queryInfoById(Long id);
	
	
		
	
	/**
	 * 审核申请单
	 * @param id
	 * @param pass true=通过    false=退回
	 * @param checkDesc 
	 * @return
	 */
	public void checkApply(Long id, Boolean pass, String checkDesc);
	
	
	

}
