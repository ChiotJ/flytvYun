/**
 * Created by jian_ on 2016/4/24.
 */
!function (window, document) {
    var timepieceNum = function (time, callback) {
        $("#ad-BootPage-timepiece-num").html(time);

        var hideAdInterval = setInterval(function () {
            if (time > 1) {
                $("#ad-BootPage-timepiece-num").html(--time);
            } else {
                clearInterval(hideAdInterval);
                $("#ad-BootPage").css("opacity", "0");
                callback();
            }
        }, 1000);
    };

    var timepieceRing = function (time, callback) {
        var $ = function (id) {
            return document.getElementById(id);
        };
        var o = {
            num: $("ad-BootPage-timepiece-ring-num"),
            left: $("ad-BootPage-timepiece-ring-left"),
            right: $("ad-BootPage-timepiece-ring-right")
        };

        var f = {
            css: function (o, key) {
                return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
            },
            zero: function (n, top) {
                n = parseInt(n, 10), top = top || "0";
                if (n > 0) {
                    return String(n);
                } else {
                    return top.toString();
                }
            },
            angle: function (v, total) {
                var scale = v / total, offsetx = 0, offsety = 0, an;
                var angle = scale * 360; //当前角度值
                //IE矩阵角度值计算
                var m11 = Math.cos(Math.PI * 2 / 360 * angle);
                var m21 = Math.sin(Math.PI * 2 / 360 * angle);
                if (angle > 90) {
                    an = angle - 90;
                } else {
                    an = angle;
                }
                offsety = offsetx = (90 - 90 * Math.sqrt(2) * Math.cos(Math.PI / 180 * Math.abs(an - 45))) / 2;
                return {
                    trans: "rotate(" + angle + "deg)",
                    ie: "progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=-" + m21 + ",M21=" + m21 + ",M22=" + m11 + ",SizingMethod='auto expand',FilterType='nearest neighbor')",
                    offset: {
                        x: offsetx,
                        y: offsety
                    }
                };
            },
            cartoon: function (l, r, v, part) {
                var total = part * 2, angleV, anglePart;
                if (v <= part && v > 0) {
                    angleV = f.angle(v, total);
                    l.style.display = "block";
                    l.style.filter = angleV.ie;
                    l.style.MozTransform = l.style.WebkitTransform = l.style.transform = angleV.trans;
                    r.style.display = "none";
                    //ie 旋转非居中旋转的修复
                    if (document.all) {
                        l.style.left = angleV.offset.x + "px";
                        l.style.top = angleV.offset.y + "px";
                    }
                } else {
                    v = Math.abs(v - part);
                    angleV = f.angle(v, total);
                    anglePart = f.angle(part, total);
                    l.style.display = "block";
                    l.style.filter = anglePart.ie;
                    l.style.MozTransform = l.style.WebkitTransform = l.style.transform = anglePart.trans;
                    r.style.display = "block";
                    r.style.filter = angleV.ie;
                    r.style.MozTransform = r.style.WebkitTransform = r.style.transform = angleV.trans;
                    if (document.all) {
                        r.style.left = angleV.offset.x + "px";
                        r.style.top = angleV.offset.x + "px";
                    }
                }
            },
            ui: function () {
                var part = time / 2;
                var i = 1;
                o.num.innerHTML = f.zero(time);
                f.cartoon(o.left, o.right, 1, part);
                var hideAdInterval = setInterval(function () {
                    if (i < time) {
                        o.num.innerHTML = f.zero(time - i);
                        f.cartoon(o.left, o.right, ++i, part);
                    } else {
                        o.num.innerHTML = 0;
                        clearInterval(hideAdInterval);
                        $("ad-BootPage").style.opacity = 0;
                        callback();
                    }
                }, 1000);
            }
        };
        f.ui();
    };

    var keyListener = function () {
        GHSMLib.keyCon.keyListener({
            id: "ad-BootPage",
            enter: function (item) {
                window.location.href = "http://172.16.188.26/web/family/pages/familyCard/index.html";
                return false;
            },
            esc: function () {
                return false;
            },
            back: function () {
                return false;
            }
        });
    };
    window.adInit = function (option, callback) {
        $("#ad-BootPage").attr("tabindex", "-1").focus();

        keyListener();

        var time = 5;
        if (option.time) {
            time = option.time;
        }

        if (option.type) {
            switch (option.type.toLowerCase()) {
                case "num":
                    timepieceNum(time, callback);
                    break;
                case "ring":
                    timepieceRing(time, callback);
                    break;
            }
        }
    };
}(window, document);