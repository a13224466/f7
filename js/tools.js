var JindouTools = {
    setlstorage: function (key, value) {
        localStorage.setItem(key, value);
    },
    getlstorage: function (obj) {
        return localStorage.getItem(obj);
    },
    show_close_pwd: function (ele, event) {
        $(ele).on(event, function () {
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
    },
    code_time_down: function (ele, event, time) {
        $(ele).on(event, function (e) {
            var _time = time,
                _this = $(this);
            _this.addClass('active').val(_time + 'S').attr('disabled', 'true');
            _time = _time - 1;
            var timer = setInterval(function () {
                _this.val(_time-- + 'S');
                if (_time == -1) {
                    clearInterval(timer);
                    _this.removeClass('active').removeAttr('disabled').val('获取验证码');
                }
            }, 1000);
        });
    }
}

JindouTools.show_close_pwd(".forget-passwd svg.icon", "touchstart"); // 查看密码
JindouTools.code_time_down('.verify-code', 'touchstart', 5); // 忘记密码验证码