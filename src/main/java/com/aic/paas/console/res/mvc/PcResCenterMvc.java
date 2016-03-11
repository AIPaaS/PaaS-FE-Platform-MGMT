package com.aic.paas.console.res.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcResCenter;
import com.aic.paas.console.res.bean.PcComputer;
import com.aic.paas.console.res.bean.PcResCenter;
import com.aic.paas.console.res.bean.PcResCenterInfo;
import com.aic.paas.console.res.bean.ResDetailInfo;
import com.aic.paas.console.res.peer.PcComputerPeer;
import com.aic.paas.console.res.peer.PcResCenterPeer;
import com.aic.paas.console.res.vo.OpenResultParamVo;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;

@Controller
@RequestMapping("/res/resc")
public class PcResCenterMvc {
	
	@Autowired
	PcResCenterPeer pcResCenterPeer;
	
	@Autowired
	PcComputerPeer pcComputerPeer;
	
	@RequestMapping("/getResCenterCodeList")
    public void getResCenterCodeList(HttpServletRequest request, HttpServletResponse response, Boolean addEmpty, Boolean addAttr ,Long dataCenterId) {
		CPcResCenter cdt = new CPcResCenter();
        cdt.setStatus(1);
        cdt.setDataCenterId(dataCenterId);
       List<PcResCenter> list = pcResCenterPeer.queryList(cdt, "RES_CODE, ID");
      
       List<DropRecord> dropList = ComponentUtil.toDropList(list, "ID", "resName", addAttr, addEmpty);
       ControllerUtils.returnJson(request, response, dropList);
    }
	
	
	
	
	
	@RequestMapping("/queryPage")
	public void queryPage(HttpServletRequest request, HttpServletResponse response,Integer pageNum, Integer pageSize, CPcResCenter cdt, String orders) {
		Page<PcResCenter> page = pcResCenterPeer.queryPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	
	@RequestMapping("/queryInfoPage")
	public void queryInfoPage(HttpServletRequest request, HttpServletResponse response,Integer pageNum, Integer pageSize, CPcResCenter cdt, String orders) {
		Page<PcResCenterInfo> page = pcResCenterPeer.queryInfoPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	
	
	@RequestMapping("/queryById")
	public void queryById(HttpServletRequest request, HttpServletResponse response,Long id) {
		PcResCenter p = pcResCenterPeer.queryById(id);
		ControllerUtils.returnJson(request, response, p);
	}
	
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response,PcResCenter record) {
		Long c = pcResCenterPeer.saveOrUpdate(record);
		ControllerUtils.returnJson(request, response, c);
	}
	
	@RequestMapping("/removeById")
	public void removeById(HttpServletRequest request, HttpServletResponse response,Long id) {
		int c = pcResCenterPeer.removeById(id);
		ControllerUtils.returnJson(request, response, c);
	}

	@RequestMapping("/initResCenter")
	public void initResCenter(HttpServletRequest request, HttpServletResponse response,Long resCenterId,Boolean useAgent,Boolean loadOnly){
		OpenResultParamVo r = pcResCenterPeer.initResCenter(resCenterId,useAgent,loadOnly);	
		ControllerUtils.returnJson(request, response, r);
	}
	
	@RequestMapping("/getInitLog")
	public void getInitLog(HttpServletRequest request, HttpServletResponse response,Long resCenterId){
		List<String> log = pcResCenterPeer.getInitLog(resCenterId);
		ControllerUtils.returnJson(request, response, log);
	}
	
}
