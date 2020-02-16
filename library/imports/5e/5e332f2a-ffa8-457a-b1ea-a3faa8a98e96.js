"use strict";
cc._RF.push(module, '5e3328q/6hFerHqo/qoqY6W', 'PhysicsManager');
// PhysicsManager.js

'use strict';

/**
 * 物理引擎管理组件，开启各种调试
 */
cc.Class({
    extends: cc.Component,

    properties: {
        active: {
            default: true,
            tooltip: '是否启用物理引擎'
        },
        aabb: {
            default: true,
            tooltip: '是否显示包围盒'
        },
        pair: {
            default: true
        },
        centerOfMass: {
            default: true,
            tooltip: '是否显示中心点'
        },
        joint: {
            default: true,
            tooltip: '是否显示关节连接线'
        },
        shape: {
            default: true,
            tooltip: '是否填充形状'
        },
        mouseJoint: {
            default: false,
            tooltip: '是否开启鼠标关节，可以拖动动态刚体'
        },
        gravity: {
            default: cc.v2(0, -960),
            tooltip: '重力'
        }
    },

    onEnable: function onEnable() {
        //开启或关闭物理系统
        var physicsManager = cc.director.getPhysicsManager();
        if (physicsManager.enabled && this.active) {
            cc.warn('The physical system is enabled！');
        }
        physicsManager.enabled = this.active;

        if (!this.active) {
            return;
        }
        //设置物理系统的重力属性
        physicsManager.gravity = this.gravity;

        //设置调试标志
        var drawBits = cc.PhysicsManager.DrawBits;
        if (CC_PREVIEW) {
            physicsManager.debugDrawFlags = (this.aabb && drawBits.e_aabbBit) | (this.pair && drawBits.e_pairBit) | (this.centerOfMass && drawBits.e_centerOfMassBit) | (this.joint && drawBits.e_jointBit) | (this.shape && drawBits.e_shapeBit);
        } else {
            physicsManager.debugDrawFlags = 0;
        }
    },
    onDisable: function onDisable() {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.debugDrawFlags = 0;
        physicsManager.enabled = false;
    }
});

cc._RF.pop();