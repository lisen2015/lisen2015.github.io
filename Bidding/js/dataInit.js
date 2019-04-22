/**
 * 菜单数据初始化
 * Li.chen
 * 2018-11-21
 */
$(function () {
    // 页面标识
    var sys_menuActive = 'index'; // 导航菜单
    var sy_mobile_menuActive = global_sidebar[sys_menuActive][1].active;

    // 导航初始化
    function menuInit (idxs) {
        idxs = typeof idxs == 'undefined' ? 1 : idxs;
        // 导航菜单初始化
        var menuDom = [];
        var menuChildDom = [];
        $.each(global_menu, function (idx, item) { 
            var itemActive = item.active;
            var active = itemActive == sys_menuActive ? 'active' : '';
            var href = item.target ? item.link : 'javascript:;';
            menuDom.push('<li class="nav-item '+active+'" index="'+itemActive+'">');
            menuDom.push('<a class="nav-link" href="'+href+'">');
            menuDom.push(item.title);
            menuDom.push('</a>');

            var sidebarChild = global_sidebar[itemActive];
            if (!isNull(sidebarChild)) {
                menuDom.push('<ul class="navbar-nav pc_hide menu">');
                $.each(sidebarChild, function (idx, item) { 
                    if (idx > 0) {
                        var m_active = sy_mobile_menuActive == item.active ? 'active' : '';
                        menuDom.push('<li class="nav-item '+m_active+'" parent="'+itemActive+'" index="'+item.active+'"><a class="nav-link" href="javascript:;">'+item.title+'</a></li>');
                    }
                });
                menuDom.push('</ul>');
            }
            menuDom.push('</li>');
        });

        $('ul.menu').html(menuDom.join(''));
        if (typeof global_sidebar[sys_menuActive] != 'undefined' || global_sidebar[sys_menuActive] != null){
            var sidebarActive = global_sidebar[sys_menuActive][idxs].active;
            sidebarInit(sys_menuActive, sidebarActive); // 左侧菜单初始化
        } else {
            NProgress.done();
        }
        $('#navbarNavDropdown>ul.menu>li,.header_container ul.menu>li').unbind().click(function(e) {
            e.stopPropagation();
            NProgress.start();
            sys_menuActive = $(this).attr('index');
            sy_mobile_menuActive = global_sidebar[sys_menuActive][1].active;
            $('#navbarNavDropdown').collapse('hide');
            menuInit();
        });

        $('#navbarNavDropdown>ul.menu>li>ul.menu>li').unbind().click(function(e) {
            e.stopPropagation();
            var _this = $(this);
            NProgress.start();
            var t_active = _this.attr('index');
            sy_mobile_menuActive = t_active;
            sys_menuActive = _this.attr('parent');
            $('#navbarNavDropdown').collapse('hide');
            menuInit();
            sidebarInit (sys_menuActive, t_active);
        });

    }
    menuInit();


    // 左侧菜单初始化
    function sidebarInit (obj, sidebarActive) {
        var data = global_sidebar[obj];
        // 菜单大标题初始化
        $('.nav-sidebar .subtitle').text(data[0].title);

        // 初始化面包屑
        breadMenuInit (obj,sidebarActive);

        var sidebarDom = [];
        $.each(data, function (idx, item) { 
            var active = '';
            if (item.active == sidebarActive) {
                active = 'active';
                if (getInfoType(item.infoFlag) == 'detail') {
                    $('#infoList_con').addClass('hide');
                    $('#details_con').removeClass('hide');
                    // 数据加载
                    setDetails(item.infoFlag);

                    // $('.gobackList').removeClass('hide');
                } else {
                    $('#details_con').addClass('hide');
                    $('#infoList_con').removeClass('hide');
                    // 数据加载
                    setList(item.infoFlag);

                    // $('.gobackList').addClass('hide');
                }
            }
            if (idx > 0) {
                sidebarDom.push('<li class="'+active+'" index="'+item.active+'"><i></i>');
                sidebarDom.push('<a href="javascript:;">');
                sidebarDom.push(item.title);
                sidebarDom.push('</a></li>');
            }
        });
        sidebarDom.push('<li class="modal"></li>');
        $('.nav-sidebar .sidebar').html(sidebarDom.join(''));
        NProgress.done();
        $('.nav-sidebar .sidebar li').unbind().click(function () {
            NProgress.start();
            var acIndex = $(this).attr('index');
            sidebarInit (sys_menuActive, acIndex);
        });
    }

    // 初始化面包屑
    function breadMenuInit (obj,sidebarActive) {
        var bread_menuArr = [];
        $.each(global_menu, function (idx, item) { 
            if (item.active == obj) {
                bread_menuArr.push('<a href="javascript:;" menu="'+obj+'">'+item.title+'</a>');
                // 浏览器标题
                $(document).attr('title',item.title); 
            }
        });

        $.each(global_sidebar[obj], function (idx, item) { 
            if (item.active == sidebarActive) {
                bread_menuArr.push('<a href="javascript:;" sidebar="'+sidebarActive+'">'+item.title+'</a>');
                return false;
            }
        });
        $('.bread_menu').html(bread_menuArr.join('-'));
        
        $('.bread_menu a').click(function () {
            var _menu = $(this).attr('menu');
            var _sidebar = $(this).attr('sidebar');
            if (typeof _menu == 'undefined') {
                sidebarInit (sys_menuActive, _sidebar);
            }

            if (typeof _sidebar == 'undefined') {
                sys_menuActive = _menu;
                sy_mobile_menuActive = global_sidebar[sys_menuActive][1].active;
                menuInit();
            }
        });
    }

    // 详情数据展示
    function setDetails (id) {
        var infoData = global_infoList[id].list;
        $('#details_con .title').html(infoData.title);
        $('#details_con .content').html(infoData.content);
    }

    // 详情数据展示
    function setList (id) {
        var infoData = global_infoList[id].list;
        var listDom = [];
        $.each(infoData, function (idx, item) { 
            listDom.push('<li id="'+idx+'" pid="'+id+'"><i></i>');
            listDom.push('<a href="javascript:;">'+item.title+'</a>');
            listDom.push('<span>'+item.time+'</span></li>');
        });
        if (listDom.length < 1) {
            listDom.push('<li><i></i><a>暂无数据...</a></li>');
        }
        $('#infoList_con .infoList').html(listDom.join(''));

        $('#infoList_con .infoList li').unbind().click(function () {
            var parentId = $(this).attr('pid');
            var infoId = $(this).attr('id');
            if (isNull(parentId) || isNull(infoId)) {
                return false;
            }
            var detailInfoData = global_infoList[parentId].list;
            var detailData = detailInfoData[infoId];
            if (isNull(detailData.link)){
                $('#details_con .title').html(detailData.title);
                $('#details_con .content').html(detailData.content);
                $('#infoList_con').addClass('hide');
                $('#details_con').removeClass('hide');
                $('.gobackList').removeClass('hide');
                $('.gobackList').unbind().click(function () {
                    $('#details_con').addClass('hide');
                    $('#infoList_con').removeClass('hide');
                    $(this).addClass('hide');
                });
            } else {
                $(this).find('a').attr({'href':detailData.link, 'target': '_blank'}).click();
            }
        });

    }

    // 获取栏目数据类型
    function getInfoType(id){
        return global_infoList[id].type;
    }

    // 右侧 内容数据初始化
    function contentDataInit (type) {

    }








})

// 
function getValue(key){
    return window.localStorage.getItem(key);
}

function setValue(key, value){
    return window.localStorage.setItem(key, value);
}

function isNull(str){
    if (typeof str == 'undefined' || str == null || str == '' || str.length == 0) {
        return true;
    }
    return false;
}