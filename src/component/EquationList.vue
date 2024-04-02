<template>
    <view class="ly-equation-list">
        <equation-item v-for="(item, index) in datas" :key="index"
                       :data="item" @changed="clickItem"/>
    </view>
</template>

<script setup lang="ts">


import EquationItem from "@/component/EquationItem.vue";
import * as Api from "@/util/Api";

const emit = defineEmits(['updated'])

const props = defineProps<{
    datas: Api.Equation[]
}>()

function clickItem(val: Api.Equation) {
    emit('updated', val)
}

</script>

<style scoped lang="scss">

.ly-equation-list {
    width: 100%;
    height: 100%;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
}

</style>