

var wrap = document.getElementsByClassName('wrap')[0];
var btn = document.getElementsByClassName('btn')[0];
var content = wrap.getElementsByClassName('content')[0];
var pack = wrap.getElementsByClassName('pack')[0];
var packWidth = parseInt(getStyle(pack, "width"));
var packHeight = parseInt(getStyle(pack, "height"));
var h = packHeight / 3;
var w = packWidth / 3;
var flag = true;
var imageArr = [];
var imageOrder = [];
function getStyle(ele, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele, null)[prop];
	} else {
		return ele.currentStyle[prop];
	}
}
function init() {

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			imageArr.push(i * 3 + j);
			imageOrder.push(i * 3 + j);
			var dom = document.createElement('div');
			dom.className = "packCell";
			dom.style.height = h + "px";
			dom.style.width = w + "px";
			dom.style.backgroundImage = "url(./pic.jpg)";
			dom.style.backgroundPosition = (-j * w) + "px " + (-i * h) + "px";
			dom.style.boxShadow = "0 0 8px #fff";
			dom.style.left = (j * w) + "px";
			dom.style.top = (i * h) + "px";
			pack.appendChild(dom);
		}
	}
	var packCell = wrap.getElementsByClassName('packCell');
	// console.log(packCell);
	begin(packCell);

}

function begin(packCell) {
	btn.onclick = function (e) {
		// console.log(packCell);
		if (flag == true) {
			btn.innerText = "复原";
			flag = false;
			disorder(imageArr);
			changeArea(packCell);
			for (var i = 0; i < packCell.length; i++) {
				(function (n) {
					// console.log(n);
					packCell[n].onmousedown = function (e) {
						// console.log(n);//这个n是没每张图片每打乱之前的索引
						var _this = this;
						var disX = e.pageX - getElementPosition(this, 'offsetLeft');   //点相对于这个packCell的边框的距离
						var disY = e.pageY - getElementPosition(this, 'offsetTop');
						// console.log(disX,disY);          
						document.onmousemove = function (e) {
							var left = getElementPosition(_this.offsetParent, 'offsetLeft');
              var top = getElementPosition(_this.offsetParent, 'offsetTop');
              _this.style.zIndex = '99';
							// console.log(top,left);  //这个是pack相对于文档定位的距离
							_this.style.left = (e.pageX - disX - left) + "px";
							_this.style.top = (e.pageY - disY - top) + "px";    //这里是相对当前位置的top值和left值
              // console.log(_this.style.left,_this.style.top);
						}
						document.onmouseup = function (e) {
							// packCell[n].mousedown = null; //这里也有闭包要包裹一层立即执行函数所以先不取消它
							document.onmousemove = null;
							document.onmouseup = null;
							var x = e.pageX - getElementPosition(_this.offsetParent, 'offsetLeft');
							var y = e.pageY - getElementPosition(_this.offsetParent, 'offsetTop');
               // console.log(x,y);
							var index1 = n;//乱序之前的索引
							var index2 = changeIndex(x, y, index1);
							console.log(index1, index2);
							if (index1 == index2) {
								cellReturn(index1, _this);
							}else{
								changeCell(index1, index2,packCell);
							}
						}
					}

				}(i))
			};

		} else {
			btn.innerText = "开始";
			flag = true;
			order(imageArr);
			changeArea(packCell);
		}
	}
}
function changeCell(from, to,packCell) {
    // imageArr[from]//
    // imageArr[to]  //
    var temp = imageArr[from];
        imageArr[from] = imageArr[to];
        imageArr[to] = temp;
        // console.log(imageArr);
        changeArea(packCell);
}
function cellReturn(index, _this) {
	var row = Math.floor(imageArr[index] / 3);
	var col = Math.floor(imageArr[index] % 3);
  // console.log(imageArr[index],row,col);
	_this.style.left = col * w + "px";
	_this.style.top = row * h + "px";
}
function changeIndex(x, y, index) {
	if (x < 0 || x > packWidth || y < 0 || y > packHeight) {
		return index;
	} else {//console.log(x,y);
		var l = Math.floor(x / w);
		var t = Math.floor(y / h);
		var targetIndex = t * 3 + l;   //用位置去找索引，索引所在的值就是乱序数组中与位置相等的值
		//假设此时的位置是1，然后到乱序数组里面去找到哪一个的索引的值变到了1的位置
		var i = 0, len = imageArr.length;
		while(i < len && imageArr[i] !== targetIndex){  //当前位置相当于当前乱序数组里面的值，索引代表着没乱序之前的当前位置的值
			     i++;
		} 
		return i;                                       //[0, 1, 2, 3, 4, 5, 6, 7, 8] => [6, 7, 5, 3, 0, 4, 8, 1, 2] 
	}                                                 //0->6 1->7 2->5 3->3 4->0 5->4 6->8 7->1 8-2
}                                                   //假如拿到当前位置是7  那么就会到乱序数组中找7的值 值所在的索引就是初始位置
function changeArea(packCell) {
	for (var i = 0; i < imageArr.length; i++) {
		// console.log(imageArr[i]);
		var t = parseInt(imageArr[i] / 3);      //第几行
		var l = imageArr[i] % 3;				        //第几列
		packCell[i].style.left = (l * w) + "px";
		packCell[i].style.top = (t * h) + "px";
	}
}
function disorder(arr) {
	arr.sort(function (a, b) {
		return Math.random() - 0.5;
	})
}
function order(arr) {
	arr.sort(function (a, b) {
		return a - b;
	});
}

init();


//相对于文档定位的坐标
function getElementPosition(target, prop) {
	target = target || document.documentElement;
	var all = 0;
	for (var i = target; i; all += i[prop], i = i.offsetParent);
	return all;
}

  //手写一个高效的乱序方法
  // Array.prototype.shuffle = function() {
  //       for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);



// 变换元素的思路
// 原来的顺序数组变成了乱序
// 假设第一个位置原来是1 现在乱序后变成了3的位置
// 那么此时乱序数组的第一位就是3