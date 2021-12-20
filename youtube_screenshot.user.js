// ==UserScript==
// @name         YouTube - Screenshot
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/YouTube-Screenshot/raw/master/youtube_screenshot.user.js
// @version      1.2
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let download = () => {
        let video = document.querySelector('video');
        let canvas = document.createElement('canvas');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        let con = canvas.getContext('2d');
        let time = (t => {
			console.log('YT-Screen', t);
            let s = (Math.floor(t) % 60).toString().padStart(2,0);
            let m = (Math.floor(t/60) % 60).toString().padStart(2,0);
            let h = (Math.floor(t / 3600)).toString().padStart(2,0);
            return h + '.' + m + '.' + s;
        })(video.currentTime);
        con.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            let url = URL.createObjectURL(blob);
            let link = document.createElement('a');
            link.href = url;
			let title = document.title.replace(/ - YouTube$/, '');
            if (title.length > 53) {
                link.download = `${title.substring(0, 50)}... (${time}).png`;
            } else {
                link.download = `${title} (${time}).png`;
            }
            link.click();
        });
    };

    let btn;
    let addBtn = () => {
        if (!btn) {
            let controls = document.querySelector('.ytp-right-controls');
            if (controls) {
                btn = document.createElement('button');
                btn.title = 'Take Screenshot';
                btn.classList.add('ytp-button');
                let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); {
                    btn.appendChild(svg);
                    svg.setAttribute('height', '100%');
                    svg.setAttribute('width', '100%');
                    svg.setAttribute('version', '1.1');
                    svg.setAttribute('viewBox', '0 0 36 36');
                    let use = document.createElementNS('http://www.w3.org/2000/svg', 'use'); {
                        svg.appendChild(use);
                        use.classList.add('ytp-svg-shadow');
                        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); {
                            use.appendChild(path);
                            path.setAttribute('fill', '#fff');
                            path.setAttribute('fill-rule', 'evenodd');
                            path.setAttribute('d', 'm28,11l0,14l-20,0l0,-14l5,0l3,-3l4,0l3,3l-5,0l10,0zm-18,2l16,0l0,10l-16,0l0,-10z');
                            svg.appendChild(path.cloneNode(true));
                        }
                        let lense = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); {
                            use.appendChild(lense);
                            lense.setAttribute('r', '3.95');
                            lense.setAttribute('cy', '18');
                            lense.setAttribute('cx', '19.9');
                            lense.setAttribute('fill', '#fff');
                            svg.appendChild(lense.cloneNode(true));
                        }
                        let vf = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); {
                            use.appendChild(vf);
                            vf.setAttribute('r', '0.8');
                            vf.setAttribute('cy', '15');
                            vf.setAttribute('cx', '12');
                            vf.setAttribute('fill', '#fff');
                            svg.appendChild(vf.cloneNode(true));
                        }
                    }
                }
                btn.addEventListener('click', download);
                controls.appendChild(btn);
            }
        }
    };
    addBtn();

    var mo = new MutationObserver(function(muts) {
        addBtn();
    });
    mo.observe(document.body, {childList: true, subtree: true});
})();
