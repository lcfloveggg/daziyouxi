/**
 * Created by Dell on 2017/10/30.
 */
//面向对象编程
class Game {
    constructor() {
        this.zuobox = document.querySelector(".zuobox");
        this.chengjiEle = document.querySelector(".chengji");
        this.dengjiEle = document.querySelector(".dengji");
        this.lifeEle = document.querySelector(".life");
        this.h = window.innerHeight-100;


        //初始化
        this.chengji = 0;
        this.dengji = 1;
        this.life = 5;
        this.num = 3;
        this.obj = {};
        this.speed = 5;
        this.t = 0;
    }


    //创建字母
    _createLetter() {
        let newdiv = document.createElement("div");
        newdiv.className = "zimu";
        do {
            var sjzm = Math.floor(Math.random() * 26 + 65);
            var zimu = String.fromCharCode(sjzm)
        } while (this.obj[zimu]);
//            newdiv.innerHTML = zimu;
        do {
            var randomLeft = Math.floor(Math.random() * 900);
        } while (this._checkleft(randomLeft));
        let randomTop = -Math.floor(Math.random() * 100);
        newdiv.style.background = "url(img/" + zimu + ".jpg) center no-repeat";
        newdiv.style.left = randomLeft + "px";
        newdiv.style.top = randomTop + "px";
        this.zuobox.appendChild(newdiv);
        this.obj[zimu] = {left: randomLeft, top: randomTop, ele: newdiv}
    }

    _checkleft(newleft) {
        for (let i in this.obj) {
            if (newleft > this.obj[i].left - 100 && newleft < this.obj[i].left + 100) {
                return true;
            }
        }
    }

    _move() {
        this.t = setInterval(function () {
            for (let i in this.obj) {
                let top = this.obj[i].top;
                top += this.speed;
                this.obj[i].ele.style.top = top + "px";
                this.obj[i].top = top;
                if (this.obj[i].top > this.h) {
                    this.life--;
                    this.lifeEle.innerHTML = this.life;
                    this.zuobox.removeChild(this.obj[i].ele);
                    delete this.obj[i];
                    this._createLetter();
                    if (this.life === 0) {
                        if (confirm("游戏结束，得分为" + this.chengji + " 是否继续")) {
                            history.go(0);
                        }
                    }
                }
            }
        }.bind(this), 50)
    }

    _keydown() {
        document.onkeydown = function (e) {
            let kc = e.keyCode;
            let letter = String.fromCharCode(kc);
            if (this.obj[letter]) {
                this.zuobox.removeChild(this.obj[letter].ele);
                delete this.obj[letter];
                this._createLetter();
                this.chengji++;
                this.chengjiEle.innerHTML = this.chengji;
                if (this.chengji % 10 === 0) {
                    this._nextState();
                }
            }
        }.bind(this);
    }

    _nextState() {
        this.dengji++;
        this.dengjiEle.innerHTML = this.dengji;
        if (this.dengji <= 3) {
            this._createLetter();
        } else {
            this.speed += 2;
        }
    }

    kaishi() {
        for (let i = 0; i < this.num; i++) {
            this._createLetter();
        }
        this._move();
        this._keydown();
    }

    zanting() {
        clearInterval(this.t);
    }

    running() {
        this._move();
    }

    gameover() {
        this.chengji = 0;
        this.chengjiEle.innerHTML = 0;
        this.dengji = 1;
        this.dengjiEle.innerHTML = 1;
        this.life = 5;
        this.lifeEle.innerHTML = 5;
        this.num = 3;
        this.obj = {};
        this.speed = 5;
        clearInterval(this.t);
        this.zuobox.innerHTML = "";
    }
}

let game = new Game();
let kaishiBtn = document.querySelector(".kaishi");
let flag = false;
let flag1 = true;
kaishiBtn.onclick = function () {
    if(flag1){
        game.kaishi();
        flag1 = false;
        flag = true;
    }
};

let zantingBtn = document.querySelector(".zanting");
zantingBtn.onclick = function () {
    if (flag) {
        game.zanting();
        zantingBtn.innerHTML = "继续";
    } else {
        game.running();
        zantingBtn.innerHTML = "暂停";

    }
    flag = !flag;
};

let jieshu = document.querySelector(".jieshu");
jieshu.onclick = function () {
    game.gameover();
    flag1 = true;
};