package com.aic.paas.console.res.vo;

import java.io.Serializable;
import java.sql.Timestamp;

public class LogResult implements Serializable {

  private String desc;

  public String getDesc() {
    return desc;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }



  public Timestamp getFinishTime() {
    return finishTime;
  }

  public void setFinishTime(Timestamp finishTime) {
    this.finishTime = finishTime;
  }

  public LogResult(String desc, Timestamp finishTime) {
    super();
    this.desc = desc;
    this.finishTime = finishTime;
  }

  private Timestamp finishTime;
  private static final long serialVersionUID = -5475977725662018061L;

}
