<template>
    <view class="ly-calculate" v-if="!scorePage">
        <view class="ly-calculate-content">
            <view class="ly-calculate-content__item"
                  v-for="(item, index) in middleEquations" :key="index">
                <middle-equation :data="item" :index="index" @updated="hasChange"/>
            </view>
        </view>

        <button type="primary" @click="submit">提&nbsp;&nbsp;交</button>
    </view>
    <view v-else>
        <score-result :score="Utils.getScore(MAX_EQUATION_LENGTH, MAX_EQUATION_LENGTH-errorEquations.length)"
                         :data="errorEquations"  @click-finish="goback"/>
    </view>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

import * as Api from "@/util/Api"
import * as Utils from "@/util/MathUtils";

import MiddleEquation from "@/component/Equation.vue";
import ScoreResult from "@/component/ScoreComponent.vue";

const MAX_VALUE = 100
const MAX_EQUATION_LENGTH = 50

const middleEquations = ref<Api.Equation[]>([])
const errorEquations = ref<Api.ResultInfo[]>([])

const scorePage = ref(false);

function submit() {
    middleEquations.value.forEach((value, index) => {
        if(value.result === undefined)
            errorEquations.value.push({index: index, error: Utils.format(value), correct: Utils.getAnswer(value).toString()})
    })

    scorePage.value = true;
}


function goback() {
    uni.navigateBack({delta: 1})
}

function hasChange(index: number, value: number) {
    let equation = middleEquations.value[index];
    equation.result = value;

    let correctVal = Utils.getAnswer(equation);
    console.log(`${value} === ${correctVal}   value: ${value===correctVal}`)
    if(correctVal !== value) {
        let errorItem = errorEquations.value.find(value => value.index === index+1);
        if(errorItem)
            errorItem.error = Utils.format(equation);
        else
            errorEquations.value.push({index: index+1, error: Utils.format(equation), correct: correctVal.toString()})
    }
}

onMounted(() => {
    errorEquations.value = []

    let equationObj = new Utils.RandomEquation()
    middleEquations.value = equationObj.buildMultiple(MAX_VALUE, MAX_EQUATION_LENGTH,
        [Api.OperatorSymbol.PLUS, Api.OperatorSymbol.MINUS, Api.OperatorSymbol.MULTIPLE, Api.OperatorSymbol.DIVISION])
})

</script>

<style scoped lang="scss">

.ly-calculate {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 20rpx;
    background-color: #C7EDCC !important;

    .ly-calculate-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        .ly-calculate-content__item {
            width: 45%;
            height: auto;
            margin: 10rpx 0;
            padding: 10rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            border-radius: 10rpx;
            border-color: #5EC99B;
            box-shadow: 0 0 10rpx #5EC99B;
            background-color: #5EC99B;
            font-size: 28rpx;
            color: #fff;
        }
    }
}

</style>