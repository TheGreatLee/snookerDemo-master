"use strict";
cc._RF.push(module, '35b57bU3h9Pe6specuiOLkJ', 'cue');
// cue.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //球杆的节点
        cue: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        //鼠标移动系统事件
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        //鼠标左键按下系统事件
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        //鼠标左键抬起系统事件
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        //白球停止的自定义事件
        cc.Canvas.instance.node.on("wball-sleep", this.onwballSleep, this);
    },
    onMouseMove: function onMouseMove(event) {
        //按下鼠标时，球杆方向不再移动。球杆隐藏时操作无效
        if (this._mouseDown || this.node.opacity != 255) {
            return;
        }
        //获取鼠标的当前位置坐标
        var loc = event.getLocation();
        this._mousePosition = loc;
        //将坐标转换到父节点的坐标系下
        loc = this.node.parent.convertToNodeSpaceAR(loc);
        //计算与（-1，0）向量的夹脚，该夹脚即为球杆需要转动的角度
        var angle = loc.signAngle(cc.v2(-1, 0));
        angle = cc.misc.radiansToDegrees(angle);
        //设置球杆的角度
        this.node.rotation = angle;
    },
    onMouseDown: function onMouseDown(event) {
        //球杆隐藏时操作无效
        if (this.node.opacity != 255) {
            return;
        }
        //将按下鼠标的标记设置为true
        this._mouseDown = true;

        //使球杆向后移动，每秒向后移动50个像素
        //这里可以将-50这个值提升为组件属性，暴露到属性面板中方便配置调试
        this.cue.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-50, 0))));
    },
    onMouseUp: function onMouseUp(event) {
        var _this = this;

        //球杆隐藏时操作无效
        if (this.node.opacity != 255) {
            return;
        }
        //计算球杆向后移动的像素，通过这个值来计算击球的力度
        var force = this.cue.x - 182;
        //停止球杆向后移动的动作
        this.cue.stopAllActions();
        //使用序列动作，先执行
        this.cue.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(-182, 0)).easing(cc.easeSineOut()), cc.callFunc(function () {
            //将按下鼠标的标记设置为false
            _this._mouseDown = false;
            //创建自定义事件"cue",并派发出去
            //事件有两个参数，一个是force，通过这个值，白球可以计算击球力度
            //另一个值为cue，是一个cc.vec2坐标，记录按下时的鼠标位置，这是提供给白球进行角度计算的
            var customEvent = new cc.Event.EventCustom("cue", true);
            customEvent.force = force;
            customEvent.cue = _this._mousePosition;
            _this.node.dispatchEvent(customEvent);
            //隐藏球杆
            _this.node.opacity = 0;
        })));
    },
    onwballSleep: function onwballSleep() {
        //白球停止时，显示球杆
        this.node.opacity = 255;
    }
}

// update (dt) {},
);

cc._RF.pop();