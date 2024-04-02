<template>
    <view class="ly-calculate" v-if="!showResult">
        <view class="ly-calculate-content">
            <view class="ly-calculate-content__item"
                  v-for="(item, index) in equationInfos" :key="index">
                <equation :data="item" :index="index" @updated="updateVal"/>
            </view>
        </view>

        <button type="primary" @click="submit">提&nbsp;&nbsp;交</button>
    </view>
    <view v-else>
        <score-component :score="Utils.getScore(MAX_EQUATION_LENGTH, MAX_EQUATION_LENGTH-errorEquations.length)"
                         :data="errorEquations"  @click-finish="goback"/>
    </view>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";

import * as Api from "@/util/Api"
import * as Utils from "@/util/MathUtils";

import Equation from "@/component/Equation.vue";
import ScoreComponent from "@/component/ScoreComponent.vue";

const MAX_VALUE = 10
const MAX_EQUATION_LENGTH = 20

const equations = ref<Api.Equation[]>([])
const errorEquations = ref<Api.ResultInfo[]>([])

const showResult = ref(false);

const equationInfos = computed(() => {
    return equations.value.map(value => {
        value.result = undefined;
        return value
    })
})

function submit() {
    if(equations.value.filter(value => value.result===undefined).length > 0) {
        uni.showToast({
            title: '有算式没有填写答案，请填写完整后再提交。',
            icon: "none",
        })
    }
    else {
        showResult.value = true;
    }
}


function goback() {
    uni.navigateBack({delta: 1})
}

function updateVal(index: number, value: number) {
    let equation = equations.value[index];
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
    equations.value = equationObj.buildMultiple(MAX_VALUE, MAX_EQUATION_LENGTH)
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