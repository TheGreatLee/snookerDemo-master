"use strict";
cc._RF.push(module, '419f7J62+ZBHpAQrh/V+TMN', 'wball');
// wball.js

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

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        //监听击球事件“cue”
        this.node.on("cue", this.onCue, this);
        //白球是否停止的标记，主要是用于使停止事件只发送一次
        //白球的初始状态是停止的，因此设置为true
        this._sleep = true;
    },
    onCue: function onCue(event) {
        if (this && this.node.parent) {
            //白球没有停止，因此_sleep为false
            this._sleep = false;
            //计算白球运动的方向向量
            var direction = this.node.parent.convertToNodeSpaceAR(event.cue);
            direction = direction.sub(this.node.position);
            direction = direction.normalize();
            //根据方向和力度，计算并给予白球线速度
            this.node.getComponent(cc.RigidBody).linearVelocity = direction.mul(-Math.pow(1.016, Math.abs(event.force)));
        }
    },
    update: function update(dt) {
        if (!this.node.getComponent(cc.RigidBody).awake && !this._sleep) {
            //白球从运动到停止，状态切换时，标记设置为true，并发送白球停止的事件
            this._sleep = true;
            cc.Canvas.instance.node.emit("wball-sleep");
        }
    }
});

cc._RF.pop();