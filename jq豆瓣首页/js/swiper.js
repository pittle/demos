$(function ($) {
    function Swiper(options) {
        //实现轮播图功能
        this.opts = options || {};  //容错(option没值会报错),避免没传options的情况后面要用到option.father、option.image
        this.wrap = this.opts.father;//jQuery.fn.init [div#swiper]
        this.img = this.opts.image;
        this.len = this.img.length - 1;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.nowIndex = 0;
        this.timer = null;
        this.flag = true;
        this.init();  //入口函数
    };
    Swiper.prototype.init = function(){
        this.createDom();
        this.bindEvent();
        this.slideAuto();
    }
    //生成Dom结构 father image.length
    Swiper.prototype.createDom = function(){
        var len = this.len;
        var str = '';
        var imgBox = $('<ul class="img-box"></ul>');
        var order = $('<div class="order"></div>');
        var list = $('<ul></ul>');
        var listStr = '';
        var btn = ' <div class="btn">\n' +
            '          <a href="javascript:void(0)" class="prevBtn">\n' +
            '              <span></span>\n' +
            '          </a>\n' +
            '          <a href="javascript:void(0)" class="nextBtn">\n' +
            '              <span></span>\n' +
            '          </a>\n' +
            '      </div>';
        for(var i = 0;i < len;i ++){
            str += '<li><a href="javascript:void(0)"><img src="'+ this.img[i] +'" alt=""></a></li>';
            listStr += "<li></li>";
        }
        str += '<li><a href="javascript:void(0)"><img src="'+ this.img[0] +'" alt=""></a></li>';
        $(listStr).appendTo(list);
        this.wrap.append(imgBox.html(str)).append(btn).append(order.append(list));
    }
    Swiper.prototype.bindEvent = function(){
        var _self = this;  //这里需要区分全局this与绑定函数的this
        //add添加一个新元素到一组匹配的元素中，并且这个新元素能匹配给定的表达式。
        $('.prevBtn').add('.nextBtn').add('.order li').on('click',function(){
            // console.log(1);
            if($(this).attr('class') == 'prevBtn'){
                _self.move('prev');
            }else if($(this).attr('class') == 'nextBtn'){
                _self.move('next');
            }else{
                _self.move($(this).index());
            }
        })
    }
    Swiper.prototype.slideAuto = function(){
        var _self = this;
        clearTimeout(_self.timer);
        //遇到这么一个情况需要清除定时器就是我一直点next按钮(作死的点击)当一张图片放完此时flag=true了,那就意味着
        //next在下一步又会生成了一个定时器,所以在这里必须把自动轮播的定时器清掉
        this.timer = setTimeout(function () {
            _self.move('next');
        },2000)
    }
    Swiper.prototype.changeStyle = function(){
        $('.active').removeClass();
        $('.order li').eq(this.nowIndex).addClass('active');
        // console.log(this.nowIndex);
    }
    Swiper.prototype.move = function(dir){
        var len = this.len;
        var itemWidth = this.itemWidth;
        //var flag = this.flag;  //这里不能设局部锁,锁和索引多是全局的
        // console.log(this.nowIndex);
        if(this.flag){
            this.flag = false;
            if(dir == 'prev' || dir == 'next'){
                if(dir == 'prev'){
                    if(this.nowIndex == 0){
                        this.nowIndex = this.len - 1;
                        $('.img-box').css('left',-(len * itemWidth));
                    }else{
                        this.nowIndex --;
                    }
                }else{
                    if(this.nowIndex == len - 1){
                        this.nowIndex = 0;
                        $('.img-box').animate({'left':-(len*itemWidth)},function(){
                            $(this).css('left','0');
                        })
                        // $('img-box').css('left',0);//可以考虑在第六张的时候瞬间变第一张
                    }else{
                        this.nowIndex ++;
                    }
                }
            }else{
                this.nowIndex = dir;
            }
            this.slider();
            this.changeStyle();
        }
    }
    Swiper.prototype.slider = function(){
        var itemWidth = this.itemWidth;
        var _self = this;
        $('.img-box').animate({'left':-(_self.nowIndex * itemWidth)},function () {
            _self.slideAuto();
            _self.flag = true;
        });
    }

    $.fn.extend({
        sliderImg:function (options) {
            options.father = this || $('body');
            // console.log(options);
            new Swiper(options);
        }
    })
}(jQuery))