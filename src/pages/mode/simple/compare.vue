<template>
    <view class="body" v-if="!showScore">
        <text class="title">
            让我们一起来比一比大小，请选择等式后边合适的答案填入等式中。
        </text>
        <view class="c-content"
              v-for="(item, index) in datas" :key="index">
            <text>[{{index}}]</text>
            <view class="item-info">
                <text>{{item.left}} &nbsp;</text>
                <view class="item-info__option">{{item.checked}}</view>
                <text>&nbsp;{{item.right}}</text>
            </view>
            <view class="item-choice-area">
                <view class="area-value"
                      v-for="(val, cindex) in ['>', '=', '<']" :key="cindex"
                      :style="{'background-color': `${val === item.checked? '#ffffff':'#2E8A8A'}`}"
                      @click="checked(index, val)">
                    {{val}}
                </view>
            </view>
        </view>

        <button type="primary" @click="submit">提&nbsp;&nbsp;交</button>
    </view>
    <view v-else>
        <score-component :score="getScore(MAX_NUMBER, MAX_NUMBER-errors.length)" :data="errors" @click-finish="goback"/>
    </view>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";

import ScoreComponent from "@/component/ScoreComponent.vue";
import {getScore, randomArrays} from "@/util/MathUtils";

const MAX_NUMBER = 20;

interface Data {
    left: number,
    right: number,

    checked: '>'|'<'|'='|'',
    correct: '>'|'<'|'=',
}

const showScore = ref(false)

const datas = ref<Data[]>([])

const errors = computed(() => {
    return datas.value.filter(value => value.correct !== value.checked).map((data, index) => {
        return {
            index: index+1,
            error: `${data.left} ${data.checked} ${data.right}`,
            correct: `${data.left} ${data.correct} ${data.right}`
        }
    })
})

function checked(index: number, val: "" | ">" | "<" | "=") {
    datas.value[index].checked = val;
}

function submit() {
    let notFull = datas.value.filter(value => value.checked.length<=0)
    if(notFull.length > 0) {
        uni.showToast({
            icon: "none",
            title: '还有等式没有填写，填写后重新提交'
        })
        return
    }

    showScore.value = true;
}

function goback() {
    uni.navigateBack({delta: 1})
}

onMounted(() => {
    datas.value = randomArrays(MAX_NUMBER, MAX_NUMBER).map(value => {
        return {
            left: value[0],
            right: value[1],
            checked: '',
            correct: value[0] === value[1] ? '=' : value[0] > value[1] ? '>' : '<',
        }
    })
})

</script>

<style scoped lang="scss">

.body {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 20rpx;
    background-color: #C7EDCC !important;

    .title {
        margin-top: 80rpx;
        margin-bottom: 40rpx;
        font-size: 30rpx;
        color: #333333;
    }

    .c-content {
        width: 100%;
        height: auto;
        margin: 10rpx 0;
        padding: 20rpx 50rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 10rpx;
        border-color: #5EC99B;
        box-shadow: 0 0 10rpx #5EC99B;
        background-color: #5EC99B;
        font-size: 28rpx;
        color: #333333;

        .item-info {
            width: 160rpx;
            margin-left: 50rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;

            .item-info__option {
                width: 40rpx;
                height: 40rpx;
                margin: 0 15rpx;
                font-size: 24rpx;
                border: 1rpx solid #333333;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-self: center;
            }
        }

        .item-choice-area {
            flex: 1;
            margin-left: 80rpx;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .area-value {
                width: auto;
                height: auto;
                align-self: center;
                padding: 10rpx 25rpx;
                margin: auto;
                border-radius: 10rpx;
                background-color: #2E8A8A;
            }
        }
    }
}

button {
    margin: 60rpx 0;
    align-self: center;
    width: 400rpx !important;
}

</style>