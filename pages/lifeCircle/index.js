/**
 * Created by jian_ on 2016/1/26.
 */
!function (window, document) {
    var init = function () {
        $("#pageBody").focus();
        GHSMLib.getUserInfo(function (user) {
            appList.init(user);
        });

        window.onload = function () {
            cloud.fly();
        };
        pageBody.keyListener();
        sessionStorage.setItem("flytvYunFrom", window.location.href);

        familyCard.init();
    };

    var pageBody = {
        keyListener: function () {
            GHSMLib.keyCon.keyListener({
                id: "pageBody",
                back: function () {
                    GHSMLib.ExitApp();
                    return false;
                }
            });
        }
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
        keyDown: "",
        init: function (user) {
            this.getDate(user);
        },
        getDate: function (user) {
            var self = this;
            $.getJSON("../../data/json/lifeCircle.json", function (json) {
                if (json.status == 1) {
                    if (json.default) {
                        self.default = json.default;
                    }
                    var list = json.list;
                    var idx = 0;
                    for (var key in list) {
                        var area = list[key].area;
                        if (area) {
                            var show = false;
                            if (user.street) {
                                for (var a in area) {
                                    if (user.street == area[a]) {
                                        show = true;
                                        break;
                                    }
                                }
                            }
                            if (!show) {
                                if (self.default && list[key].next_default)
                                    self.default = list[key].next_default;
                                list.splice(key, 1);
                            }
                        }
                    }
                    self.data = list;
                    self.ul.html(self.dot(list));
                    if (self.default) {
                        idx = self.getDefault(list)
                    }
                    $("#appList").css("opacity", "1");
                    $(".loding").css("opacity", "0");


                    $(self.ul.find("li")[idx]).focus();
                    self.keyListener();
                }
            })
        },
        getDefault: function (list) {
            var self = this;
            var idx = 0;
            for (var key in list) {
                var id = list[key].id;
                if (id == self.default) {
                    idx = key;
                    if (!list[key].online) {
                        if (list[key].next_default) {
                            self.default = list[key].next_default;
                            idx = self.getDefault(list);
                        }
                    }
                    break;
                }
            }
            return idx;
        },
        keyListener: function () {
            var self = this;
            GHSMLib.keyCon.listKeyListener({
                id: "appList",
                columnNum: 3,
                label: "li",
                down: function () {
                    $("#familyCardLogo").focus();
                },
                enter: function (item) {
                    var idx = $(item).index();
                    var link = self.data[idx].link;
                    var online = self.data[idx].online;

                    if (link && online) {
                        $("#pageBody").focus();
                        $("#appList").css("opacity", "0");
                        $(".loding").css("opacity", "1");
                        setTimeout(function () {
                            if (link == "CyberCloudWeb") {
                                CyberCloud.StartStreamWeb(self.data[idx].CyberCloudId, "", "")
                            } else if (link == "LocalWeb") {
                                if (self.data[idx].name == "歌华云飞视") {
                                    var timestamp = new Date().getTime();
                                    $.getJSON('http://172.16.188.26/web/userBehavior/pv.json?appName=Flytv&cardId=' + GHSMLib.cardId + "&timestamp=" + timestamp);
                                }
                                CyberCloud.StartLocalWeb(self.data[idx].LocalUrl + "?back=" + encodeURIComponent("http://172.16.188.26/web/flytvYun/pages/index/index.html"), "back");
                            } else {
                                window.location.href = link;
                            }
                        }, 1100);

                    }
                },
                back: function () {
                    if (typeof CyberCloud != "undefined") {
                        $("#appList").css("opacity", "0");
                        $(".loding").css("opacity", "1");
                        setTimeout(function () {
                            GHSMLib.ExitApp();
                        }, 1100);
                    }
                    return false;
                }
            });

            document.onkeydown = function (e) {
                if (e && e.keyCode) {
                    if (self.keyDown.length > 20) {
                        self.keyDown = "";
                    }
                    self.keyDown += e.keyCode;
                    if (self.keyDown.indexOf("555354555657") != "-1") {
                        window.location.href = "http://172.16.188.26/web/flytvYun/pages/test/index.html";
                    } else if (self.keyDown.indexOf("4953575451") != "-1") {
                        window.location.href = "http://172.16.188.26/web/flytvYun/pages/statistical/index.html";
                    }

                }
            }
        }
    };


    var familyCard = {
        init: function () {
            this.getQRCode();
            this.keyListener();
        },
        getQRCode: function () {
            $.ajax({
                type: "GET",
                url: "http://172.16.188.26/family/stb/deviceNoEscape?deviceNo=" + GHSMLib.cardId,
                success: function (data) {
                    if (data && data.success) {
                        var escapeDeviceNo = data.result.encryStr;
                        var downloadurl = "http://t.cn/RG8jxjR";
                        var qrurl = "http://172.16.188.13/api/common/Image/qrCode.png?text="
                            + downloadurl + "?stbid=" + escapeDeviceNo + "&size=150";

                        $("#familyCardQRCode").attr("src", qrurl);

                    }
                }, error: function (err) {
                    console.error(err);
                }
            });
        },
        keyListener: function () {
            GHSMLib.keyCon.keyListener({
                id: "familyCardLogo",
                enter: function (item) {
                    window.location.href = "http://172.16.188.26/web/family/pages/familyCard/index.html";
                    return false;
                },
                up: function (item) {
                    $("#appList").find("li")[GHSMLib.keyCon.index["appList"]].focus();
                },
                back: function () {
                    if (typeof CyberCloud != "undefined") {
                        $("#appList").css("opacity", "0");
                        $(".loding").css("opacity", "1");
                        setTimeout(function () {
                            GHSMLib.ExitApp();
                        }, 1100);
                    }
                    return false;
                }
            });
        }
    };

    adInit({
        time: 5,
        type: "ring"
    }, init, function (item) {
        window.location.href = "http://172.16.188.26/web/family/pages/familyCard/index.html";
        return false;
    });
}(window, document);