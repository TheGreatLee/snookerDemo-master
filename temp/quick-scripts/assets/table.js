(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/table.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '83fc3RT4iZGmZY4Z0+mX9TK', 'table', __filename);
// table.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        wballPrefab: cc.Prefab,
        redBalls: cc.Prefab,
        _ballNum: 10,
        winUI: cc.Node,
        startUI: cc.Node,
        endUI: cc.Node,
        gameUI: cc.Node,
        ballLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        var _this = this;

        this.node.on("wball", function (node) {
            setTimeout(function () {
                _this.resetWhiteBall();
            }, 100);
        });
    },
    resetTable: function resetTable() {
        this.node.removeAllChildren(true);
        this.resetWhiteBall();
        this.resetRedBalls();
        this._ballNum = 10;
        this.winUI.active = false;
        this.startUI.active = false;
        this.endUI.active = false;
        this.gameUI.active = true;
        this.ballLabel.string = "剩余" + this._ballNum + "球";
    },
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        //如果Collider的组件tag为1时，也就是小球碰撞到代表袋口的碰撞体时
        if (selfCollider.tag === 1) {
            //如果是与白球发生碰撞
            if (otherCollider.node.name === "wball") {
                //发送通知重新生成白球，重置位置
                this.node.emit("wball", otherCollider.node);
            } else {
                //红球数减1
                this._ballNum--;
                this.ballLabel.string = "剩余" + this._ballNum + "球";
                //红球数小于等于0时，获得胜利
                if (this._ballNum <= 0) {
                    this.gameUI.active = false;
                    this.winUI.active = true;
                }
            }
            //将小球节点从场景树上移除
            otherCollider.node.removeFromParent(true);
        }
    },
    resetWhiteBall: function resetWhiteBall() {
        var node = cc.instantiate(this.wballPrefab);
        node.parent = this.node;
    },
    resetRedBalls: function resetRedBalls() {
        var node = cc.instantiate(this.redBalls);
        node.parent = this.node;
    },
    lose: function lose() {
        this.gameUI.active = false;
        this.endUI.active = true;
    }

    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=table.js.map
        