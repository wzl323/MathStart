<template>
    <view class="body">
        <view v-for="(val, index) in datas" :key="index"
              @click="checkedVal(val)"
              class="item" :style="{'--color': `${val === current? '#ffffff':'#5EC99B'}`}">
            <text>{{val}}</text>
        </view>
    </view>
</template>

<script setup lang="ts">

const emit = defineEmits(['checked'])

const props = defineProps<{
    current: string,
    datas: string[],
}>()

function checkedVal(val: string) {
    emit('checked', val)
}

</script>

<style scoped lang="scss">

$main-color: var(--color);

.body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
        width: 500rpx;
        height: 80rpx;
        margin: 10rpx 0;
        padding: 0 25rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #333333;
        border-radius: 10rpx;
        background-color: $main-color;
        box-shadow: 0 0 10px $main-color;
    }
}

</style>