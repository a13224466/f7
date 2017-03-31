// require('../css/my-app.css');
// require('./framework7.min.js')();

var myApp = new Framework7({ // 初始化
    pushState: true,
    cache: false,
    pushStateSeparator: '#/',
});

var $$ = Dom7;

// setTimeout(function () {
//     document.querySelector('.toolbar .index').click(); // 默认显示index.html 页面
// }, 0);

$$(document).on('pageAfterBack', function (e) { // 默认每个页面都显示底栏
    mainView.showToolbar();
})

$(document).on(function (e) { // 默认每个页面都显示底栏
    mainView.showToolbar();
})

var mainView = myApp.addView('.view-main', {// 主view
    dynamicNavbar: true,
});

myApp.onPageInit('me-withdrawals', function (page) {
    console.log('me-withdrawals');
    $('.confirm-withdrawals').on('touchstart', function (e) {
        mainView.router.loadPage('me-withdrawals-details.html');
    });
});

myApp.onPageInit('index', function (page) { //主page

    new Swiper('.swiper-container.index', { //首页幻灯片
        pagination: '.index .swiper-pagination'
    });

    new Swiper('.swiper-container.shop-profit-give-bean', { //盈利送金豆
        slidesPerView: 3.5,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 11,
        slidesOffsetBefore: 15,
    });

    $$(".search-index").on('touchstart', function (e) {// 首页查询
        console.log('search-index');
        mainView.router.loadPage('search-main.html');
    });

    // 底栏样式切换
    $('.toolbar.index a').on('touchstart', function (e) {
        var $this = $(this);
        $this.parent().find('a').each(function (i, e) {
            $(this).css({
                color: '#000',
            });
            var attr = $(e).find('use').attr('xlink:href');
            $(e).find('use').attr('xlink:href', attr.replace('sel', 'no'));
        });
        $this.css({ color: '#ff5500', });
        var icon_attr = $this.find('use').attr('xlink:href');
        $this.find('use').attr('xlink:href', icon_attr.replace('no', 'sel'));
    });

    (function () {
        $.each($('.page-index .header-item .header-item-content'), function (i, e) {
            var num = 1; // 计数器
            setInterval(function () {
                if (num < 3) { // 组数
                    $(e).animate({ scrollTop: (num * 50) + 'rem' }, 1000);
                } else {
                    $(e).animate({ scrollTop: '0' }, 1000);
                    num = 0;
                }
                num++;
            }, 4000);
        });
    })();

});

myApp.onPageInit('profit-give-bean', function (e) {// 盈利送金豆page

    new Swiper('.swiper-container.give-bean', {//盈利送金豆幻灯片
        preloadImages: false, // 预加载
        lazyLoading: true, // 延迟加载
        pagination: '.swiper-pagination' //显示页数
    })
    console.log('profit-give-bean');

    $$(document).on('touchstart', '.profit-give-bean .alert-buy-know', function (e) {
        var buyknow = $(this).data('buyknow'); //获取标签上面的值填充到modal

        myApp.modal({
            text:
            '<div style="word-break: break-all;">'
            + buyknow
            + '</div>',
            buttons: [{
                text: '我知道了',
                onClick: function () {
                    myApp.closeModal('.alert-buy-know');
                }
            }]
        });
    });
});

myApp.onPageInit('bean-indiana', function (e) {
    console.log('bean-indiana');

    new Swiper('.swiper-container.banner', {
        pagination: '.swiper-pagination',
    })

    new Swiper('.swiper-container.classify', {
        slidesPerView: 2.5,
        freeMode: true,
        freeModeSticky: true,
    })
});

myApp.onPageInit('search-shop', function (page) { //查询商品
    // 已售完
    console.log('search-shop');

    $(".search-shop .filter").on('touchstart', function () {
        myApp.openPanel('right');
    });


});

myApp.onPageInit('search-main', function (page) { // 查询主页
    console.log('search-main');
    mainView.hideToolbar();

    $('.search-main .wrap-popover').on('touchstart', function () {
        var clickedLink = this;
        var popoverHTML = '<div class="popover search-main">' +
            '<div class="popover-inner">' +
            '<div class="content-block">' +
            '<ul>' +
            '<li>' +
            '<svg class="icon" aria-hidden="true"><use xlink:href="#jd-Search_drop_goods"></use></svg >' +
            '<span>商品</span>' +
            '</li>' +
            '<li>' +
            '<svg class="icon" aria-hidden="true"><use xlink:href="#jd-Search_drop_store"></use></svg >' +
            '<span>店铺</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>'
        myApp.popover(popoverHTML, clickedLink);
    });

});




myApp.onPageInit('shop-details-all', function (page) { //查询商品详情页面
    console.log('shop-details-all');
});

myApp.onPageInit('update-nikename', function (page) {
    console.log('update-nikename');

    $('.update-nikename .right').on('touchstart', function (e) {
        $('#pro-nikename').val($('.set-nikename').val());
        mainView.router.back();
    });

    $('.update-nikename .delete').on('touchstart', function () {
        $('.update-nikename .set-nikename').val('');
    });

});

myApp.onPageInit('pro-info', function (page) { //查询商品详情页面

    var _sex_value = $('#picker-sex').val(),
        _birthday_value = $('#picker-birthday').val();

    var pickerSex = myApp.picker({
        input: '#picker-sex',
        rotateEffect: true,
        value: [_sex_value],
        toolbarTemplate:
        '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="left">' +
        '<a href="#" class="link toolbar-cancel">取消</a>' +
        '</div>' +
        '<div class="right">' +
        '<a href="#" class="link close-picker">确定</a>' +
        '</div>' +
        '</div>' +
        '</div>',
        cols: [
            {
                textAlign: 'center',
                values: ['男', '女', '保密']
            }
        ],
        onOpen: function (picker) {
            picker.container.find('.toolbar-cancel').on('touchstart', function () {
                $('.pro-info #picker-sex').val(_sex_value);
                picker.close();
            });
        }
    });

    var pickerBirthday = myApp.picker({
        input: '#picker-birthday',
        rotateEffect: true,
        value: [_birthday_value.substr(0, 4), _birthday_value.substr(5, 2), _birthday_value.substr(8, 2)],
        toolbarTemplate:
        '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="left">' +
        '<a href="#" class="link toolbar-cancel">取消</a>' +
        '</div>' +
        '<div class="right">' +
        '<a href="#" class="link close-picker">确定</a>' +
        '</div>' +
        '</div>' +
        '</div>',
        formatValue: function (p, values, displayValues) {
            return values[0] + '-' + values[1] + '-' + values[2];
        },
        cols: [
            // 年份
            {
                textAlign: 'center',
                values: (function () {
                    var arr = [];
                    for (var i = 1980; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            {
                divider: true,
                content: '-'
            },
            // 月份
            {
                textAlign: 'center',
                values: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
            },
            {
                divider: true,
                content: '-'
            },
            // 天数
            {
                textAlign: 'center',
                values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            }
        ],
        onOpen: function (picker) { // 取消时还原值
            picker.container.find('.toolbar-cancel').on('touchstart', function () {
                $('.pro-info #picker-birthday').val(_birthday_value);
                picker.close();
            });
        }
    });

});

myApp.onPageInit('shop-details-page', function (page) {

    console.log("shop-details-page");

    $$(document).on('touchstart', '.shop-details-page .create-picker', function (e) {
        myApp.pickerModal('.picker-service-description')
    });

    $$(document).on('touchstart', '.shop-details-page .pull-up', function (e) { // 上滑打开page
        var touch = e.changedTouches[0],
            startY = touch.pageY;
        $$(this).on('touchmove', function (e) {
            e.preventDefault();
            touch = e.changedTouches[0];
            if (touch.pageY - startY < -10) {
                myApp.popup('.popup-shop-details-page');
            }
        });
        return false;
    });

    new Swiper('.swiper-container.shop-details', {//盈利送金豆幻灯片
        preloadImages: false, // 预加载
        lazyLoading: true, // 延迟加载
        pagination: '.swiper-pagination', //显示页数
        paginationType: 'fraction', // 数字显示
    })

    $('.shop-details-page .choose-role').on('touchstart', function (e) {
        if ($$('.picker-modal.modal-in').length > 0) {
            myApp.closeModal('.picker-modal.modal-in');
        }
        myApp.pickerModal(
            '<div class="picker-modal details-picker">' +
            '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
            '<a href="#" class="close-picker">Close</a>' +
            '</div>' +
            '</div>' +
            '<div class="picker-modal-inner">' +

            '123123123' +

            '</div>' +
            '</div>'
        )
    });

    mainView.hideToolbar();
});

myApp.onPageInit('sing-in', function (page) {//签到页面
    mainView.hideToolbar();
    console.log('sing-in ---- --');
    /* sing-in calender */
    (function () {
        /*
         * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
         */
        var dateObj = (function () {
            var _date = new Date();    // 默认为当前系统时间
            return {
                getDate: function () {
                    return _date;
                },
                setDate: function (date) {
                    _date = date;
                }
            };
        })();

        // 设置calendar div中的html部分
        renderHtml();
        // 表格中显示日期
        showCalendarData();
        // 绑定事件
        bindEvent();

        /**
         * 渲染html结构
         */
        function renderHtml() {
            var calendar = document.getElementById("calendar");
            var titleBox = document.createElement("div");  // 标题盒子 设置上一月 下一月 标题
            var bodyBox = document.createElement("div");  // 表格区 显示数据

            // 设置标题盒子中的html
            titleBox.className = 'calendar-title-box';
            titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
                "<span class='calendar-title' id='calendarTitle'></span>" +
                "<span id='nextMonth' class='next-month'></span>";
            calendar.appendChild(titleBox);    // 添加到calendar div中
            titleBox.style.display = 'none';

            // 设置表格区的html结构
            bodyBox.className = 'calendar-body-box';
            var _headHtml = "<tr>" +
                "<th>日</th>" +
                "<th>一</th>" +
                "<th>二</th>" +
                "<th>三</th>" +
                "<th>四</th>" +
                "<th>五</th>" +
                "<th>六</th>" +
                "</tr>";
            var _bodyHtml = "";

            // 一个月最多31天，所以一个月最多占6行表格
            for (var i = 0; i < 6; i++) {
                _bodyHtml += "<tr>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "<td><span></span><img src='../img/calendar_Check.png'/></td>" +
                    "</tr>";
            }
            bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
                _headHtml + _bodyHtml +
                "</table>";
            // 添加到calendar div中
            calendar.appendChild(bodyBox);
        }

        /**
         * 表格中显示数据，并设置类名
         */
        function showCalendarData() {
            var _year = dateObj.getDate().getFullYear();
            var _month = dateObj.getDate().getMonth() + 1;
            var _dateStr = getDateStr(dateObj.getDate());

            // 设置顶部标题栏中的 年、月信息
            var calendarTitle = document.getElementById("calendarTitle");
            var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4, 2) + "月";
            calendarTitle.innerText = titleStr;

            // 设置表格中的日期数据
            var _table = document.getElementById("calendarTable");
            var _tds = _table.getElementsByTagName("span");
            var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
            for (var i = 0; i < _tds.length; i++) {
                var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
                var _thisDayStr = getDateStr(_thisDay);
                _tds[i].innerText = _thisDay.getDate();
                //_tds[i].data = _thisDayStr;
                _tds[i].setAttribute('data', _thisDayStr);
                if (_thisDayStr == getDateStr(new Date())) {    // 当前天
                    _tds[i].className = 'currentDay';
                } else if (_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
                    _tds[i].className = 'currentMonth';  // 当前月
                } else {    // 其他月
                    _tds[i].className = 'otherMonth';
                }
            }
        }

        /**
         * 绑定上个月下个月事件
         */
        function bindEvent() {
            var prevMonth = document.getElementById("prevMonth");
            var nextMonth = document.getElementById("nextMonth");
            addEvent(prevMonth, 'touchstart', toPrevMonth);
            addEvent(nextMonth, 'touchstart', toNextMonth);
        }

        /**
         * 绑定事件
         */
        function addEvent(dom, eType, func) {
            if (dom.addEventListener) {  // DOM 2.0
                dom.addEventListener(eType, function (e) {
                    func(e);
                });
            } else if (dom.attachEvent) {  // IE5+
                dom.attachEvent('on' + eType, function (e) {
                    func(e);
                });
            } else {  // DOM 0
                dom['on' + eType] = function (e) {
                    func(e);
                }
            }
        }

        /**
         * 点击上个月图标触发
         */
        function toPrevMonth() {
            var date = dateObj.getDate();
            dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
            showCalendarData();
        }

        /**
         * 点击下个月图标触发
         */
        function toNextMonth() {
            var date = dateObj.getDate();
            dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
            showCalendarData();
        }

        /**
         * 日期转化为字符串， 4位年+2位月+2位日
         */
        function getDateStr(date) {
            var _year = date.getFullYear();
            var _month = date.getMonth() + 1;    // 月从0开始计数
            var _d = date.getDate();

            _month = (_month > 9) ? ("" + _month) : ("0" + _month);
            _d = (_d > 9) ? ("" + _d) : ("0" + _d);
            return _year + _month + _d;
        }
    })();

});

// myApp.onPageInit('login', function (page) { //登陆页面
//     console.log('login');
// });

myApp.onPageInit('invite-friends', function (page) { //邀请好友
    console.log('invite-friends');
    mainView.hideToolbar();


    $('.invite-friends .confirm-shared-qrcode').on('touchstart', function (e) {
        layer.open({
            style: 'border:none;',
            content: '<div style="padding: .15rem .15rem;">\
                          <span style="font-size: .18rem; color: #333;">二维码邀请</span>\
                          <img src="../img/invitation_erweima.png" style="width: 100%;">\
                      </div>'
        })
    });

    $('.invite-friends .right svg.icon').on('touchstart', function () {
        layer.open({
            style: 'border:none;',
            content: '<div style="position: relative; padding: .15rem;">\
                          <img src="../img/invitation_window_bg.png" style="width: 100%;">\
                          <div style="position: absolute; top: .7rem; left:0;  margin: .15rem; height: 2.3rem; overflow-y: scroll;">\
                            <span style="text-indent: 30px;display: block;text-align: left;">\
                            1、优惠券使用于在360商城注册的个人用户（以下简称”用户“）为个人消费而发生购买行为时使用，不适用于团体购买、去也顾客购买、批发及其他非以个人消费为目的的购买行为\
                            </span>\
                            <span style="text-indent: 30px;display: block;text-align: left;">\
                            1、优惠券使用于在360商城注册的个人用户（以下简称”用户“）为个人消费而发生购买行为时使用，不适用于团体购买、去也顾客购买、批发及其他非以个人消费为目的的购买行为\
                            </span>\
                          </div>\
                      </div>'
        })
    });

    $(".invite-friends .confirm-shared-link").on('touchstart', function () {
        layer.open({
            style: 'position: absolute;left: 0;bottom: 0; border: none; width: 100%; border-radius: 0; background: #fff;',
            content: '<div class="invite-friends shared_friend_container">\
                          <div class="wrap">\
                              <div></div>\
                              <span class="title">分享到</span>\
                              <svg class="icon close_shared_friend" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-Share_close"></use>\
                              </svg>\
                          </div>\
                          <ul>\
                            <li>\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_qqspace"></use>\
                                </svg>\
                                <p>QQ空间</p>\
                            </li>\
                            <li>\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_weixin"></use>\
                                </svg>\
                                <p>微信好友</p></li>\
                            <li>\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_pengyq"></use>\
                                </svg>\
                                <p>微信朋友圈</p></li>\
                            <li>\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_weibo"></use>\
                                </svg>\
                                <p>新浪微博</p></li>\
                          </ul>\
                      </div>',
        });
    });

    $(document).on('touchstart', function (e) {
        if (e.target.className instanceof Object && e.target.className.baseVal == "icon close_shared_friend active-state") {
            layer.closeAll();
            mainView.showToolbar();
        }
    });

});

myApp.onPageInit('set-pay-pwd', function (page) { //登陆页面
    console.log('set-pay-pwd');

    var payPassword = $("#payPassword_container"),
        _this = payPassword.find('i'),
        k = 0, j = 0,
        password = '',
        _cardwrap = $('#cardwrap');
    //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
    payPassword.on('focus', "input[name='payPassword_rsainput']", function () {

        var _this = payPassword.find('i');
        if (payPassword.attr('data-busy') === '0') {
            //在第一个密码框中添加光标样式
            _this.eq(k).addClass("active");
            _cardwrap.css('visibility', 'visible');
            payPassword.attr('data-busy', '1');
        }

    });
    //change时去除输入框的高亮，用户再次输入密码时需再次点击
    payPassword.on('change', "input[name='payPassword_rsainput']", function () {
        _cardwrap.css('visibility', 'hidden');
        _this.eq(k).removeClass("active");
        payPassword.attr('data-busy', '0');
    }).on('blur', "input[name='payPassword_rsainput']", function () {
        _cardwrap.css('visibility', 'hidden');
        _this.eq(k).removeClass("active");
        payPassword.attr('data-busy', '0');
    });

    //使用keyup事件，绑定键盘上的数字按键和backspace按键
    payPassword.on('keyup', "input[name='payPassword_rsainput']", function (e) {
        var e = (e) ? e : window.event;
        //键盘上的数字键按下才可以输入
        if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            k = this.value.length;//输入框里面的密码长度
            l = _this.length;//6
            for (; l--;) {
                //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
                if (l === k) {
                    _this.eq(l).addClass("active");
                    _this.eq(l).find('b').css('visibility', 'hidden');
                } else {
                    _this.eq(l).removeClass("active");
                    _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');
                }

                if (k === 6) {
                    j = 5;
                } else {
                    j = k;
                }
                // $('#cardwrap').css('left', j * 30 + 'px');
            }
        } else {
            //输入其他字符，直接清空
            var _val = this.value;
            this.value = _val.replace(/\D/g, '');
        }
    });

    $('.set-pay-pwd .confirm-next').on('touchstart', function (e) {
        console.log($('.i-text').val());
    });

});

myApp.onPageInit('me-bank-card', function (page) { //我的银行卡
    console.log('me-bank-card');
    mainView.hideToolbar();
});


myApp.onPageInit('view-invite-friends', function (page) { //查看我邀请的还有
    console.log('view-invite-friends');
    mainView.hideToolbar();
});

myApp.onPageInit('me-shipping-address', function (page) { //我的收货地址
    console.log('me-shipping-address');
    console.log(window.location.href);
    mainView.hideToolbar();
});

myApp.onPageInit('order-details', function (page) { //订单详情
    console.log('order-details');
    mainView.hideToolbar();
});

myApp.onPageInit('collection', function (page) { //收藏
    console.log('collection');
    $(".collection .center span").on('touchstart', function (e) {
        var _index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $($(this).closest('.page-content').find('.container .wrap')[_index]).show().siblings().hide();
    });
});



myApp.onPageInit('update-pwd', function (page) { //修改密码
    console.log('update-pwd');
    mainView.hideToolbar();

    $(".update-pwd svg.icon").on("touchstart", function () {
        var _this = $(this);
        var icon_val = _this.find('use').attr("xlink:href");
        if (icon_val == "#jd-eye_close") {
            _this.parent().find('input').attr("type", "text");
            _this.find('use').attr("xlink:href", "#jd-eye_open");
        } else if (icon_val == "#jd-eye_open") {
            _this.parent().find('input').attr("type", "password");
            _this.find('use').attr("xlink:href", "#jd-eye_close");
        }
    });

});

myApp.onPageInit('me', function (page) { //我的个人中心面板
    console.log('me');
    $('.me .shared-silver-bean').on('touchstart', function () {
        mainView.hideToolbar();
        layer.open({
            style: 'position: absolute;left: 0;bottom: 0; border: none; width: 100%; border-radius: 0;    background: #fff;',
            content: '<div class="me shared_friend_container">\
                          <div class="wrap">\
                              <div></div>\
                              <span class="title">分享到</span>\
                              <svg class="icon close_shared_friend" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-Share_close"></use>\
                              </svg>\
                          </div>\
                          <ul>\
                            <li class="shared_qqkj">\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_qqspace"></use>\
                                </svg>\
                                <p>QQ空间</p>\
                            </li>\
                            <li class="shared_wxhy">\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_weixin"></use>\
                                </svg>\
                                <p>微信好友</p></li>\
                            <li class="shared_wxpyq">\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_pengyq"></use>\
                                </svg>\
                                <p>微信朋友圈</p></li>\
                            <li class="shared_xlwb">\
                                <svg style="float: right;" class="icon" aria-hidden="true">\
                                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#jd-share_weibo"></use>\
                                </svg>\
                                <p>新浪微博</p></li>\
                          </ul>\
                      </div>',
        });
    });

    $(document).on('touchstart', '.close_shared_friend', function (e) {
        layer.closeAll();
        mainView.showToolbar();
    });

    $(document).on('touchstart', '.shared_qqkj', function (e) {
        console.log('shared_qqkj');
        layer.closeAll();
        mainView.showToolbar();
        setTimeout(function () {
            layer.open({
                style: '',
                content: '<img src="../img/window_doubg.png" style="display:block; width: 100%;">\
                          <div style="position: absolute;top: 0;height: 3.3483rem;width: 100%;">\
                            <span style="font-size: .18rem; color: #fefefe;display: block;margin-top: 1.4rem ">分享成功,</span>\
                            <span style="display: block;margin-top: .1rem;font-size: .25rem; color: #fff;">奖励<i style="font-style: normal;color: #ffe13e;">10</i>银豆！</span>\
                            <img src="../img/window_button_clik.png" style="width: 1.85rem;margin-top: .4rem;">\
                            <span style="font-size: .2rem; color: #c7561e;font-weight: bold;position: absolute;display: block;width: 100%;left: 0;top: 2.47rem;">确定</span>\
                          </div>'
            });
        }, 300);
    });

    $(document).on('touchstart', '.shared_wxhy', function (e) {
        console.log('shared_wxhy');

        layer.closeAll();
        mainView.showToolbar();
    });

    $(document).on('touchstart', '.shared_wxpyq', function (e) {
        console.log('shared_wxpyq');

        layer.closeAll();
        mainView.showToolbar();
    });

    $(document).on('touchstart', '.shared_xlwb', function (e) {
        console.log('shared_xlwb');

        layer.closeAll();
        mainView.showToolbar();
    });

});


myApp.onPageInit('refund-details', function (page) { //退款详情
    console.log('refund-details');

    $('.refund-details .confirm-next').on('touchstart', function (e) {
        myApp.modal({
            title: '',
            text: '<div style="display: flex; align-items: center; width:100%; height: .3rem;    background: #fff; line-height: .3rem; justify-content: flex-start;">\
                       <div style="width: 40%; font-size: .14rem; color: #666; text-align: left;">退货物流：</div>\
                        <div class="nice-select" name="nice-select">\
                            <input type="text" style="-webkit-appearance: none; width: 100%; border-radius: 0;" name="" value="EMS" placeholder="" border: 0; readonly>\
                            <ul>\
                                <li data-value="1">顺丰快递</li>\
                                <li data-value="2">中通快递</li>\
                                <li data-value="3">韵达快递</li>\
                                <li data-value="4">圆通快递</li>\
                            </ul>\
                        </div>\
                   </div>\
                   <div style="display: flex; width:100%; align-items: center; margin-top: .05rem; height: .3rem; line-height: .3rem;">\
                       <div style="width: 40%; font-size: .14rem; color: #666; text-align: left;">物流单号：</div>\
                       <div class="nice-select sha" name="nice-select">\
                           <input style="-webkit-appearance: none; width: 100%; height: .25rem; border: 0; outline: 0; background: none; border-radius: 0;" type="number" name="" value="" placeholder="">\
                       </div>\
                   </div>',
            verticalButtons: true,
            buttons: [
                {
                    text: '确认',
                    onClick: function () {
                        console.log('queren');
                    }
                }
            ]
        })

        $('[name="nice-select"]').click(function (e) {
            // $("body").find('.modal.modal-in').css({
            //     'overflow-y': '',
            // });
            $(this).closest('.modal').eq(0).css({
                "overflow": 'initial',
            });
            $('[name="nice-select"]').find('ul').hide();
            $(this).find('ul').show();
            e.stopPropagation();
        });


        $('[name="nice-select"] li').click(function (e) {
            var val = $(this).text();
            $(this).parents('[name="nice-select"]').find('input').val(val);
            $('[name="nice-select"] ul').hide();
            e.stopPropagation();
        });

        $(document).click(function () {
            $('[name="nice-select"] ul').hide();
        });

    });
    // mainView.hideToolbar();
});

myApp.onPageInit('me-all-order', function (page) { //我的全部订单
    console.log('me-all-order');
    $(document).ready(function () {
        setTimeout(function () {
            $('.me-all-order .buttons-row a').eq(JindouTools.getlstorage('me-all-order-tab')).click();
        }, 100); // 默认打开标签页

        $('.me-all-order .buttons-row a').each(function (i, e) { // 记住标签页状态
            $(e).on('click', function () {
                $('.me-all-order .buttons-row a').removeClass('active');
                $(e).addClass('active');
                $('.me-all-order .tabs .tab').hide();
                $('.me-all-order .tabs .tab').eq(i).show();

                JindouTools.setlstorage('me-all-order-tab', $(e).data('tab'));
            });
        });

        $('.me-all-order #tab4 .confirm-receipt').each(function (i, e) {
            var order_number = '12345566778';
            $(e).on('touchstart', function (e) {
                myApp.modal({
                    title: '确认收货',
                    text: '订单' + order_number + '确认收货',
                    buttons: [{
                        text: '取消',
                        onClick: function () {
                            console.log('取消');
                        }
                    }, {
                        text: '确认',
                        onClick: function () {
                            mainView.router.loadPage('confirm-get-success.html');
                        }
                    }]
                });
            });
        });

    });

});

$$(document).on('touchstart', '.me-bank-card2 .back', function (page) { //我的银行卡
    console.log('me-bank-card2');
    $('.toolbar.row.index').fadeOut("slow");
});

$$(document).on('touchstart', '.me-bank-card .back', function (page) { //我的银行卡
    console.log('me-bank-card1');
    $('.toolbar.row.index').fadeIn("slow");
});

$$(document).on('touchstart', '.me-add-card .back', function (page) { //我的银行卡
    console.log('me-add-card');
    $('.toolbar.row.index').fadeOut("slow");
});

console.log(myApp.device.os);
