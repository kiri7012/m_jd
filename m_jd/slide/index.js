/**
 * Created by Gary on 2017/6/19.
 */
window.onload = function () {
    slide();
};
function slide() {
    //获得最大盒子
    var slider = document.querySelector(".slider");
    //获取圆点的ul元素
    var ulPoint = slider.querySelector("ul:last-of-type");
    //获取所有小圆点li
    var points = ulPoint.querySelectorAll("li");
    //获取轮播的ul盒子
    var Img = slider.querySelector("ul:first-of-type");
    //获取轮播图片的第一个li元素
    var first = Img.querySelector("li:first-of-type");
    //获取轮播图片的最后一个li元素
    var last = Img.querySelector("li:last-of-type");
    //进行前后克隆
    Img.appendChild(first.cloneNode(true));
    Img.insertBefore(last.cloneNode(true), first);
    //获取所有轮播图中的图片li元素
    var ImgLis = Img.querySelectorAll("li");
    console.log(ImgLis.length);
    //获取父盒子的宽度
    var sliderW = slider.offsetWidth;
    Img.style.width = sliderW * ImgLis.length + 'px';
    Img.style.left = -sliderW + 'px';
    for (var i = 0; i < ImgLis.length; i++) {
        ImgLis[i].style.width = sliderW + 'px';
    }
    var index = 1 ;
    window.onresize = function () {
        sliderW = slider.offsetWidth;
        console.log(sliderW);
        Img.style.width = sliderW * ImgLis.length + 'px';
        Img.style.left = -sliderW + 'px';
        for (var i = 0; i < ImgLis.length; i++) {
            ImgLis[i].style.width = sliderW + 'px';
        }
    };
//    开始轮播
    var time ;
//    定时器的函数
    function startTime() {
        time = setInterval(function () {
            index ++ ;
            Img.style.transition = "left 0.5s ease-in-out";
            Img.style.left = -index * sliderW + 'px';
        },1000);
    }
//    调用开启定时器
    startTime();
    var num = ImgLis.length - 1;
//    设置小圆点
    function setpoints(index) {
        for(var i=0;i<points.length;i++){
            points[i].classList.remove("active");
        }
        points[index-1].classList.add('active');
    }
//    实现手动轮播
    var startX,endX,distanceX;
    var flag = true;
    Img.addEventListener("touchstart",function (e) {
        clearInterval(time);
        // console.log(e.targetTouches[0].clientX);
        startX = e.targetTouches[0].clientX;
    });
    Img.addEventListener("touchmove",function (e) {
        // console.log(e.targetTouches[0].clientX);
        if(flag == true){
            endX = e.targetTouches[0].clientX;
            distanceX = endX - startX;
            this.style.transition = "none";
            this.style.left = -index*sliderW + distanceX +'px';
        }

    });
    Img.addEventListener("touchend",function (e) {
        flag=false;
        if(Math.abs(distanceX) > 100){
            if(distanceX > 0 ){
                index--;
            }else {
                index ++;
            }
            console.log(100);
            this.style.transition = "left 0.5s ease-in-out";
            this.style.left = (-index * sliderW)+ 'px';
        }else if(Math.abs(distanceX) < 100) {
            this.style.transition = "left 0.5s ease-in-out";
            this.style.left = (-index * sliderW)+ 'px';
        }
        startX = 0 ;
        endX = 0 ;
        distanceX = 0;
        startTime();
    });
    Img.addEventListener("transitionend",function(){
        if(index == num) {
            index = 1;
            this.style.transition = "none";
            this.style.left = (-index * sliderW)+ 'px';
        }else if(index == 0){
            index = num - 1 ;
            this.style.transition = "none";
            this.style.left = (-index * sliderW)+ 'px';
        }
        // console.log(index);
        setpoints(index);
        flag = true;
    })

};