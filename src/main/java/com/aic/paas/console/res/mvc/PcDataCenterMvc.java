package com.aic.paas.console.res.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcDataCenter;
import com.aic.paas.console.res.bean.PcDataCenter;
import com.aic.paas.console.res.peer.PcDataCenterPeer;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;

@Controller
@RequestMapping("/res/datac")
public class PcDataCenterMvc {
	
	@Autowired
	PcDataCenterPeer pcDataCenterPeer;
	

	@RequestMapping("/getDataCenterCodeList")
    public void getDataCenterCodeList(HttpServletRequest request, HttpServletResponse response, Integer status, Boolean addEmpty, Boolean addAttr) {
		CPcDataCenter cdt = new CPcDataCenter();
		if(status != null) cdt.setStatus(status);
        
       List<PcDataCenter> list = pcDataCenterPeer.queryList(cdt, "CODE, ID");
      
       List<DropRecord> dropList = ComponentUtil.toDropList(list, "ID", "name", addAttr, addEmpty);
       ControllerUtils.returnJson(request, response, dropList);
    }
	
	@RequestMapping("/queryPage")
	public void queryPage(HttpServletRequest request, HttpServletResponse response,Integer pageNum, Integer pageSize, CPcDataCenter cdt, String orders) {
		Page<PcDataCenter> page = pcDataCenterPeer.queryPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	@RequestMapping("/queryById")
	public void queryById(HttpServletRequest request, HttpServletResponse response,Long id) {
		PcDataCenter p = pcDataCenterPeer.queryById(id);
		ControllerUtils.returnJson(request, response, p);
	}
	
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response,PcDataCenter record) {
		Long c = pcDataCenterPeer.saveOrUpdate(record);
		ControllerUtils.returnJson(request, response, c);
	}
	
	@RequestMapping("/removeById")
	public void removeById(HttpServletRequest request, HttpServletResponse response,Long id) {
		int c = pcDataCenterPeer.removeById(id);
		ControllerUtils.returnJson(request, response, c);
	}
}
