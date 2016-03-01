package com.aic.paas.console.res.peer.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.console.res.bean.CPsMntResApply;
import com.aic.paas.console.res.bean.CPsResCenterRes;
import com.aic.paas.console.res.bean.MntResApplyInfo;
import com.aic.paas.console.res.bean.PsMntResApply;
import com.aic.paas.console.res.bean.PsResCenterRes;
import com.aic.paas.console.res.peer.PsMntResApplyPeer;
import com.aic.paas.console.rest.PsMntResApplySvc;
import com.aic.paas.console.rest.PsResCenterResSvc;
import com.aic.paas.frame.cross.bean.CWsMerchent;
import com.aic.paas.frame.cross.bean.WsMerchent;
import com.aic.paas.frame.cross.rest.MerchentSvc;
import com.binary.core.util.BinaryUtils;
import com.binary.framework.exception.ServiceException;
import com.binary.jdbc.Page;

public class PsMntResApplyPeerImpl implements PsMntResApplyPeer {

	
	@Autowired
	PsMntResApplySvc mntResApplySvc;
	
	@Autowired
	MerchentSvc merchentSvc;

	@Autowired
	PsResCenterResSvc resCenterResSvc;
	
	
	@Override
	public Page<PsMntResApply> queryPage(Integer pageNum, Integer pageSize, CPsMntResApply cdt, String orders) {
		return mntResApplySvc.queryPage(pageNum, pageSize, cdt, orders);
	}
	
	

	@Override
	public List<PsMntResApply> queryList(CPsMntResApply cdt, String orders) {
		return mntResApplySvc.queryList(cdt, orders);
	}
	
	

	@Override
	public PsMntResApply queryById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return mntResApplySvc.queryById(id);
	}
	
	
	
	private List<MntResApplyInfo> fillApplyInfo(List<PsMntResApply> ls) {
		List<MntResApplyInfo> infos = new ArrayList<MntResApplyInfo>();
		if(ls!=null && ls.size()>0) {
			Set<Long> mntids = new HashSet<Long>();
			for(int i=0; i<ls.size(); i++) {
				PsMntResApply apply = ls.get(i);
				Long mntId = apply.getMntId();
				
				MntResApplyInfo info = new MntResApplyInfo();
				info.setApply(apply);
				infos.add(info);
				mntids.add(mntId);
			}
			
			if(mntids.size() > 0) {
				CWsMerchent mntcdt = new CWsMerchent();
				mntcdt.setIds(mntids.toArray(new Long[0]));
				List<WsMerchent> mntls = merchentSvc.queryList(mntcdt, null);
				
				if(mntls.size() > 0) {
					Map<Long, WsMerchent> mntmap = BinaryUtils.toObjectMap(mntls, "id");
					for(int i=0; i<infos.size(); i++) {
						MntResApplyInfo info = infos.get(i);
						info.setMerchent(mntmap.get(info.getApply().getMntId()));
					}
				}
			}
		}
		return infos;
	}
	
	
	
	@Override
	public Page<MntResApplyInfo> queryInfoPage(Integer pageNum, Integer pageSize, CPsMntResApply cdt, String orders) {
		Page<PsMntResApply> page = queryPage(pageNum, pageSize, cdt, orders);
		List<PsMntResApply> ls = page.getData();
		List<MntResApplyInfo> infols = fillApplyInfo(ls);
		return new Page<MntResApplyInfo>(page.getPageNum(), page.getPageSize(), page.getTotalRows(), page.getTotalPages(), infols);
	}



	@Override
	public List<MntResApplyInfo> queryInfoList(CPsMntResApply cdt, String orders) {
		List<PsMntResApply> ls = queryList(cdt, orders);
		return fillApplyInfo(ls);
	}



	@Override
	public MntResApplyInfo queryInfoById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		PsMntResApply p = queryById(id);
		if(p != null) {
			List<PsMntResApply> ls = new ArrayList<PsMntResApply>();
			ls.add(p);
			return fillApplyInfo(ls).get(0);
		}
		return null;
	}
	
	
	

	@Override
	public void checkApply(Long id, Boolean pass, String checkDesc) {
		BinaryUtils.checkEmpty(id, "id");
		BinaryUtils.checkEmpty(pass, "pass");
		BinaryUtils.checkEmpty(checkDesc, "checkDesc");
		
		PsMntResApply apply = mntResApplySvc.queryById(id);
		if(apply == null) throw new ServiceException(" not found res-apply by id '"+id+"'! ");
		
		Long mntId = apply.getMntId();
		WsMerchent mnt = merchentSvc.queryById(mntId);
		if(mnt == null) {
			throw new ServiceException(" not found mnt by id '"+mntId+"'! ");
		}
		
		//如果审批通过先验证一下资源中心资源是否够
		if(Boolean.TRUE.equals(pass)) {
			CPsResCenterRes rescdt = new CPsResCenterRes();
			rescdt.setNetZoneId(apply.getNetZoneId());
			List<PsResCenterRes> resls = resCenterResSvc.queryResList(rescdt, null);
			if(resls.size() == 0) throw new ServiceException(" not found res by net-zone-id '"+apply.getNetZoneId()+"'! ");
			PsResCenterRes res = resls.get(0);
			
			long appCpuCount = apply.getCpuCount();
			long appMemSize = apply.getMemSize();
			long appDiskSize = apply.getDiskSize();
			
			long resCpuCount = res.getCpuCount();
			long resMemSize = res.getMemSize();
			long resDiskSize = res.getDiskSize();
			
			if(appCpuCount > resCpuCount) throw new ServiceException(" The current resource center 'CPU' is not enough! ");
			if(appMemSize > resMemSize) throw new ServiceException(" The current resource center 'memory' is not enough! ");
			if(appDiskSize > resDiskSize) throw new ServiceException(" The current resource center 'storage' is not enough! ");
		}
		
		mntResApplySvc.checkApply(id, pass, checkDesc, mnt);
	}



	
	
	
	
	
}
