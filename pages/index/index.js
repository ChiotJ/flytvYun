/**
 * Created by jian_ on 2016/1/26.
 */
!function (window, document) {
    var init = function () {
        appList.init();
        window.onload = function () {
            cloud.fly();
        };

    };


    var cloud = {
        fly: function () {
            $("#yun_1").css("left", "110px");
            var yun_1 = function () {
                setTimeout(function () {
                    $("#yun_1").css("left", "40px");
                    setTimeout(function () {
                        $("#yun_1").css("left", "110px");
                    }, 4000);
                }, 4000);
            };
            yun_1();
            setInterval(function () {
                yun_1();
            }, 8000);


            $("#yun_2").css("left", "600px");
            var yun_2 = function () {
                setTimeout(function () {
                    $("#yun_2").css("left", "285px");
                    setTimeout(function () {
                        $("#yun_2").css("left", "600px");
                    }, 30000);
                }, 30000);
            };
            yun_2();
            setInterval(function () {
                yun_2();
            }, 60000);

            $("#yun_3").css("right", "570px");
            var yun_3 = function () {
                setTimeout(function () {
                    $("#yun_3").css("right", "270px");
                    setTimeout(function () {
                        $("#yun_3").css("right", "570px");
                    }, 20000);
                }, 20000);
            };
            yun_3();
            setInterval(function () {
                yun_3();
            }, 40000);


            $("#yun_4").css("right", "105px");
            var yun_4 = function () {
                setTimeout(function () {
                    $("#yun_4").css("right", "40px");
                    setTimeout(function () {
                        $("#yun_4").css("right", "105px");
                    }, 4000);
                }, 4000);
            };
            yun_4();
            setInterval(function () {
                yun_4();
            }, 8000);
        }
    };


    var appList = {
        data: null,
        dot: doT.template($('#appListDot').text()),
        ul: $("#appList"),
        default: 0,
        init: function () {
            this.getDate();
        },
        getDate: function () {
            var self = this;
            $.getJSON("../../data/json/appList.json", function (json) {
                if (json.status == 1) {
                    var list = json.list;
                    self.data = list;
                    self.ul.html(self.dot(list));
                    if (json.default) {
                        self.default = json.default;
                    }

                    $(self.ul.find("li")[self.default]).focus();
                    self.keyListener();
                }
            })
        },
        keyListener: function () {
            var self = this;
            GHSMLib.keyCon.listKeyListener({
                id: "appList",
                columnNum: 3,
                label: "li",
                enter: function (item) {
                    var idx = $(item).index();
                    var link = self.data[idx].link;
                    if (link) {
                        window.location.href = link;
                    }
                },
                esc: function () {
                    if (typeof CyberCloud != "undefined") {
                        CyberCloud.ExitApp();
                    }
                    return false;
                },
                back: function () {
                    return false;
                }
            });
        }
    };

    init();
}(window, document);