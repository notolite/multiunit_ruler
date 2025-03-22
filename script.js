const 物差し = document.getElementById("物差し");
const 小目盛り列 = document.getElementById("小目盛り列");
const 中目盛り列 = document.getElementById("中目盛り列");
const 大目盛り列 = document.getElementById("大目盛り列");
const 初期メッセージ = document.getElementById("初期メッセージ");
let x = 0, y = 0;
// 物差し位置移動

物差し.onpointermove = function (event) {
    if (event.buttons || event.touches) {
        this.style.left = this.offsetLeft + event.movementX + 'px';
        this.style.top = this.offsetTop + event.movementY + 'px';
        this.style.position = 'absolute';
        this.draggable = false;
        this.setPointerCapture(event.pointerId);
    }
}
function X移動(移動距離) {
    x += 移動距離;
    物差し.style.transform = `translate(${x}px, ${y}px) rotate(${現角度取得()}deg)`;
}
function Y移動(移動距離) {
    y += 移動距離;
    物差し.style.transform = `translate(${x}px, ${y}px) rotate(${現角度取得()}deg)`;
}


// 物差し描画
let ディスプレイサイズ;
const mm = 0.1;
const cm = 1;
const dm = 10;
const 分 = 10 / 33;
const 寸 = 100 / 33;
const 尺 = 1000 / 33;
const 鯨分 = 25 / 66;
const 鯨寸 = 125 / 33;
const 鯨尺 = 1250 / 33;
const ライン = 2.54 / 12;
const 機械工分 = 2.54 / 8;
const パイカ = 2.54 / 6;
const インチ = 2.54;
const フィート = 30.48;
let 解像度;
const 現画面高さ = window.innerHeight;
let 小単位, 中単位, 大単位, 中倍率, 大倍率, 物差し長さ, 大単位記号;

function ディスプレイサイズ取得() {
    ディスプレイサイズ = document.getElementById("ディスプレイサイズ").value;
    解像度 = Math.hypot(screen.width, screen.height) / ディスプレイサイズ / 96;
    初期動作();
    初期メッセージ.style.visibility = "hidden";
    初期メッセージ.style.opacity = 0;
    document.querySelectorAll("body > *:not(#初期メッセージ)").forEach(element => {
        element.style.visibility = "visible";
        element.style.opacity = 1;
    });
}

function 初期動作() {
    document.getElementById("尺貫法").checked = true;
    描画(1);
    if (window.innerWidth < 768) {
        回転(90);
    }
}

function 描画(度量衡) {
    while (小目盛り列.firstChild) {
        小目盛り列.removeChild(小目盛り列.firstChild);
    }
    while (中目盛り列.firstChild) {
        中目盛り列.removeChild(中目盛り列.firstChild);
    }
    while (大目盛り列.firstChild) {
        大目盛り列.removeChild(大目盛り列.firstChild);
    }

    switch (度量衡) {
        case 0:
            小単位 = mm;
            中単位 = cm;
            中倍率 = 10;
            大単位 = dm;
            大倍率 = 100;
            中単位記号 = "";
            大単位記号 = "dm";
            break;
        case 1:
            小単位 = 分;
            中単位 = 寸;
            中倍率 = 10;
            大単位 = 尺;
            大倍率 = 100;
            中単位記号 = "寸";
            大単位記号 = "尺";
            break;
        case 2:
            小単位 = 鯨分;
            中単位 = 鯨寸;
            中倍率 = 10;
            大単位 = 鯨尺;
            大倍率 = 100;
            中単位記号 = "寸";
            大単位記号 = "尺";
            break;
        case 3:
            小単位 = ライン;
            中単位 = インチ;
            中倍率 = 12;
            大単位 = フィート;
            大倍率 = 144;
            中単位記号 = "in";
            大単位記号 = "ft";
            break;
        case 4:
            小単位 = 機械工分;
            中単位 = インチ;
            中倍率 = 8;
            大単位 = フィート;
            大倍率 = 96;
            中単位記号 = "in";
            大単位記号 = "ft";
            break;
        case 5:
            小単位 = パイカ;
            中単位 = インチ;
            中倍率 = 6;
            大単位 = フィート;
            大倍率 = 72;
            中単位記号 = "in";
            大単位記号 = "ft";
            break;
    }
    物差し長さ = 大単位 * 8 - 小単位;
    for (let i = 0; i < 物差し長さ; i = i + 小単位) {
        let 新目盛り線 = document.createElement("td");
        新目盛り線.style.minWidth = 小単位 * 解像度 + "cm";
        小目盛り列.appendChild(新目盛り線);
    }
    for (let i = 0; i < 物差し長さ; i = i + 中単位) {
        let 新目盛り線 = document.createElement("td");
        新目盛り線.colSpan = 中倍率;
        中目盛り列.appendChild(新目盛り線);
    }
    for (let i = 0; i < 物差し長さ; i = i + 大単位) {
        let 新目盛り線 = document.createElement("td");
        新目盛り線.colSpan = 大倍率;
        大目盛り列.appendChild(新目盛り線);
    }
    document.querySelectorAll(`#小目盛り列 td:nth-of-type(${中倍率}n)`).forEach(element => {
        element.style.borderRight = "black 1.7px solid";
    });
    document.querySelectorAll(`#中目盛り列 td:nth-of-type(${大倍率 / 中倍率}n + 1)`).forEach(element => {
        element.style.counterReset = "中単位 -1";
    });
    document.querySelectorAll("#中目盛り列 td").forEach(element => {
        element.style.setProperty("--中単位", `"${中単位記号}"`);
    });
    document.querySelectorAll("#大目盛り列 td").forEach(element => {
        element.style.setProperty("--大単位", `"${大単位記号}"`);
    });
}

// 物差し回転
function 現角度取得() {
    現transform値 = window.getComputedStyle(物差し).transform;
    if (!現transform値 || 現transform値 === "none") {
        return 0;
    }
    const values = 現transform値.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+)\)/);
    if (!values) {
        return 0;
    }
    const a = parseFloat(values[1]);
    const b = parseFloat(values[2]);
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    return angle;
}

function 回転(角度) {
    let 新角度 = 現角度取得() + 角度;
    物差し.style.transform = "rotate(" + 新角度 + "deg)";
}
