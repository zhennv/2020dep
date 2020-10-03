export default {
    login: '/ph/login',   //登陆
    register:'/ph/reg' ,//注册
    checkphone:"/ph/check/phone",// 验证手机号是否已经注册

    uploadone:'/upload/single1', //上传图片 默认方式，基于FORM-DATA上传数据
    uploadtwo:'/upload/single2', //上传BASE64
    
    uploadVideo:'/upload/single3', // 切片上传 && 合并, 文件流
    mergeVideo:'/upload/merge',  //文件合并
    
    mypicture:'ph/pictures', //我的图片
    myvideo:'ph/videos', //我的图片

    photographer:'ph/photographer', //摄影师列表
    
    getPic: {
      slot: '/ph/shoot/slot',  //拍摄地
      line:'/ph/shoot/line', //拍摄线路
      photoService: '/service/index' //摄影服务信息
    },

    shootLocType:'/shootLoc/getType' ,//拍摄地类型

    questions: {
      list: '/ph/question/list',//问题列表
      detail: '/ph/question/detail', //问题详情
    },

       //摄影师一对一
  photographyOTO: {
    photographyList: '/communicationNotice/photographyCarpingList',  //摄影师⼀对⼀ 摄影师列列表
    getPhotographyName:'/communicationNotice/getPhotographyName', //据摄影师编号获取 交流者名称
    updatePhotoRead: '/communicationNotice/updatePhotographyCarpingRead', //摄影师⼀对⼀ 更更新为已读
  }
}