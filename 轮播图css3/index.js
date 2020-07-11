function init() {
    initalCarousel();
    bindEvent();
}
var $img = $('img');
var imgLen = $('img').length;
var wrap = $('.wrapper');
var curDisplay = 0;
var flag = true;
var timer;
var interval = 1500;
var nowIndex = 0;
// 按照索引将
function initalCarousel() {
    var hLen = Math.floor(imgLen / 2);
    var lNum, rNum;
    for (var i = 0; i < hLen; i++) {
        lNum = curDisplay - i - 1;
        $img.eq(lNum).css({
            transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
        })
        rNum = curDisplay + i + 1;
        if (rNum > imgLen - 1) {
            rNum -= imgLen;
        }
        $img.eq(rNum).css({
            transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
        });
        $img.removeClass('on');
    }
    $img.eq(curDisplay).css({
        transform: 'translateZ(300px)'
    }).addClass('on');
    wrap.on('transitionend', function () {
        flag = true;
    })
};
function bindEvent() {
    $img.on('click', function (e) {
        if (flag && !$(this).hasClass('on')) {
            flag = false;
            nowIndex = $(this).index();
            moving(nowIndex);
        }
    }).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            play();
        }, interval);
    });
    timer = setInterval(function () {
        play();
    }, interval);
}
function play() {
        if (nowIndex == imgLen - 1) {
            nowIndex = 0;
        } else {
            nowIndex++;
        }
        moving(nowIndex);
}
function moving(index) {
    curDisplay = index;
    initalCarousel();
}

init();

