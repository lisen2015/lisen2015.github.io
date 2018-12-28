/**
 * 菜单数据初始化
 * Li.chen
 * 2018-11-21
 */
var staticIndex = 1;
// 配置页面加载模块参数
var waitMilliSeconds = 300;

// 判断加载本地js类库 / cdn 类库
var staticLibIndex = typeof staticIndex != 'undefined' ? staticIndex : 0;

var libProperties = {
    css: ['./lib/css.min', './lib/css'],
    jquery: ['./lib/jquery.min', './lib/jquery.min'],
    bootstrap: ['./lib/bootstrap.min', './lib/bootstrap.min'],
    menu: ['./data/menu.min', './data/menu'],
    sidebar: ['./data/sidebar.min', './data/sidebar'],
    infoList: ['./data/infoList.min', './data/infoList'],
    dataInit: ['./dataInit.min', './dataInit']
}

setTimeout(function() {
    require.config({
        /*加载等待时间*/
        waitSeconds: 0,
        /*urlArgs: "版本号",*/
        urlArgs: "v="+(new Date()).getTime(), /*v=yyyymmddHHMM*/
        /*配置Javascript文件映射路径*/
        paths: {
            css: libProperties.css[staticLibIndex],
            jquery: libProperties.jquery[staticLibIndex],
            bootstrap: libProperties.bootstrap[staticLibIndex],
            menu: libProperties.menu[staticLibIndex],
            sidebar: libProperties.sidebar[staticLibIndex],
            infoList: libProperties.infoList[staticLibIndex],
            dataInit: libProperties.dataInit[staticLibIndex]
        },
        shim: {
            // 'css!../css/index',
            /*模块依赖关系*/
            'bootstrap': { deps: ['jquery'] },

            'dataInit': {deps: ['menu', 'sidebar', 'infoList']}
        }
    });

    require(["bootstrap"],function(){
        require(["dataInit"]);
    });

    // require(['bootstrap']);
}, waitMilliSeconds);