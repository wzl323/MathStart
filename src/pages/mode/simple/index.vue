<template>
    <view class="content">
        <view class="title-area">
            <image class="img" lazy :src="loadImg('enlighten.png')"/>
            <text class="subtitle">儿童教育家蒙台梭利说过: 游戏是儿童的工作</text>
        </view>
        <nav-option class="nav" :values="NAV_LIST"/>
    </view>
</template>

<script setup lang="ts">

import NavOption from "@/component/NavList.vue"
import {loadImg} from "@/util/Res";

const NAV_LIST = [
    {name: "数一数", page: "./count"},
    {name: "比一比", page: "./compare"},
    {name: "算一算", page: "./calculate"}
]

</script>

<style scoped lang="scss">

.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .img {
            width: 700rpx;
            height: 400rpx;
        }

        .subtitle {
            margin-top: 20rpx;
            font-size: 24rpx;
            color: #2E8A8ADD;
        }
    }

    .nav {
        flex: 1;
        margin-bottom: 120rpx;
    }
}

</style>