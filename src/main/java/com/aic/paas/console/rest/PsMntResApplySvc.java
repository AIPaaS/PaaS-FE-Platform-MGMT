package com.aic.paas.console.rest;

import java.util.List;

import com.aic.paas.console.res.bean.CPsMntResApply;
import com.aic.paas.console.res.bean.PsMntResApply;
import com.aic.paas.frame.cross.bean.WsMerchent;
import com.binary.jdbc.Page;

public interface PsMntResApplySvc {
	
	
	
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
	 * 保存获更新，判断主键ID[id]是否存在, 存在则更新, 不存在则插入
	 * @param record : PsMntResApply数据记录
	 * @return 当前记录主键[id]值
	 */
	public Long saveOrUpdate(PsMntResApply record);
	
	
	
	
	/**
	 * 取消申请
	 * @param id
	 * @return
	 */
	public void cannelApply(Long id);
	
	
	
	
	
	/**
	 * 审核申请单
	 * @param id
	 * @param pass true=通过    false=退回
	 * @param checkDesc 
	 * @return
	 */
	public void checkApply(Long id, Boolean pass, String checkDesc, WsMerchent mnt);
	
	
	
	

}
