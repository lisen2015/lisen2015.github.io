/**
 * 头部导航菜单 数据维护
 * Li.chen
 * 2018-11-20
 */

 var global_menu = [
    // 首页
    {
        active: 'index', // 导航菜单 标识
        title: '首页', // 菜单名称
        link: './index.shtml', // 栏目地址
        child: [] // 子菜单项
    },
    // 业务规则与流程
    {
        active: 'business',
        title: '业务规则与流程',
        link: '/business.shtml',
        child: []
    },
    // 项目案例
    {
        active: 'project',
        title: '项目案例',
        link: '/project.shtml',
        child: []
    },
    // 新闻链接
    {
        active: 'news',
        title: '新闻链接',
        link: '/news.shtml',
        child: []
    },
    // 官网链接
    {
        target: true,
        title: '官网链接',
        link: 'https://www.shie.com.cn/'
    },
    // 公告
    {
        active: 'announcement',
        title: '公告',
        link: '/announcement.shtml',
        child: []
    },
    // 关于我们
    {
        active: 'about',
        title: '联系我们',
        link: './about.shtml',
        child: []
    }
 ]