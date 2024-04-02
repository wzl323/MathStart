<template>
    <view class="body">
        <navigator v-for="(value, index) in values"
                   :key="index" :url="value.page">
            <button plain>{{value.name}}</button>
        </navigator>
    </view>
</template>

<script setup lang="ts">

const props = defineProps<{
    values: { name: string, page: string }[]
}>()

</script>

<style scoped lang="scss">

$theme-color: #2E8A8A;

.body {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

button {
    width: 520rpx !important;
    height: 90rpx !important;
    color: $theme-color;
    margin: 20rpx;
    border-width: 3rpx;
    border-color: $theme-color;
    border-radius: 40rpx;
}

.body > navigator {
    margin-bottom: 20rpx;
}

</style>