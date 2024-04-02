import {defineStore} from "pinia";
import {ref} from "vue";


export const useUserStore = defineStore('user', () => {

	const openID = ref("")
	const sessionKey = ref("")

	const nickName = ref("")
	const avatarUrl = ref("")


	function setID(id: string) {
		openID.value = id;
	}

	function setSessionKey(key: string) {
		sessionKey.value = key;
	}

	function setNickName(name: string) {
		nickName.value = name;
	}

	function setAvatarUrl(avatar: string) {
		avatarUrl.value = avatar;
	}

	return {
		openID, setID,
		sessionKey, setSessionKey,
		nickName, setNickName,
		avatarUrl, setAvatarUrl,
	}

})