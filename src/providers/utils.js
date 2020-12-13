

export default {
  fileParse(file, type = "base64") {
    return new Promise(resolve => {
      let fileRead = new FileReader();
      if (type === "base64") {
        fileRead.readAsDataURL(file);
      } else if (type === "buffer") {
        fileRead.readAsArrayBuffer(file);
      }
      fileRead.onload = (ev) => {
        resolve(ev.target.result);
      };
    });
  },
  isIosAndroid() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      isChrome = u.indexOf('Safari'); //浏览器端
    return {
      isAndroid,
      isiOS,
      isChrome
    }
  },
  websocktSend(paramsObj) {
    // this --> store
    //这个是用来向后端websocket发送信息，发送之前需要先判断是否还处理链接状态
    var userId = localStorage.getItem('userId');
    var sendMsg = () => {
      window.socketServer.send(JSON.stringify(paramsObj)); //给后端发送信息
    }
    if (window.socketServer.readyState == 1) {
      sendMsg();
    } else {
      webSocket.call(this, process.env.wsconPath + userId).then(() => {
        sendMsg();
      });
    }
  },
  // 时间显示的几分钟、几小时、当天、昨天、前天以及更早的具体时间
  // 2019-12-07 09:58:23
  // JS计算两个日期时间差，天 小时 分 秒格式
  showDiffTime: function (startDate) {
    if (!startDate) {
      return;
    }
    var startDate = startDate.replace(new RegExp(/-/gm), "/");
    var startDateB = new Date(startDate);

    var updateHour = startDateB.getHours(),
      updateMin = startDateB.getMinutes();

    updateHour = updateHour < 10 ? '0' + updateHour : updateHour;
    updateMin = updateMin < 10 ? '0' + updateMin : updateMin;
    var endDate = new Date(); //现在的时间
    var diff = endDate.getTime() - startDateB.getTime();//时间差的毫秒数
    //计算出相差天数
    var days = Math.floor(diff / (24 * 3600 * 1000));
    // 1.当天，显示：HH:MM
    // 2.昨天，显示：昨天 HH:MM
    // 3.前天，显示：前天 HH:MM
    // 4.更早，显示：****年**月**日 HH:MM

    if (days > 0) {
      if (days == 1) {
        return "昨天 " + updateHour + ':' + updateMin;
      }
      if (days == 2) {
        return "前天 " + updateHour + ':' + updateMin;
      }
      if (days > 2) {
        return startDate.split(' ')[0] + ' ' + updateHour + ':' + updateMin;
      }
    }
    if (days == 0) {
      return updateHour + ':' + updateMin;
    }
  },
  //  像scroll，resize，keyup scroll等事件频繁触发会引发页面的抖动甚至卡顿
  debounce(fn, delay) {
    delay = delay || 200;
    var timer = null;

    return function () {
      var arg = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, arg);
      }, delay);
    }
  },

  formatDate(date, formatter) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const min = date.getMinutes()
    const se = date.getSeconds()
    return formatter.replace('YYYY', year)
      .replace('MM', month < 10 ? '0' + month : month)
      .replace('dd', day < 10 ? '0' + day : day)
      .replace('HH', hours < 10 ? '0' + hours : hours)
      .replace('mm', min < 10 ? '0' + min : min)
      .replace('ss', se < 10 ? '0' + se : se)
  },
  /*单击事件：
        * 为了规避click的300ms的延迟，自定义一个单击事件
        * 触发时间：
        *   当抬起手指的时候触发
        *   需要判断手指落下和手指抬起的事件间隔，如果小于500ms表示单击时间。
        *   如果是大于等于500ms，算是长按时间
        * */
  tap: function (handler) {
    this.ele.addEventListener("touchstart", touchFn);
    this.ele.addEventListener("touchend", touchFn);

    var startTime,
      endTime;

    function touchFn(e) {
      e.preventDefault()
      switch (e.type) {
        case "touchstart":
          startTime = new Date().getTime();
          break;
        case "touchend":
          endTime = new Date().getTime();
          if (endTime - startTime < 500) {
            handler.call(this, e);
          }
          break;
      }
    }
  },
  /**
   * 长按
   * @param handler
   */
  longTag: function (handler) {
    this.ele.addEventListener("touchstart", touchFn);
    this.ele.addEventListener("touchmove", touchFn);
    this.ele.addEventListener("touchend", touchFn);
    var timerId;

    function touchFn(e) {
      switch (e.type) {
        case "touchstart":  //500ms之后执行
          timerId = setTimeout(function () {
            handler.call(this, e);
          }, 500)
          break;
        case "touchmove":
          //如果中间有移动也清除定时器
          clearTimeout(timerId)
          break;
        case "touchend":
          //如果在500ms之内抬起了手指，则需要定时器
          clearTimeout(timerId);
          break;
      }
    }
  },
  /**
   * 左侧滑动。
   * 记录手指按下的左边，在离开的时候计算 deltaX是否满足左滑的条件         
   */
  slideLeft: function (handler) {
    this.ele.addEventListener("touchstart", touchFn);
    this.ele.addEventListener("touchend", touchFn);
    var startX, startY, endX, endY;

    function touchFn(e) {
      e.preventDefault();
      var firstTouch = e.changedTouches[0];
      switch (e.type) {
        case "touchstart":
          startX = firstTouch.pageX;
          startY = firstTouch.pageY;
          break;
        case "touchend":
          endX = firstTouch.pageX;
          endY = firstTouch.pageY;
          //x方向移动大于y方向的移动，并且x方向的移动大于25个像素，表示在向左侧滑动
          if (Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 25) {
            handler.call(this, e);
          }
          break;
      }
    }
  },
  /* 右侧滑动 */
  rightLeft: function (e) {
    //TODO:
  }

}