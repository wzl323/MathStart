<template>

</template>

<script setup lang="ts">

import {onLoad} from "@dcloudio/uni-app";
import {useUserStore} from "@/store/user";

const userStore = useUserStore()
// #ifdef MP
const updateManager = uni.getUpdateManager();
// #endif

function redirectMain() {
    let userID = userStore.openID
    console.log(`----> userID: ${userID}`);
    if(userID && userID.length > 0) {
        uni.redirectTo({
            url: '../main/main',
        })
    } else {
        uni.redirectTo({
            url: '../login/login',
        })
    }
}

function doUpdate() {
    updateManager.onUpdateReady(function (res) {
        uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                }
            }
        });

    });

    updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
    });
}

onLoad(ele =>  {

        // #ifdef APP-PLUS || H5
        redirectMain();
        // #endif

        // #ifdef MP-WEIXIN
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log('have new version need update: ', res.hasUpdate);
            if(res.hasUpdate) {
                doUpdate()
            } else {
                redirectMain();
            }
        });
        // #endif
    }
)

</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;

}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
