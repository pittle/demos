(function ($) {
    var obj = {
        init: function (option) {
            var option = option || {};
            this.opt = $.extend({}, option);
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var self = this;
            var opt = self.opt;
            var wrap = opt.father;
            var len = opt.tabList.length;
            var oUl = $('<ul id="tabs"></ul>');
            var con = $('<div id="content"></div>');
            var oSpan = $('<span class="header"></span>');
            var tabHtml = '';
            for (var i = 1; i <= len; i++) {
                tabHtml += '<li><a href="#" title="tab' + i + '">' + opt.tabList[i - 1] + '</a></li>';
            }
            wrap.append(oSpan.text(opt.spanCon)) 
                .append(oUl.html(tabHtml))
                .append(con.html(opt.conStr));
            for (var i = 0; i < len; i++) {
                $($('.conBox')[i]).attr('id', 'tab' + (i + 1));
            }
            $('#content').find('.conBox:first').addClass('current');
            $('#tabs').find('a').eq(0).addClass('activeTab');
        },
        bindEvent: function () {
            var self = this;
            var wrap = this.opt.father;
            $('#tabs').on('click', 'a', function (e) {
                e.preventDefault();
                var id= $(this).attr('title');
                $('.activeTab').removeClass('activeTab');
                $(this).attr('class','activeTab');
                $('.current').removeClass('current');
                $('#' + id).addClass('current');
            })
        }
    }
    $.fn.extend({
        tab: function (option) {
            option.father = this || $('body');
            obj.init(option);
        }
    })
})(jQuery)