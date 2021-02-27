const string = `
.skin *{box-sizing: border-box;margin: 0;padding: 0;}
 .skin *::before, .skin *::after{box-sizing: border-box;}
.skin{
   background: #ffe600;
    min-height: 100vh;
    position: relative;
}
.nose{
    border: 10px solid red;
    border-color: black transparent black  transparent ;
    border-bottom: none;
    width: 0;
    height: 0;
    position: relative;
    left: 50%;
    top: 145px;
    margin-left: -10px;
    z-index: 3;
}
@keyframes wave{
    0%{
        transform: rotate(0deg);
    }
    33%{
        transform: rotate(25deg);
    }
    66%{
        transform: rotate(-25deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.nose:hover{
    transform-origin: center bottom;
    animation: wave 200ms infinite linear;
}
.yuan{
    position: absolute;
    width: 20px;
    height: 6px;
    top: -16px;
    right: -10px;
    background: black;
    border-radius: 10px 10px 0 0;
}
.eye{
    border: 2px solid #000;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background: #2e2e2e;
    border-radius: 50%;
}
.eye::before{
    content: '';
    display: block;
    border: 3px solid #000;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    left: 4px;
    top: 2px;
}
.eye.left{
    transform: translateX(-100px);
}
.eye.right{
    transform: translateX(100px);
}
.face{
    position: absolute;
    left: 50%;
    border: 3px solid black;
    top: 200px;
    width:88px;
    height: 88px;
    margin-left: -44px;
}
.face > img{
    position: absolute;
    top: 50%;
    left: 50%;
}
.face.left{
    transform: translateX(-180px);
    border-radius: 50%;
    background: #ff0000;
}
.face.left > img{
    transform: rotateY(180deg);
    transform-origin: 0 0;
}
.face.right{
    transform: translateX(180px);
    border-radius: 50%;
    background: #ff0000;
}
.mouth{
    width: 200px;
    height: 200px;
    position: absolute;
    top: 170px;
    left: 50%;
    margin-left: -100px;
}
.mouth .up{
 position: relative;
    top: -30px;
    z-index: 1;
}
.mouth .up .lip .left{
    border: 4px solid black;
    height: 30px;
    width: 100px;
    border-radius: 0 0 0 50px;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-15deg) translateX(-53px);
    position: absolute;
    left: 50%;
    margin-left: -50px;
    background:#ffe600;
}
.mouth .up .lip .left::before{
    content: '';
    display: block;
    height: 30px;
    width: 8px;
    position: absolute;
    right: -6px;
    bottom: 1px;
    background: #ffe600;
}
.mouth .up .lip .right{
    border: 4px solid black;
    height: 30px;
    width: 100px;
    border-radius: 0 0 50px 0;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(15deg) translateX(53px);
    position: absolute;
    right: 50%;
    margin-right: -50px;
    background:#ffe600;
}
.mouth .up .lip .right::before{
    content: '';
    display: block;
    height: 30px;
    width: 8px;
    position: absolute;
    left: -6px;
    bottom: 1px;
    background: #ffe600;
}
.mouth .down{
    height: 180px;
    position: absolute;
    width: 100%;
    top: 0;
    overflow: hidden;
}
.mouth .down .yuan1{
    border: 3px solid black;
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background:  #9b000a;
    overflow: hidden;
}
.mouth .down .yuan1 .yuan2{
    width: 200px;
    height: 300px;
    position: absolute;
    background: #ff485f;
    bottom: -160px;
    left: 50%;
    margin-left: -100px;
    border-radius: 50%;
}

`
const player = {
    id: undefined,
    time: 100,
    ui: {
        demo: document.querySelector('#demo'),
        demo2: document.querySelector('#demo2')
    },
    events: {
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    n: 1,
    init: () => {
        player.ui.demo.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.bindEvents()
        player.play()
    },
    bindEvents: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key] // pause / play / slow
                document.querySelector(key).onclick = player[value]
            }
        }

    },
    run: () => {
        player.n += 1
        if (player.n > string.length) {
            window.clearInterval(player.id)
            return
        }
        player.ui.demo.innerText = string.substr(0, player.n)
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight
    },
    play: () => {
        window.clearInterval(player.id)
        player.id = setInterval(player.run, player.time)
    },
    pause: () => {
        window.clearInterval(player.id)
    },
    slow: () => {
        player.pause()
        player.time = 300
        player.play()
    },
    normal: () => {
        player.pause()
        player.time = 100
        player.play()
    },
    fast: () => {
        player.pause()
        player.time = 0
        player.play()
    }
}

player.init()
