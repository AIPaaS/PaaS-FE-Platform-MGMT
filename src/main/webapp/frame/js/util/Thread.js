/**
 * 线程管理类
 * param_task: 所执行的方法名
 * param_delay: 每隔多少毫秒执行一次
 * param_times: 执行多少次结束(=-1时表示一直执行)
 * 如带参数后加
 */
function Thread(param_task, param_delay, param_times) {
    this.runFlag = false;
    this.busyFlag = false;
    
    this.taskArgs = Array.prototype.slice.call(arguments, 3);
    this.times = param_times!=null&&param_times!=undefined?param_times:1;
    
    var obj = this;
    this.timerID = -1;
    
    this.start = function() {
        if (this.runFlag == false) {
            this.timerID = window.setInterval(obj.run, param_delay);            
            this.runFlag = true;
        }
    }
    this.run = function() {
        if (obj.busyFlag) return;
        if (obj.times == -1) {		//无限循环
            param_task(obj.taskArgs);
        }else if (obj.times>0) {
            param_task(obj.taskArgs);
            obj.times -= 1 ;
            if (obj.times == 0) {
                window.clearInterval(this.timerID);
            }                                  
        }        
    }
    this.sleep = function() {
        this.busyFlag=true;
    }
    this.resume = function() {
        this.busyFlag=false;
    }
    this.stop = function() {
        window.clearInterval(this.timerID);        
    }
}