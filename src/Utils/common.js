function set_html_fontsize() {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var width = w > h ? h : w;
    width = width > 720 ? 720 : width
    document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + ~~(width * 100000 / 36) / 10000 + "px;";
}
window.orientationchange = function () { set_html_fontsize() };
window.onresize = function () { set_html_fontsize() };
set_html_fontsize();
