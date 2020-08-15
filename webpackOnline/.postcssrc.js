module.exports = {
    plugins:{
        'postcss-preset-env':{},
        'postcss-pxtorem':{
            rootValue:10,
            minPixelValue:2,
            propWhiteList: []
        }
    }
}