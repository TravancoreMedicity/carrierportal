import CryptoJS from 'crypto-js';

// const secretKey = 'hkjhfs44544*&*&H90dbjb098oK8ILKN'; // Use a strong, unique key

/**
 * Decrypts an encrypted text using AES encryption.
 *
 * @param {string} encryptedText - The encrypted text to be decrypted. It should be in the format "iv:encrypted".
 * @return {string} The decrypted text.
 */
export const decrypt = (encryptedText) => {
    // const [iv, encrypted] = encryptedText.split(':');
    const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Base64.parse('hkjhfs44544*&*&H90dbjb098oK8ILKN'), {
        iv: CryptoJS.enc.Base64.parse('hkjhfs44544*&*&H'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};