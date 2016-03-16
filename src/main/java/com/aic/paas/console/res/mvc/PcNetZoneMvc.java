package com.aic.paas.console.res.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcNetZone;
import com.aic.paas.console.res.bean.PcNetZone;
import com.aic.paas.console.res.peer.PcNetZonePeer;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;

@Controller
@RequestMapping("/res/netzone")
public class PcNetZoneMvc {
	
	@Autowired
	PcNetZonePeer netZonePeer;
	
	
	@RequestMapping("/getNetZoneCodeList")
    public void getNetZoneCodeList(HttpServletRequest request, HttpServletResponse response, Boolean addEmpty, Boolean addAttr ,Long dataCenterId ,Long resCenterId) {
		CPcNetZone cdt = new CPcNetZone();
		cdt.setStatus(1);
		cdt.setDataCenterId(dataCenterId);
		cdt.setResCenterId(resCenterId);
		List<PcNetZone> list = netZonePeer.queryList(cdt, "ZONE_CODE, ID");
      
		List<DropRecord> dropList = ComponentUtil.toDropList(list, "ID", "zoneName", addAttr, addEmpty);
		ControllerUtils.returnJson(request, response, dropList);
    }
	
	@RequestMapping("/queryPage")
	public void queryPage(HttpServletRequest request, HttpServletResponse response,Integer pageNum, Integer pageSize, CPcNetZone cdt, String orders) {
		Page<PcNetZone> page = netZonePeer.queryPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	@RequestMapping("/queryById")
	public void queryById(HttpServletRequest request, HttpServletResponse response,Long id) {
		PcNetZone p = netZonePeer.queryById(id);
		ControllerUtils.returnJson(request, response, p);
	}
	
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response,PcNetZone record) {
		Long c = netZonePeer.saveOrUpdate(record);
		ControllerUtils.returnJson(request, response, c);
	}
	
	@RequestMapping("/removeById")
	public void removeById(HttpServletRequest request, HttpServletResponse response,Long id) {
		int c = netZonePeer.removeById(id);
		ControllerUtils.returnJson(request, response, c);
	}
	
	@RequestMapping("/isExistZoneCode")
	public void isExistZoneCode(HttpServletRequest request, HttpServletResponse response,String zoneCode, Long resCenterId) {
		CPcNetZone cp = new CPcNetZone();
		cp.setResCenterId(resCenterId);
		cp.setZoneCode(zoneCode);
		List<PcNetZone> list = netZonePeer.queryList(cp, "ID");
		Boolean bl = list.size()>0;
		ControllerUtils.returnJson(request, response, bl);
	}
}
