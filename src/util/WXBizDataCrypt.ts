import CryptoJS from "crypto-js";

export function WXBizDataCrypt(id: string, session: string) {
	const sessionKeyStr = CryptoJS.enc.Base64.parse(session)

	function decrypt(encryptData: string, iv: string) {

		let ivBase64Str = CryptoJS.enc.Base64.parse(iv);
		let encryptedBase64Str = CryptoJS.enc.Base64.parse(encryptData)

		let cipherParams = CryptoJS.lib.CipherParams.create({
			ciphertext: encryptedBase64Str,
			key: sessionKeyStr,
			iv: ivBase64Str,
			algorithm: CryptoJS.algo.AES,
			padding: CryptoJS.pad.Pkcs7,
		})
		let decoded = CryptoJS.AES.decrypt(cipherParams, sessionKeyStr).toString(CryptoJS.enc.Utf8);
		console.log(`-----> decoded: ${decoded}`)
		let decodeObj = JSON.parse(decoded);
		if(decodeObj.watermard.appid !== id) {
			throw new Error('Illegal Buffer')
		}
		return decoded;
	}

	return {
		decrypt
	}
}