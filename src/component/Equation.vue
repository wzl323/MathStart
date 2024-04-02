<template>
    <view class="ly-equation">
        <text class="ly-equation-item">{{data.left}}</text>
        <text class="ly-equation-item">{{data.operator}}</text>
        <text class="ly-equation-item">{{data.right}}</text>
        <text class="ly-equation-item">{{data.compare}}</text>
        <uni-easyinput class="ly-equation-item" v-model="result"
                       :clearable="false" :inputBorder="true" type="number"
                       :styles="INPUT_STYLE" @change="onChanged"/>
    </view>

    <view>
        <uni-popup ref="popup" type="bottom" backgroundColor="#fff">
            <view class="ly-popup-content__item"
                  v-for="(item, index) in operInfos" :key="index"
                  @click="checkedPopupItem(item)">
                {{item.valueOf()}}
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {CompareSymbol, Equation, OperatorSymbol} from "@/util/Api";
import {format} from "@/util/MathUtils";


const emit = defineEmits(['updated'])

const props = defineProps<{
    index: number,
    data: Equation
}>()

const INPUT_STYLE = {
    color: '#000000',
    borderColor: '#000000',
    disableColor: '#00000000'
}

const equation = ref<Equation>(props.data)

const popup = ref<any|null>(null)

const result = ref(props.data.result)

watch(() => props.index, newVal => {
    result.value = props.data.result
})

const equationInfo = computed(() => {
    return Object.values(equation.value).map(value => {
        return {
            canInput: value===undefined,
            value: value,
        }
    })
})

const operInfos = computed(() => {
    if(props.data.operator) {
        return CompareSymbol
    }
    else {
        return OperatorSymbol
    }
})

function onChanged(val: any) {
    emit('updated', props.index, Number(result.value))
}

function clickOper() {
    if(props.data.operator)
        return

    popup.value?.open()
}

function clickComp() {
    if(props.data.compare)
        return

    popup.value?.open()
}

function checkedPopupItem(symbol: any) {
    if(props.data.operator) {
        equation.value.compare = (symbol as CompareSymbol);
    }
    else {
        equation.value.operator = (symbol as OperatorSymbol);
    }

    popup.value?.close()
}

</script>

<style scoped lang="scss">

$oper-bg-color: var(--bg-color);

.ly-equation {
    width: 100%;
    height: auto;
    padding: 10rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .ly-equation-item {
        width: auto !important;
        min-width: 40rpx;
        text-align: center;
        height: auto !important;
        font-size: 20rpx;
        color: #000;
    }

    .ly-equation-operator {
        width: 40rpx !important;
        height: 40rpx !important;
        margin: 0 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #000;
        background-color: $oper-bg-color;
        border-radius: 10rpx;
        box-shadow: 0 0 5px $oper-bg-color;
    }
}

.ly-popup-content {
    width: 100%;
    height: 120rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .ly-popup-content__item {
        width: 40rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        font-size: 30rpx;
        font-weight: bold;
        color: #000;
        background-color: #000;
        border-radius: 10rpx;
        box-shadow: 0 0 10rpx #000;
    }
}

::v-deep(.uni-easyinput:disabled) {
    color: black!important;
}
</style>
