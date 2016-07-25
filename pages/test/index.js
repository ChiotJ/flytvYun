/**
 * Created by jian_ on 2016/1/30.
 */
!function (window, document) {
    var init = function () {
        $("#pageBody").focus();
        pageBody.keyListener();
        lis();
        appList.getList();
        timeoutReload();
    };

    GHSMLib.getUserInfo(function (data, err) {
        if (typeof err !== "undefined") {
            console.log(err);
        } else {
            console.log(data);

            $("#name").html(data.name);
            $("#phone").html(data.phone);
            if (data.streetName)
                $("#street").html(data.streetName);
            if (typeof data.community === "object") {
                $("#community").html(data.community.name);
            }
        }

    });

    var timeoutReload = function () {
        var timeManage = function (time) {
            var s = time % 60;
            var S = s + "秒";
            if (s < 10) {
                S = "0" + S;
            }
            var m = (time - s) / 60;
            var M = m % 60 + "分";
            if (m < 10) {
                M = "0" + M;
            }
            var h = (m - (m % 60)) / 60;
            var H = h + "时";
            return H + M + S;
        };
        var time = 0;
        setInterval(function () {
            time++;
            $("#time").html(timeManage(time));
        }, 1000);
    };


    var lis = function () {
        if (typeof CyberCloud !== "undefined") {
            document.getElementById("ca").innerHTML = CyberCloud.GetParam("CardID").ParamValue;
            document.getElementById("stb").innerHTML = CyberCloud.GetParam("UserCode").ParamValue;
            document.getElementById("ip").innerHTML = CyberCloud.GetParam("TerminalIP").ParamValue;
        }
        document.getElementById("search").innerHTML = window.location.href;
        document.onkeydown = function (e) {
            document.getElementById("key").innerHTML = e.keyCode;
            if (e && e.keyCode == 8) {
                return false;
            }
        }
    };

    var pageBody = {
        keyListener: function () {
            GHSMLib.keyCon.keyListener({
                id: "pageBody",
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

    var appList = {
        testList: [],
        publishList: [],
        appListDot: doT.template($('#appListDot').text()),
        getList: function () {
            var self = this;
            $.getJSON("../../data/json/testList.json", function (json) {
                if (json.status == 1) {
                    var list = json.list;
                    for (var key in list) {
                        var app = list[key];
                        if (app.link) {
                            if (app.link.test) {
                                var a = {
                                    name: app.name,
                                    url: app.link.test
                                };
                                self.testList.push(a);
                            }
                            if (app.link.publish) {
                                var b = {
                                    name: app.name,
                                    url: app.link.publish
                                };
                                self.publishList.push(b);
                            }
                        }
                    }

                    $("#testList").html(self.appListDot(self.testList));
                    $("#publishList").html(self.appListDot(self.publishList));
                    if (self.testList.length > 0) {
                        $($("#testList").find("li")[0]).focus();
                    } else if (self.publishList.length > 0) {
                        $($("#publishList").find("li")[0]).focus();
                    } else {
                        $("#pageBody").focus();
                    }

                    appList.keyListener();

                }
            })
        },
        keyListener: function () {
            var self = this;
            GHSMLib.keyCon.listKeyListener({
                id: "testList",
                columnNum: 5,
                label: "li",
                enter: function (item) {
                    var idx = $(item).index();
                    window.location.href = self.testList[idx].url;
                },
                down: {
                    before: function (item) {
                        var idx = $(item).index();
                        if (idx > self.testList.length - 6) {
                            if (self.publishList.length > 0) {
                                GHSMLib.keyCon.focus("publishList");
                                return false;
                            }
                        }

                    }
                },
                esc: function () {
                    self.exit();
                    return false;
                },
                back: function () {
                    return false;
                }
            });
            GHSMLib.keyCon.listKeyListener({
                id: "publishList",
                columnNum: 5,
                label: "li",
                enter: function (item) {
                    var idx = $(item).index();
                    window.location.href = self.publishList[idx].url;
                },
                up: {
                    before: function (item) {
                        var idx = $(item).index();
                        if (idx < 5) {
                            if (self.testList.length > 0) {
                                GHSMLib.keyCon.focus("testList");
                                return false;
                            }
                        }
                    }
                },
                esc: function () {
                    self.exit();
                    return false;
                },
                back: function () {
                    return false;
                }
            });
        },
        exit: function () {
            if ($("#key").html() == "27") {
                if (typeof CyberCloud != "undefined") {
                    CyberCloud.ExitApp();
                }
            }
        }
    };

    init();
}(window, document);