<template>
    <view class="body">
        <button v-if="showPrev" @click="emit('prev')">上一题</button>
        <button type="primary" @click="emit('next')">{{showNext?'下一题': '提   交'}}</button>
    </view>
</template>

<script setup lang="ts">

const emit = defineEmits(['prev', 'next'])

const props = defineProps<{
    showNext: boolean;
    showPrev: boolean;
}>()

</script>

<style scoped lang="scss">

.body {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

</style>