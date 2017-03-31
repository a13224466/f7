/**
 * create by 廖红东
 */
// if (!localStorage.getItem('loading_val')) {
    //获取浏览器页面可见高度和宽度  
    var _PageHeight = document.documentElement.clientHeight,
        _PageWidth = document.documentElement.clientWidth;
    //计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）  
    var _LoadingTop = _PageHeight > 50 ? (_PageHeight - 50) / 2 : 0,
        _LoadingLeft = _PageWidth > 50 ? (_PageWidth - 50) / 2 : 0;
    //在页面未加载完毕之前显示的loading Html自定义内容  
    var _LoadingHtml = '\
        <div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:1;filter:alpha(opacity=80);z-index:10000;">\
            <img src="./img/loading.gif" style="position: absolute; top:'+ _LoadingTop + 'px; left:' + _LoadingLeft + 'px; width: 50px;height: 50px;">\
            </div>\
        </div>';
    //呈现loading效果  
    document.write(_LoadingHtml);

    //window.onload = function () {  
    //    var loadingMask = document.getElementById('loadingDiv');  
    //    loadingMask.parentNode.removeChild(loadingMask);  
    //};  

    //监听加载状态改变  
    document.onreadystatechange = completeLoading;

    //加载状态为complete时移除loading效果  
    function completeLoading() {
        if (document.readyState == "complete") {
            var loadingMask = document.getElementById('loadingDiv');
            loadingMask.parentNode.removeChild(loadingMask);
            localStorage.setItem('loading_val', 'true');
        }
    }
// }