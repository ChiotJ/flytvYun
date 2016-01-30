/**
 * Created by jian_ on 2016/1/30.
 */
!function (window, document) {
    var init = function () {
        $("#pageBody").focus();
        pageBody.keyListener();
        lis();
        appList.getList();
    };

    var lis = function () {
        if (typeof CyberCloud !== "undefined") {
            document.getElementById("ca").innerHTML = CyberCloud.GetParam("CardID").ParamValue;
            document.getElementById("stb").innerHTML = CyberCloud.GetParam("UserCode").ParamValue;
        }
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
                                $($("#publishList").find("li")[0]).focus();
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
                                $($("#testList").find("li")[0]).focus();
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