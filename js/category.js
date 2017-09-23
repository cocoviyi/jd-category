/**
 * Created by ping on 2017/7/7.
 */
window.onload = function () {
//左侧滑动
    leftSwipe();
// 右侧滑动
    rightSwipe();
};
//左边  滑动
var leftSwipe = function () {
//原生实现
//1、滑动起来
    var parentBox = document.querySelector('.jd_cateLeft');
    var childBox = parentBox.querySelector('ul');

    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;

//    可定位的区间
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;

//    可滑动区间
    var distance = 100;
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;
//    公用方法
//    加过渡
    var addTransition = function () {
        childBox.style.transition = 'all 0.2s';
        childBox.style.webkitTransition = 'all 0.2s';
    };
//   去过渡
    var removeTrasition = function () {
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    };
//    做定位
    var setTranslateY = function (translateY) {
        childBox.style.transform = 'translateY(' + translateY + 'px)';
        childBox.style.webkitTransform = 'translateY(' + translateY + 'px)';
    };
//    程序核心   当前定位
    var currentY = 0;
//    滑动
    var startY = 0;
    var distanceY = 0;
    var isMove = false;
    childBox.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    })
    childBox.addEventListener('touchmove', function (e) {
        var moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //console.log(distanceY);
        removeTrasition();
        //    计算定位  程序的核心索引----当前定位
        //    需要基于之前定位   来计算当前的定位
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            setTranslateY(currentY + distanceY);
        }
        isMove = true;
    })
    childBox.addEventListener('touchend', function (e) {
        if (isMove) {
            //    滑动的位置  比 运行你定位的位子  要小的时候
            if ((currentY + distanceY) < minPosition) {
                currentY = minPosition;
                addTransition();
                setTranslateY(currentY);
                //    滑动的位置 比 运行比定位的位子  要大的时候
            } else if ((currentY + distanceY) > maxPosition) {
                currentY = maxPosition;
                addTransition();
                setTranslateY(currentY);
            } else {
                //记录当前定位
                currentY = currentY + distanceY;
            }
        }
        //    重置
        startY = 0;
        isMove = 0;
        distanceY = 0;

    });
};

//右边滑动
var rightSwipe = function () {
//插件实现  你的子容器的大小一定要大于父容器
    new IScroll('.jd_cateRight', {
        scrollY: false,
        scrollX: true
    })
};