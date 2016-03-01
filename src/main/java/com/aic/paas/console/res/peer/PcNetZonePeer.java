package com.aic.paas.console.res.peer;

import java.util.List;

import com.aic.paas.console.res.bean.CPcNetZone;
import com.aic.paas.console.res.bean.PcNetZone;
import com.binary.jdbc.Page;

public interface PcNetZonePeer {
	
	

	
	/**
	 * 分页查询
	 * @param pageNum : 指定页码
	 * @param pageSize : 指定页行数
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public Page<PcNetZone> queryPage(Integer pageNum, Integer pageSize, CPcNetZone cdt, String orders);


	
	
	
	/**
	 * 不分页查询
	 * @param cdt : 条件对象
	 * @param orders : 排序字段, 多字段以逗号分隔
	 * @return 
	 */
	public List<PcNetZone> queryList(CPcNetZone cdt, String orders);

	
	
	
	
	/**
	 * 跟据主键查询
	 * @param id : 主键ID
	 * @return 操作员表[SYS_OP]映射对象
	 */
	public PcNetZone queryById(Long id);
	
	
	
	
	
	/**
	 * 保存获更新，判断主键ID[id]是否存在, 存在则更新, 不存在则插入
	 * @param record : PcNetZone数据记录
	 * @return 当前记录主键[id]值
	 */
	public Long saveOrUpdate(PcNetZone record);
	
	
	
	
	
	/**
	 * 跟据分类ID删除
	 * @param id
	 * @return
	 */
	public int removeById(Long id);
	



}
