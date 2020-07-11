var wrap = $('.wrap');
var picLi = $('.photos li');
var listLi = $('.list li');
var len = picLi.length;
var width = parseInt(wrap.width());
var height = parseInt(wrap.height());
var nowIndex = 0;
var rotate = true;

init();

function init() {
    change(0)
    bindEvent();
}
function bindEvent() {
    picLi.on('click', function () {
        var $this = $(this);
        changeIndex($this.index());
    })
    listLi.on('click', function () {
        var $this = $(this);
        changeIndex($this.index());
    })
}
function changeIndex(index) {
    if (nowIndex != index) {
        nowIndex = index;
        change(nowIndex);
    } else {
        if (rotate) {
            getRotate(1, index);
            rotate = false;
        } else {
            getRotate(-1, index);
            rotate = true;
        }
    }
}

function getRotate(r, index) {
    var color;
    r === 1 ? color = 'red' : color = '#00807A';
    $(picLi[index]).css({
        'transform': 'rotateY(' + r * 360 + 'deg) translateZ(-' + 0 + 'px)',
        'transition':'all .3s ease-in-out',
        
    });
    $(picLi[index]).on('transitionend', function () {
        $(picLi[index]).css({
            'transform': 'rotateY(' + 0 + 'deg) translateZ(' + 0 + 'px)',
            'transition':'all 0s',
        });
    })
    $(listLi[index]).css({
        'backgroundColor': color,
        'transform': 'rotateY(' + r * 180 + 'deg) scale(' + 2 + ')',
        'transition':'all 0.4s ease-in-out',
        'transform-origin':'50% 50% 0'
    });
    $(listLi[index]).on('transitionend', function () {
        $(listLi[index]).css({
            'transform': 'rotateY(' + 0 + 'deg) scale(' + 2 + ')',
            'transition':'all 0s',
        });
    })
}
function change(index) {
    for (var i = 0; i < len; i++) {
        i % 2 == 0 ? d = 1 : d = -1;
        var deg = parseInt(Math.random() * 360);
        var z = parseInt(Math.random() * 100);
        h = parseInt(Math.random() * (height + 100));
        w = parseInt(Math.random() * (width + 100));
        parseInt(Math.random() * 10) % 2 == 0 ? p = 1 : p = -1;
        $(picLi[i]).css({
            'transform': 'rotateZ(' + d * (360 - deg) + 'deg) translateZ(-' + z + 'px)',
            'transition':'all 0.4s ease-in-out',
            'transform-origin':'50% 50% 0'
        })

        $(picLi[i]).on('transitionend', (function (i) {
            $(picLi[i]).animate({
                'z-index': 0,
                'top':p * h / 2 + 'px',
                'left':p * w / 2  + 'px'
            },'1500','swing')
        })(i));
        $(listLi[i]).css({
            'transform': 'rotateY(' + 0 + 'deg) scale(' + 1 + ')',
            'backgroundColor': '#00807A',
        })
    }
    $(picLi[index]).animate({
        top: 0 + 'px',
        left: 0 + 'px',
    }, 10, function () {
        $(picLi[index]).css({
            'transform': 'rotateZ(' + 0 + 'deg) translateZ(' + 10 + 'px)',
            'z-index': 1000,
        })
    })
    $(listLi[index]).css({
        'transform': 'rotateY(' + 360 + 'deg) scale(' + 2 + ')',
    })
}

