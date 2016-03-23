package com.aic.paas.console.res.mvc;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcResCenter;
import com.aic.paas.console.res.bean.PcResCenter;
import com.aic.paas.console.res.bean.PcResCenterInfo;
import com.aic.paas.console.res.peer.PcComputerPeer;
import com.aic.paas.console.res.peer.PcResCenterPeer;
import com.aic.paas.console.res.vo.LogResult;
import com.aic.paas.console.res.vo.OpenResultParamVo;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.core.http.HttpClient;
import com.binary.core.util.BinaryUtils;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;
import com.binary.json.JSON;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping("/res/resc")
public class PcResCenterMvc {
	
	@Autowired
	PcResCenterPeer pcResCenterPeer;
	
	@Autowired
	PcComputerPeer pcComputerPeer;
	
	@Value("${project.task.root}")
	String taskRoot;
	
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

	@RequestMapping("/isExistResCode")
	public void isExistResCode(HttpServletRequest request, HttpServletResponse response,String resCode) {
		CPcResCenter cp = new CPcResCenter();
		cp.setResCode(resCode);
		List<PcResCenter> list = pcResCenterPeer.queryList(cp, "ID");
		Boolean bl = list.size()>0;
		ControllerUtils.returnJson(request, response, bl);
	}
	
	@RequestMapping("/initResCenter")
	public void initResCenter(HttpServletRequest request, HttpServletResponse response,Long resCenterId,Boolean useAgent,Boolean loadOnly){
		OpenResultParamVo r = pcResCenterPeer.initResCenter(resCenterId,useAgent,loadOnly);	
		ControllerUtils.returnJson(request, response, r);
	}
	
	@RequestMapping("/cancelResCenter")
	public void cancelResCenter(HttpServletRequest request, HttpServletResponse response,Long resCenterId,Boolean useAgent,Boolean loadOnly){
		OpenResultParamVo r = pcResCenterPeer.cancelResCenter(resCenterId,useAgent,loadOnly);	
		ControllerUtils.returnJson(request, response, r);
	}
	
	@RequestMapping("/getInitLog")
	public void getInitLog(HttpServletRequest request, HttpServletResponse response,Long resCenterId){
		String log = pcResCenterPeer.getInitLog(resCenterId);
		Gson gson = new Gson();
		List<LogResult> reslog = gson.fromJson(log, new TypeToken<List<LogResult>>() {
		}.getType());;
		ControllerUtils.returnJson(request, response, reslog);
	}
	
	@RequestMapping("/getInitLogNew")
	public void getInitLogNew(HttpServletRequest request, HttpServletResponse response, Long resCenterId) {
		BinaryUtils.checkEmpty(resCenterId, "resId");
		System.out.println("==========getInitLogNew====resCenterId====" + resCenterId);
		System.out.println("==========getInitLogNew====taskRoot====" + taskRoot);
		HttpClient client = HttpClient.getInstance(taskRoot);
		String logs = client.request("/res/manage/queryLog?id=" + resCenterId);
		System.out.println("==========getInitLogNew========" + logs);
		ControllerUtils.returnJson(request, response, JSON.toObject(logs));
	}
	
	@RequestMapping("/initResCenterSuccess")
	public void initResCenterSuccess(HttpServletRequest request, HttpServletResponse response,Long resCenterId){
		pcResCenterPeer.initResCenterSuccess(resCenterId);
	}	
	
	@RequestMapping("/addSlave")
	public void addSlave(HttpServletRequest request, HttpServletResponse response,Long resCenterId,String computerId){
		String[] id = computerId.split(",");
		List<Long> list = new ArrayList<Long>();
		for(String str : id) list.add(Long.parseLong(str));
		OpenResultParamVo r = pcResCenterPeer.addSlave(resCenterId,list);
		ControllerUtils.returnJson(request, response, r);
	}
	
}
