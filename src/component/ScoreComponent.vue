<template>
    <view class="body">
        <view class="score-info">
            <text class="s-content">{{score}}分</text>
        </view>
        <view class="l-content" v-if="data.length>0">
            <text class="l-title">错题信息，共{{data.length}}题</text>
            <uni-list class="l-list" :border="false">
                <uni-list-item v-for="(item, index) in data" :key="index">
                    <template #body>
                        <view class="l-list-item">
                            <text class="i-index">第{{item.index}}题</text>
                            <text class="i-content-err">❎：{{item.error}}</text>
                            <text class="i-content-correct">✅：{{item.correct}}</text>
                        </view>
                    </template>
                </uni-list-item>
            </uni-list>
        </view>
        <button type="primary" @click="emit('clickFinish')">完成</button>
    </view>
</template>

<script setup lang="ts">

import {ResultInfo} from "@/util/Api";

const emit = defineEmits(['clickFinish'])

const props = defineProps<{
    score: number,
    data: ResultInfo[]
}>()

</script>

<style scoped lang="scss">

.body {
    width: 100%;
    height: 100%;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .score-info {
        width: 300rpx;
        height: 300rpx;
        margin: 50rpx;
        padding: 3rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1rpx solid #A44037;
        box-shadow: 0 0 5rpx #A44037;

        .s-content {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #A44037;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 60rpx;
            font-weight: bold;
        }
    }

    .l-content {
        flex: 1 1 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 50rpx 0;

        .l-title {
            color: black;
            font-size: 28rpx;
            font-weight: bold;
            margin: 26rpx;
        }

        .l-list {
            flex: 1 1 auto;
            width: 100%;

            .l-list-item {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;

                .i-index {
                    width: 100rpx;
                    font-size: 20rpx;
                    color: #333333;
                }

                .i-content-err {
                    flex: 1 !important;
                    font-size: 20rpx;
                    color: #A44037;
                }

                .i-content-correct {
                    flex: 1 !important;
                    font-size: 20rpx;
                    color: #5EC99B;
                }
            }
        }
    }
}

</style>