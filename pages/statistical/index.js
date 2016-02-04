/**
 * Created by jian_ on 2016/1/30.
 */
!function (window, document) {
    var init = function () {
        $("#pageBody").focus();
        pageBody.keyListener();
        appList.keyListener();

        $($("#sList").find("li")[0]).focus();
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
        data: [
            "http://172.16.200.8:5601/app/kibana#/visualize/create?embed&type=histogram&savedSearchId=%E5%BA%94%E7%94%A8&_g=(refreshInterval:(display:'1%20minute',pause:!f,section:2,value:60000),time:(from:now-24h,mode:quick,to:now))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),uiState:(spy:(mode:(fill:!f,name:!n))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:h,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlyTVYun%22))),label:%E4%BA%91%E5%BA%94%E7%94%A8%E9%9B%86%E5%90%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DStreetView%22))),label:%E8%A1%97%E6%99%AF%E5%9C%B0%E5%9B%BE),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLifeCircle%22))),label:%E6%AD%8C%E5%8D%8E%E7%94%9F%E6%B4%BB%E5%9C%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLibrary%22))),label:%E7%94%B5%E8%A7%86%E5%9B%BE%E4%B9%A6%E9%A6%86),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DGuoXue%22))),label:%E5%9B%BD%E5%AD%A6%E8%AF%B5%E8%AF%BB),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlytv%22))),label:%E4%BA%91%E9%A3%9E%E8%A7%86))),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!t,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))",
            "http://172.16.200.8:5601/app/kibana#/visualize/create?embed&type=line&savedSearchId=%E5%BA%94%E7%94%A8&_g=(refreshInterval:(display:'1%20minute',pause:!f,section:2,value:60000),time:(from:now-24h,mode:quick,to:now))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'*'))),label:%E5%85%A8%E9%83%A8%E5%BA%94%E7%94%A8),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlyTVYun%22))),label:%E4%BA%91%E5%BA%94%E7%94%A8%E9%9B%86%E5%90%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DStreetView%22))),label:%E8%A1%97%E6%99%AF%E5%9C%B0%E5%9B%BE),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLifeCircle%22))),label:%E6%AD%8C%E5%8D%8E%E7%94%9F%E6%B4%BB%E5%9C%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLibrary%22))),label:%E7%94%B5%E8%A7%86%E5%9B%BE%E4%B9%A6%E9%A6%86),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DGuoXue%22))),label:%E5%9B%BD%E5%AD%A6%E8%AF%B5%E8%AF%BB),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlytv%22))),label:%E4%BA%91%E9%A3%9E%E8%A7%86))),schema:group,type:filters),(id:'3',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:h,min_doc_count:1),schema:segment,type:date_histogram)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),type:line))",
            "http://172.16.200.8:5601/app/kibana#/visualize/create?embed&type=histogram&savedSearchId=%E5%BA%94%E7%94%A8&_g=(refreshInterval:(display:'1%20minute',pause:!f,section:2,value:60000),time:(from:now-30d,mode:quick,to:now))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),uiState:(spy:(mode:(fill:!f,name:!n))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlyTVYun%22))),label:%E4%BA%91%E5%BA%94%E7%94%A8%E9%9B%86%E5%90%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DStreetView%22))),label:%E8%A1%97%E6%99%AF%E5%9C%B0%E5%9B%BE),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLifeCircle%22))),label:%E6%AD%8C%E5%8D%8E%E7%94%9F%E6%B4%BB%E5%9C%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLibrary%22))),label:%E7%94%B5%E8%A7%86%E5%9B%BE%E4%B9%A6%E9%A6%86),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DGuoXue%22))),label:%E5%9B%BD%E5%AD%A6%E8%AF%B5%E8%AF%BB),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlytv%22))),label:%E4%BA%91%E9%A3%9E%E8%A7%86))),schema:group,type:filters)),listeners:(),params:(addLegend:!t,addTimeMarker:!t,addTooltip:!t,defaultYExtents:!f,mode:stacked,scale:linear,setYExtents:!f,shareYAxis:!t,times:!(),yAxis:()),type:histogram))",
            "http://172.16.200.8:5601/app/kibana#/visualize/create?embed&type=line&savedSearchId=%E5%BA%94%E7%94%A8&_g=(refreshInterval:(display:'1%20minute',pause:!f,section:2,value:60000),time:(from:now-30d,mode:quick,to:now))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),uiState:(),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'2',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'*'))),label:%E5%85%A8%E9%83%A8%E5%BA%94%E7%94%A8),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlyTVYun%22))),label:%E4%BA%91%E5%BA%94%E7%94%A8%E9%9B%86%E5%90%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DStreetView%22))),label:%E8%A1%97%E6%99%AF%E5%9C%B0%E5%9B%BE),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLifeCircle%22))),label:%E6%AD%8C%E5%8D%8E%E7%94%9F%E6%B4%BB%E5%9C%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLibrary%22))),label:%E7%94%B5%E8%A7%86%E5%9B%BE%E4%B9%A6%E9%A6%86),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DGuoXue%22))),label:%E5%9B%BD%E5%AD%A6%E8%AF%B5%E8%AF%BB),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlytv%22))),label:%E4%BA%91%E9%A3%9E%E8%A7%86))),schema:group,type:filters),(id:'3',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1),schema:segment,type:date_histogram)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:9,scale:linear,setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),type:line))",
            "http://172.16.200.8:5601/app/kibana#/visualize/create?embed&type=table&savedSearchId=%E5%BA%94%E7%94%A8&_g=(refreshInterval:(display:'1%20minute',pause:!f,section:2,value:60000),time:(from:now-7d,mode:quick,to:now))&_a=(filters:!(),linked:!t,query:(query_string:(query:'*')),uiState:(spy:(mode:(fill:!f,name:!n))),vis:(aggs:!((id:'1',params:(),schema:metric,type:count),(id:'3',params:(customInterval:'2h',extended_bounds:(),field:'@timestamp',interval:d,min_doc_count:1,row:!f),schema:split,type:date_histogram),(id:'2',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'*'))),label:%E5%85%A8%E9%83%A8%E5%BA%94%E7%94%A8),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlyTVYun%22))),label:%E4%BA%91%E5%BA%94%E7%94%A8%E9%9B%86%E5%90%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DStreetView%22))),label:%E8%A1%97%E6%99%AF%E5%9C%B0%E5%9B%BE),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DLifeCircle%22))),label:%E6%AD%8C%E5%8D%8E%E7%94%9F%E6%B4%BB%E5%9C%88),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DGuoXue%22))),label:%E5%9B%BD%E5%AD%A6%E8%AF%B5%E8%AF%BB),(input:(query:(query_string:(analyze_wildcard:!t,query:%22appName%3DFlytv%22))),label:%E4%BA%91%E9%A3%9E%E8%A7%86))),schema:bucket,type:filters)),listeners:(),params:(perPage:7,showMeticsAtAllLevels:!f,showPartialRows:!f),type:table))"
        ],
        keyListener: function () {
            var self = this;
            $("#st").attr("src", self.data[0]);
            GHSMLib.keyCon.listKeyListener({
                id: "sList",
                columnNum: 4,
                label: "li",
                enter: function (item) {
                    var idx = $(item).index();
                    $("#st").attr("src", "");
                    setTimeout(function () {
                        $("#st").attr("src", self.data[idx]);
                    }, 100);

                },
                esc: function () {
                    self.exit();
                    return false;
                },
                back: function () {
                    window.history.go(-1);
                }
            });
        },
        exit: function () {
            if (typeof CyberCloud != "undefined") {
                CyberCloud.ExitApp();
            }
        }
    };

    init();
}(window, document);