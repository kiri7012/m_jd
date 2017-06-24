/**
 * Created by Gary on 2017/6/12.
 */
window.onload = function () {
    searchEffect();
    timeback();
    bannerEffect();
};
function searchEffect() {
    var search = document.querySelector(".jd_search");
    var banner = document.querySelector(".jd_banner");

    window.onscroll = function () {
        // console.log(1);页面被卷去的高度
        var scrollTop = document.body.scrollTop;
        var bannerH = banner.offsetHeight;
        // console.log(scrollTop);
        var bil = scrollTop / bannerH;
        if (scrollTop <= bannerH) {
            search.style.backgroundColor = "rgba(233,67,34," + bil + ")"
        }
    }
}
function timeback() {
    var totaltime = 1 * 60 * 60 + 60 + 60;
    // var totaltime = 10;
//    获取展示时间的span
    var spans = document.querySelector(".jd_sk_time").children;
    // console.log(span);

    var time = setInterval(function () {
        totaltime--;
        if (totaltime <= 0) {
            clearInterval(time);
        }
        var hour = Math.floor(totaltime / 3600);
        var Minute = Math.floor(totaltime % 3600 / 60);
        var second = totaltime % 60;
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(Minute / 10);
        spans[4].innerHTML = Math.floor(Minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);


    }, 1000);
}
//轮播图
function bannerEffect() {
    var banner = document.querySelector(".jd_banner");
    var slide = banner.querySelector("ul:first-of-type");
    var point = document.querySelector(".jd_bannerIndicator");
    var points = point.children;
    var first = slide.querySelector("li:first-of-type");
    var last = slide.querySelector("li:last-of-type");
    slide.appendChild(first.cloneNode(true));
    slide.insertBefore(last.cloneNode(true), slide.querySelector("li:first-of-type"));
    var banner = document.querySelector(".jd_banner");
    var bannerW = banner.offsetWidth;
    slide.style.width = bannerW * slide.children.length + 'px';
    for (var i = 0; i < slide.children.length; i++) {
        slide.children[i].style.width = bannerW + 'px';
    }
    //设置默认偏移
    slide.style.left = -bannerW + 'px';
    var index = 1;
    var count = slide.children.length - 1;
    var banner = document.querySelector(".jd_banner");
    var bannerW = banner.offsetWidth;
    window.onresize = function () {
        bannerW = banner.offsetWidth;
        slide.style.width = bannerW * slide.children.length + 'px';
        for (var i = 0; i < slide.children.length; i++) {
            slide.children[i].style.width = bannerW + 'px';
        }
        //设置默认偏移
        slide.style.left = -index * bannerW + 'px';
    };
//    开始轮播
    var time;

    function startTime() {
        time = setInterval(function () {
            index++;
            slide.style.transition = "left 0.5s ease-in-out";
            slide.style.left = (-index * bannerW) + 'px';

        }, 1000);
    }

    startTime();
//    设置小圆点
    function setpoint(index) {
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove("active");

        }
        points[index-1].classList.add("active");
    }

//    实现手动轮播
    var startX, moveX, distanceX;
    /*  slide.onclick = function () {
     console.log(1);
     clearInterval(time);
     }*/
    // console.log(banner);
    // console.log(slide);
    var flag = true;
    slide.addEventListener("touchstart", function (e) {
        /*清除定时器*/
        clearInterval(time);
        /*获取当前手指的起始位置*/
        startX = e.targetTouches[0].clientX;
    });
    slide.addEventListener("touchmove", function (e) {
        if (flag == true) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            this.style.transition = "none";
            this.style.left = -index * bannerW + distanceX + 'px';
        }
    });
    slide.addEventListener("touchend", function (e) {
        flag = false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            this.style.transition = "left 0.5s ease-in-out";
            this.style.left = -index * bannerW + 'px';
        } else if (Math.abs(distanceX) > 0) {
            this.style.transition = "left 0.5s ease-in-out";
            this.style.left = -index * bannerW + 'px';
        }
        //将上一次move所保存的值重置为零

        startX = 0;
        moveX = 0;
        distanceX = 0;
        //重新开启定时器
        startTime();
    });
    slide.addEventListener("transitionend", function () {


        if (index == count) {
            index = 1;
            slide.style.transition = 'none';
            slide.style.left = -index * bannerW + 'px';
        } else if (index == 0) {
            index = count - 1;
            slide.style.transition = 'none';
            slide.style.left = -index * bannerW + 'px';
        }

        console.log(index);

        setpoint(index);
        flag = true;
    });

};