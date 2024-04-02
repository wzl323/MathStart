<template>
    <view class="content" v-if="!showAnswerPage" >
        <uni-transition custom-class="custom-transition" :mode-class="['fade', 'slide-right']" :show="showTransition">
            <view class="desc">
                <text style="font-weight: bold">
                    第&nbsp;{{data.index}}&nbsp;题：
                </text>
                快来数一数，下面有（&nbsp;&nbsp;{{checkAnswer}}&nbsp;&nbsp;）个&nbsp;
                <uni-icons :type="data.iconType" size="24"/>
            </view>

            <view class="check-rect">
                <uni-grid :column="5" :showBorder="false" :highlight="false">
                    <uni-grid-item v-for="index of data.correctAnswer" :index="index" :key="index">
                        <view class="c-grid-item">
                            <uni-icons :type="data.iconType" :size="30" color="#333333"/>
                        </view>
                    </uni-grid-item>
                </uni-grid>
            </view>
            <view>
                <result-option style="flex: 1;" :current="data.checkedOption" :datas="options" @checked="checkResult"/>
            </view>
            <operation style="flex: 1" :show-next="hasNext" :show-prev="hasPrev" @prev="showPrev" @next="showNext"/>
        </uni-transition>
    </view>
    <view v-else>
        <ScoreComponent :score="score" :data="errorInfos" @click-finish="goBack"/>
    </view>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {randomAnswers, randomNumber, getScore} from "@/util/MathUtils";

import ResultOption from "@/component/ResultOption.vue"
import Operation from "@/component/OperationComp.vue"
import ScoreComponent from "@/component/ScoreComponent.vue";

interface Data {
    index: number,

    iconType: string,

    correctAnswer: number,
    correctOption: string,
    checkedOption: string,

    answerOptions: number[]
}

const COUNT_ICONS = ['medal', 'gift', 'vip', 'star', 'home', 'hand-up']
const MAX_NUMBER = 10


const showAnswerPage = ref(false);
const examResults = ref<Data[]>([])

const showTransition = ref(true)


const data = ref<Data>({
    index: 0,
    iconType: '',
    correctAnswer: 0,
    correctOption: '',
    checkedOption: '',
    answerOptions: []
})

const score = computed(() => {
    return getScore(MAX_NUMBER, (MAX_NUMBER - errorInfos.value.length))
})

const checkAnswer = computed(() => {
    return data.value.checkedOption ? data.value.checkedOption.substring(data.value.checkedOption.indexOf(" ")) : '';
})

const errorInfos = computed(() => {
    return examResults.value.filter(value => value.correctOption != value.checkedOption).map(data => {
        return {index: data.index, error: data.checkedOption, correct: data.correctOption}
    })
})

const options = computed(() => {
    return data.value.answerOptions.map((val, index) => buildOption(index, val))
})

const hasNext = computed(() => {
    return data.value.index < MAX_NUMBER;
})

const hasPrev = computed(() => {
    return data.value.index > 1;
})

function buildOption(index: number, val: number) {
    return `${String.fromCharCode(index+65)}. ${val}`
}

function doOnceAnim() {
    showTransition.value = false;
    setTimeout(() => {
        showTransition.value = true;
    }, 200)
}

function showNext() {
    if(data.value.checkedOption.length <= 0) {
        uni.showToast({
            icon: "none",
            title: '请选择答案后再次点击',
        })
        return;
    }

    doOnceAnim()
    if(data.value.index < examResults.value.length) {
        data.value = examResults.value[data.value.index]
    } else {
        examResults.value.push(data.value)
        if (data.value.index >= MAX_NUMBER) {
            showAnswerPage.value = true;
        } else {
            data.value = randomOnce();
        }
    }
}

function showPrev() {
    doOnceAnim()
    data.value = examResults.value[data.value.index-2]
}

function checkResult(option: string) {
    data.value.checkedOption = option;
}

function randomOnce() {
    let correctAnswer = randomNumber(1, MAX_NUMBER);
    let answerOptions = randomAnswers(correctAnswer, MAX_NUMBER);
    return {
        index: data.value.index+1,
        iconType: COUNT_ICONS[randomNumber(0, COUNT_ICONS.length)],
        correctAnswer: correctAnswer,
        checkedOption: '',
        correctOption: buildOption(answerOptions.indexOf(correctAnswer), correctAnswer),
        answerOptions: answerOptions,
    }
}

function goBack() {
    uni.navigateBack({delta: 1})
}

onMounted(() => {
    showAnswerPage.value = false;
    data.value = randomOnce();
})

</script>

<style scoped lang="scss">

.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;

    .desc {
        width: 100%;
        height: 160rpx;
        flex-wrap: wrap;
        margin-top: 80rpx;
        padding: 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 30rpx;
        color: black;
    }

    .check-rect {
        width: 700rpx;
        height: auto;
        margin: 100rpx 0;
        padding: 15rpx;
        border: 1rpx solid #333333;
        border-radius: 10rpx;
        box-shadow: 0 0 5rpx #333333 inset;


        .c-grid-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }

    .custom-transition {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

</style>