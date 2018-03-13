// ==UserScript==
// @name         YouTube - Screenshot
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/YouTube-Screenshot/raw/master/youtube_screenshot.user.js
// @version      0.1
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let download = () => {
        let video = document.querySelector('video');
        let canvas = document.createElement('canvas');
        canvas.height = video.offsetHeight;
        canvas.width = video.offsetWidth;
        let con = canvas.getContext('2d');
        con.drawImage(video, 0, 0, canvas.width, canvas.height);
        let link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'screenshot.png';
        link.click();
    };

    let btn;
    let addBtn = () => {
        btn = document.createElement('button');
        btn.textContent = 'Shot!';
        btn.style.position = 'relative';
        btn.style.top = '-14px';
        btn.title = 'Take Screenshot';
        btn.classList.add('ytp-button');
        btn.addEventListener('click', download);
        document.querySelector('.ytp-right-controls').appendChild(btn);
    };
    addBtn();
})();
