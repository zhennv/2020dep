import axios from 'axios';
import Qs from 'qs';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = process.env.VUE_APP_URL;  //接口的域名
var typearr = {
  'json': 'application/json;charset=UTF-8',
  'urlencoded': 'application/x-www-form-urlencoded',
  'formdata': 'multipart/form-data'
};

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 监测是什么数据类型
  var datakind = Object.prototype.toString.call(config.data);

  var contype = '';
  switch (datakind) {
    case "[object FormData]":
      contype = typearr['formdata']
      break;
    case "[object String]":
      contype = typearr['urlencoded'];
      break;
    case '[object Object]':
      contype = typearr['json'];
    default:
      contype = typearr['json'];
  }

  config.headers.common = {
    'token': localStorage.getItem('token'),
    'version': '1.0',
    'Content-Type': contype
  }

  if (config.data && config.datakind == 'formurlencoded') {
    //想得到formdata格式
    config.transformRequest = [function (data) {

      // 方式一：
      /*  let params = '';
       for(const key in data){
           //  key = >  data[key]
             // params+=     key+'='+data[key] +'&'; //可能会有问题
             params+=     encodeURIComponent(key)+'='+encodeURIComponent(data[key]) +'&'; 
 
       }
       return params.substring(0,params.length-1); */
      //Content-Type : application/x-www-form-urlencoded

      var test2 = Qs.stringify(data);
      return test2;

    }]
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器 -后端给前端数据的时候，一个拦截操作
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  if (response.status == 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
  //一般情况
  // return response;
}, function (err) {
  // 对响应错误做点什么
  if (err && err.response) {
    let errorMsg = '';
    switch (err.response.status) {
      case 400:
        console.log('错误请求')
        errorMsg = '错误请求';
        break;
      case 401:
        console.log('未授权，请重新登录');
        errorMsg = '未授权，请重新登录';
        break;
      case 403:
        console.log('拒绝访问')
        errorMsg = '拒绝访问';
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        errorMsg = '请求错误,未找到该资源';
        break;
      case 405:
        console.log('请求方法未允许')
        errorMsg = '请求方法未允许';
        break;
      case 408:
        console.log('请求超时')
        errorMsg = '请求超时';
        break;
      case 500:
        console.log('服务器端出错')
        errorMsg = '服务器端出错';
        break;
      case 501:
        console.log('网络未实现')
        errorMsg = '请求方法未允许';
        break;
      case 502:
        console.log('网络错误')
        errorMsg = '网络错误';
        break;
      case 503:
        console.log('服务不可用')
        errorMsg = '服务不可用';
        break;
      case 504:
        console.log('网络超时')
        errorMsg = '网络超时';
        break;
      case 505:
        console.log('http版本不支持该请求')
        errorMsg = 'http版本不支持该请求';
        break;
      default:
        console.log(`连接错误`)
    }

    alert(errorMsg);
  } else {
    console.log('链接服务器失败');
  }

  // return Promise.reject(error);
});


export default {
  // datakind是形参
  // post: async function(url,data,datakind){ }   //不简写

  // 箭头函数

  post: async (url, data, datakind) => {
    // await  promise对象
    var p1 = await axios({
      method: 'post',
      url: url,
      data: data,
      datakind: datakind
    });
    return p1.data;
  },
  // async post(url,data,datakind){
  //   // await  promise对象
  //     var p2 =await  axios({
  //       method:'post',
  //       url:url,
  //       data:data,
  //       datakind:datakind
  //   });

  // return p2.data;
  // },

  async get(url, data) {
    var p2 = await axios({
      method: 'get',
      url: url,
      params: data
    });

    return p2.data;
  }
}
// post('/data1',{name:'alice'}).then(()=>{ })
