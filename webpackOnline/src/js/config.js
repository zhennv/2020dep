var commonFun = {};
commonFun.test = function(){
    console.log('test config',scene);
}

commonFun.env = {
    //开发环境
    dev:{
        service:"http://localhost:001",
        settings:"http://localhost:001",
        manage:"http://localhost:001",
    },
    //测试环境
    test:{
        service:"http://localhost:011",
        settings:"http://localhost:011",
        manage:"http://localhost:011",
    },
    //线上环境
    prod:{
        service:"http://localhost:111",
        settings:"http://localhost:111",
        manage:"http://localhost:111",
    },
}
export default commonFun;