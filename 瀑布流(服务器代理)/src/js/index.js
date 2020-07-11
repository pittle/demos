

(function () {
    var oLi = $('li');
    var flag = false;
    var num = 1;
    getData();
    function getData() {
        if (!flag) {
            flag = true;
            $.ajax({
                type: 'GET',
                url: 'http://localhost/new/water/water-modern/src/js/getPics.php?cPage=' + num,
                success: addDom,
                beforeSend: function () {     //请求成功前触发的局部事件
                    $('.loading').show();
                },
            });
            num++;
        }
    }
    function addDom(data) {
        $('.loading').hide();
        var dataList = JSON.parse(data);
       // console.log(dataList);
        if (dataList.length > 0) {
            dataList.forEach(function (ele) {
                var iDiv = $('<div class="item"></div>');
                var imgBox = $('<div class="imgBox"></div>');
                var oImg = new Image();
                var oP = $('<p></p>');
                oP.text(ele.title);
                oImg.src = ele.preview;
                oImg.onload = function () {
                    imgBox.append(oImg);
                    iDiv.append(imgBox).append(oP);
                    var index = getMinList(oLi);
                    $(oLi[index]).append(iDiv);
                };
            });
        }
        flag = false;
    }

    
    function getMinList(dom) {
        var minHeight = parseInt($(dom[0]).css('height')),     //$($('li')[0]).css('height')可以取到$('li')[0]的高度
            index = 0;                                          //css()方法相当于getComputedStyle(ele,null)而且比它还
        for (var i = 1; i < dom.length; i++) {                   //强大,因为jQuery兼容性较好
            var height = parseInt($(dom[i]).css('height'));
            if (height < minHeight) {
                minHeight = height;
                index = i;
            }
        }
        return index;
    }
    $(window).scroll(function () {
        var scrollHeight = $(this).scrollTop();
        var clientHeight = $(window).height();    //代表了当前可见区域的大小
        var pageHeigh = parseInt($(oLi[getMinList(oLi)]).css('height'));   //大于最高的那一列的高度
        if (scrollHeight + clientHeight > pageHeigh) {
            getData();  //如果上一次的数据图片没有全部渲染到页面 此时滑动又会发送一次请求
        }               //我们需要一次请求完成后再发送下一次请求  这时候就要加锁了
    })

})();