<template>
    <view class="ly-difficult" v-if="!scorePage">
        <text class="title">
            请在倒计时结束前完成填写
        </text>
        <view class="ly-countdown">
            <uni-countdown ref="uCountdown" :showDay="false" :showColon="false" :second="countdown" @timeup="countdownEnd"/>
        </view>

        <view class="ly-content">
            <uni-transition custom-class="custom-transition" :mode-class="['fade', 'slide-right']" :show="showAnim">
                <equation v-if="difficultyEquations.length>0"
                          :data="equationItem" :index="answerQuestionsNumber" @updated="changed"/>
            </uni-transition>
        </view>

        <text class="saying">
            「 在学习中要敢于做减法，就是减去前人已经解决的部分，看看还有那些问题没有解决，需要我们去探索解决。 」
        </text>
    </view>
    <view v-else>
        <score-result :score="score" :data="errorEquations"  @click-finish="goBack"/>
    </view>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import * as Api from "@/util/Api";
import * as Utils from "@/util/MathUtils"

import ScoreResult from "@/component/ScoreComponent.vue";
import Equation from "@/component/Equation.vue";


const MAX_VALUE = 100
const MAX_MULTIPLY_VALUE = 20

const MAX_EQUATION_LENGTH = 5

const difficultyEquations = ref<Api.Equation[]>([])
const errorEquations = ref<Api.ResultInfo[]>([])

const scorePage = ref(false);
const showAnim = ref(true);

const countdown = ref<number>(5);
const uCountdown = ref<any|null>(null);
const answerQuestionsNumber = ref<number>(0)

const timer = ref<any>(undefined)

const score = computed(() => {
    return Utils.getScore(MAX_EQUATION_LENGTH, MAX_EQUATION_LENGTH - errorEquations.value.length);
})

const showSubmit = computed(() => {
    return answerQuestionsNumber.value >= MAX_EQUATION_LENGTH - 1;
})

const equationItem = computed(() => {
    return difficultyEquations.value[answerQuestionsNumber.value];
})

function goBack() {
    uni.navigateBack({delta: 1})
}

function submit() {
    difficultyEquations.value.forEach((value, index) => {
        if(value.result === undefined)
            errorEquations.value.push({index: index, error: Utils.format(value), correct: Utils.getAnswer(value).toString()})
    })

    scorePage.value = true;
}

function doOnceAnim() {
    if(timer.value) {
        return;
    }

    showAnim.value = false;
    timer.value = setTimeout(() => {
        showAnim.value = true;
        timer.value = undefined;
    }, 200)
}

function countdownEnd() {
    answerQuestionsNumber.value += 1;

    if(answerQuestionsNumber.value >= MAX_EQUATION_LENGTH) {
        submit()
    } else {
        doOnceAnim();
        countdown.value = 5;
        uCountdown.value?.update();
    }
}

function changed(index: number, value: number) {
    let equation = difficultyEquations.value[index];
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

    countdownEnd()
}

function buildEquations(): Api.Equation[] {
    let equationObj = new Utils.RandomEquation()
    let firstRandomNumber = Math.ceil(MAX_EQUATION_LENGTH/2);
    let tempEquations = equationObj.buildMultiple(MAX_VALUE, firstRandomNumber)
    let multiplyDivideEquations = equationObj.buildMultiple(MAX_MULTIPLY_VALUE, MAX_EQUATION_LENGTH - firstRandomNumber,
        [Api.OperatorSymbol.MULTIPLE, Api.OperatorSymbol.DIVISION]);

    return tempEquations.concat(multiplyDivideEquations);
}

function randomSort(equations: Api.Equation[]): Api.Equation[] {
    return equations.sort(() => { return 0.5 - Math.random(); })
}

onMounted(() => {
    errorEquations.value = []

    let equations = buildEquations();
    console.log(`---> equations.length: ${equations.length}`)
    difficultyEquations.value = randomSort(equations);
})

</script>

<style scoped lang="scss">
.ly-difficult {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        font-size: 36rpx;
        font-weight: bold;
        margin: 200rpx 0;
        color: #B0873B;
    }

    .ly-countdown {
        width: 400rpx;
        height: 100rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #B0873B;
        border-radius: 15rpx;
        box-shadow: 0 0 10rpx #B0873B;
    }

    .ly-content {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .saying {
        font-size: 24rpx;
        color: #2E8A8A;
        margin: 120rpx 30rpx;
        text-align: center;
    }

}
</style>