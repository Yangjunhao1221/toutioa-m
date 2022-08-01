module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },//设计稿的1/10
            propList: ['*'],//*表示所有属性都转
            exclude: ('github-markdown')
        },
    },
};