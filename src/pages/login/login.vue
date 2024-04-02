<template>
    <view class="login">
        <image class="img" lazy :src="loadImg('weixin.png')"/>
        <button plain style="margin-top: 120rpx;" @click="authorLogin">微信账号快捷登录</button>
    </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useUserStore} from "@/store/user";

import {WXBizDataCrypt} from "@/util/WXBizDataCrypt";
import {loadImg} from "@/util/Res";

const WXID = 'wxc3e493f5856c99c0'
const SECRET = '94581e2baa555fc481554f5699c8ea84'

const userStore = useUserStore();
const code = ref("")


function toMain() {
    uni.redirectTo({
        url:'../main/main'
    })
}

function authorLogin() {
    uni.showModal({
        title: "授权微信登录",
        content: "是否授权登录微信小程序？",
        success: result => {
            if(result.confirm) {
                uni.getUserProfile({
                    desc: "登录后可同步用户信息",
                    lang: "zh_CN",
                    success: result => {
                        loginUser()
                        userStore.setNickName(result.userInfo.nickName)
                        userStore.setAvatarUrl(result.userInfo.avatarUrl)

                        toMain()
                    },
                    fail: reason => {
                        uni.showToast({
                            icon: 'none',
                            title: '授权失败'
                        })
                    }
                })
            }
            else if(result.cancel) {
                uni.showToast({
                    icon: 'none',
                    title: "授权失败"
                })
            }
        },
        fail: result => {
            uni.showToast({
                icon: 'none',
                title: "授权失败"
            })
        }
    })
}

function loginUser() {
    uni.login({
        provider: 'weixin',
        success: async (loginRes) => {
            code.value = loginRes.code;

            await uni.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: 'GET',
                data: {
                    appID: WXID,
                    secret: SECRET,
                    js_code: code.value,
                    grant_type: 'authorization_code'
                },
                success: async res => {
                    console.log(`获取信息： ${JSON.stringify(res)}`)
                    userStore.setID(res.data.openid);
                    userStore.setSessionKey(res.data.session_key);
                }
            })
        }
    })
}

function decryptData(encryptedData: string, iv: string) {
    let cryptObj = WXBizDataCrypt(userStore.openID, userStore.sessionKey);
    return cryptObj.decrypt(encryptedData, iv);
}


function getPhoneNumber(e: any) {
    console.log(JSON.stringify(e.detail))
    if(null === e.detail.encryptedData || undefined === e.detail.encryptedData) {
        uni.showToast({
            icon: 'none',
            title: '登录失败！'
        })
        return;
    }

    uni.showLoading({title: '加载中'})
    uni.checkSession({
        success: result => {
            let data = decryptData(e.detail.encryptedData, e.detail.iv);
            console.log(data)
        },
        fail: result => {
            authorLogin()
        },
        complete: () => {
            uni.hideLoading();
        }
    })
}

</script>

<style scoped lang="scss">

.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    .img {
        width: 120rpx;
        height: 120rpx;
        margin-bottom: 200rpx;
    }
}

</style>