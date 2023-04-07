// ==UserScript==
// @name         研招网自动刷新页面
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yz.chsi.com.cn/sytj/tj/tjzy.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chsi.com.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function send(result) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `http://127.0.0.1:3000/sound?key=${result}`, true);
        xhr.send();
    }

    setTimeout(() => {
        var result = 0;
        // 设置定时器，十秒后检查数据
        for (var i = 3; i <= 3; i++) {
            const text = document.querySelector(`#content > div:nth-child(2) > div > div:nth-child(${i}) > div.tj-fixed > div.tj-process-message`).textContent;
            if (text.includes('未达到') || text.includes('被拒绝')) {
                result = 1;
                break;
            }
            if (!text.includes('已提交') && !text.includes('调剂申请已被招生单位查看')) {
                result = 2;
                break;
            }
        }
        send(result)
    }, 1000);

    console.log("已装载, 一分钟后会自动刷新页面");
    setTimeout(() => { location.reload(); }, 600000);
    // Your code here...
})();