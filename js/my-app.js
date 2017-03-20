(function (doc, win) { // 全局rem
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'; // 以iphone 6为标准计算rem
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

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

    $$(".search-index").on('keydown', function (e) {// 首页查询
        if (e.keyCode == 13) {
            console.log('index');
            mainView.router.loadPage('search-shop.html');
        }
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

});

myApp.onPageInit('profit-give-bean', function (e) {// 盈利送金豆page

    // 以这个为准
    $(function () {
        JindouTools._layer($$('.shop-items .shop-item'));
    });

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
    JindouTools._layer($$('.layer'));

});



myApp.onPageInit('shop-details-all', function (page) { //查询商品详情页面
    console.log('shop-details-all');
    JindouTools._layer($$('.layer'));
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

    // eval(function (p, a, c, k, e, r) { e = function (c) { return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if ('0'.replace(0, e) == 0) { while (c--) r[e(c)] = k[c]; k = [function (e) { return r[e] || e }]; e = function () { return '([3578a-df-hj-zA-Z]|1\\w)' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('(8(){3 c=(8(){3 D=j k();E{d:8(){E D},F:8(a){D=a}}})();P();r();Q();8 P(){3 f=g.n(\'#f\'),o=g.R(\'S\'),G=g.R(\'S\');o.s=\'f-T-box\';o.U="<l t=\'prev-V\' u=\'v\'></l><l t=\'f-T\' u=\'w\'></l><l u=\'x\' t=\'next-V\'></l>";f.W(o);o.style=\'display: none;\';3 X="<y><7>日</7><7>一</7><7>二</7><7>三</7><7>四</7><7>五</7><7>六</7></y>";3 H="";Y(3 i=0;i<6;i++){H+="<y><5>1</5><5>1</5><5>1</5><5>1</5><5>1</5><5>1</5><5>1</5></y>"}G.U="<I u=\'Z\' t=\'f-I\'>"+X+H+"</I>";f.W(G)}8 r(){3 p=c.d().z(),b=c.d().A()+1,J=q(c.d());3 w=g.n("#w");3 10=J.B(0,4)+"年"+J.B(4,2)+"月";w.11=10;3 12=g.n("#Z");3 h=12.getElementsByTagName("5");3 K=j k(p,b-1,1);Y(3 i=0;i<h.length;i++){3 L=j k(p,b-1,i+1-K.getDay());3 C=q(L);h[i].11=L.d();h[i].setAttribute(\'data\',C);M(C==q(j k())){h[i].s=\'currentDay\'}13 M(C.B(0,6)==q(K).B(0,6)){h[i].s=\'currentMonth\'}13{h[i].s=\'otherMonth\'}}}8 Q(){3 v=g.n("#v");3 x=g.n("#x");N(v,\'14\',15);N(x,\'14\',16)}8 N(O,17,18){M(O.19){O.19(17,8(e){18(e)})}}8 15(){3 a=c.d();c.F(j k(a.z(),a.A()-1,1));r()}8 16(){3 a=c.d();c.F(j k(a.z(),a.A()+1,1));r()}8 q(a){3 p=a.z(),b=a.A()+1,m=a.d();b=(b>9)?(""+b):("0"+b);m=(m>9)?(""+m):("0"+m);E p+b+m}})();', [], 72, '|||var||td||th|function||date|_month|dateObj|getDate||calendar|document|_tds||new|Date|span|_d|querySelector|titleBox|_year|getDateStr|showCalendarData|className|class|id|prevMonth|calendarTitle|nextMonth|tr|getFullYear|getMonth|substr|_thisDayStr|_date|return|setDate|bodyBox|_bodyHtml|table|_dateStr|_firstDay|_thisDay|if|addEvent|dom|renderHtml|bindEvent|createElement|div|title|innerHTML|month|appendChild|_headHtml|for|calendarTable|titleStr|innerText|_table|else|click|toPrevMonth|toNextMonth|eType|func|addEventListener'.split('|'), 0, {}))
});

myApp.onPageInit('login', function (page) { //登陆页面
    console.log('login');
});

myApp.onPageInit('me-bank-card', function (page) { //我的银行卡
    console.log('me-bank-card');
    mainView.hideToolbar();

});

console.log(myApp.device.os);