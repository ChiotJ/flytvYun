/**
 * Created by jian_ on 2016/4/24.
 */
!function (window, document) {
    window.adInit = function (callback, time) {
        if (!time) {
            time = 4;
        } else {
            time--;
        }

        $("#ad-BootPage-timepiece").html(time);

        var hideAdInterval = setInterval(function () {
            if (time > 0) {
                $("#ad-BootPage-timepiece").html(time--);
            } else {
                clearTimeout(hideAdInterval);
                $("#ad-BootPage").css("opacity", "0");
                callback();
            }
        }, 1000);
    };
}(window, document);