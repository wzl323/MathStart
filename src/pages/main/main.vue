<template>
    <view class="content">
        <view class="c-info">
            <image class="logo" lazy :src="loadImg('learn.png')"/>
            <nav-option :values="NAV_LIST"/>
        </view>
        <view class="saying">
            <text>「 第一是数学，第二是数学，第三还是数学。」</text>
        </view>
    </view>
</template>


<script setup lang="ts">

import NavOption from "@/component/NavList.vue"

import {loadImg} from "@/util/Res";

const NAV_LIST = [
    {name: "基础启蒙", page: "../mode/simple/index"},
    {name: "进阶模式", page: "../mode/middle/index"},
    {name: "地狱模式", page: "../mode/difficulty/index"}
]

</script>

<style scoped lang="scss">

.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .c-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .logo {
            margin-top: -120rpx;
            margin-bottom: 80rpx;
            width: 400rpx;
            height: 400rpx;
        }
    }


    .saying {
        width: 100%;
        height: 160rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18rpx;
        color: #B0873B;
    }


}

</style>