package com.aic.paas.console.res.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPsMntResApply;
import com.aic.paas.console.res.bean.MntResApplyInfo;
import com.aic.paas.console.res.peer.PsMntResApplyPeer;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;



@Controller
@RequestMapping("/res/mntresapply")
public class PsMntResApplyMvc {
	
	@Autowired
	PsMntResApplyPeer mntResApplyPeer;
	
	
	@RequestMapping("/queryInfoPage")
	public void queryInfoPage(HttpServletRequest request, HttpServletResponse response, Integer pageNum, Integer pageSize, CPsMntResApply cdt, String orders) {
		if(cdt == null) cdt = new CPsMntResApply();
		if(cdt.getStatus()==null && (cdt.getStatuss()==null||cdt.getStatuss().length==0)) {
			cdt.setStatuss(new Integer[]{0,1,2});	//0=待审批  1=审批通过  2=审批退回    9=撤销
		}
		Page<MntResApplyInfo> page = mntResApplyPeer.queryInfoPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}


	
	@RequestMapping("/queryInfoList")
	public void queryInfoList(HttpServletRequest request, HttpServletResponse response, CPsMntResApply cdt, String orders) {
		if(cdt == null) cdt = new CPsMntResApply();
		if(cdt.getStatus()==null && (cdt.getStatuss()==null||cdt.getStatuss().length==0)) {
			cdt.setStatuss(new Integer[]{0,1,2});	//0=待审批  1=审批通过  2=审批退回    9=撤销
		}
		List<MntResApplyInfo> ls = mntResApplyPeer.queryInfoList(cdt, orders);
		ControllerUtils.returnJson(request, response, ls);
	}

	
	@RequestMapping("/queryInfoById")
	public void queryInfoById(HttpServletRequest request, HttpServletResponse response, Long id) {
		MntResApplyInfo app = mntResApplyPeer.queryInfoById(id);
		ControllerUtils.returnJson(request, response, app);
	}
	
	
	
	
	@RequestMapping("/checkApplyPass")
	public void checkApplyPass(HttpServletRequest request, HttpServletResponse response, Long id, String checkDesc) {
		mntResApplyPeer.checkApply(id, true, checkDesc);
		ControllerUtils.returnJson(request, response, true);
	}
	
	
	
	
	@RequestMapping("/checkApplyBack")
	public void checkApplyBack(HttpServletRequest request, HttpServletResponse response, Long id, String checkDesc) {
		mntResApplyPeer.checkApply(id, false, checkDesc);
		ControllerUtils.returnJson(request, response, true);
	}
	

}
