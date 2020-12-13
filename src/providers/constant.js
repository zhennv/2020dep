var commonFun = {};
commonFun.checkJson = {
  mobile: {
    reg: /^1[3-9]\d{9}$/,
    msg: '请输入正确的手机号码'
  },
  tel: {
    reg: /^\d{7,11}$/,
    msg: '电话号码必须为7到11位的数字！'
  },
  password: {
    reg: /^[a-zA-Z0-9]{6,20}$/,
    msg: '密码为字母+数字，不区分大小写，最少六位'
  }
}


export default commonFun;

// 直接在页面中访问，
// configCommon.constantObj.serviceList