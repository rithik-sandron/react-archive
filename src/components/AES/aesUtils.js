import CryptoJS from 'crypto-js';
export function encrypt(plainText, passPhrase) {
    let iterationCount = 100
    let keySize = 256 / 32;
    let iv = CryptoJS.lib.WordArray.random(256 / 16).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.SHA512(plainText).random(256 / 16).toString(CryptoJS.enc.Hex);

    let key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), { keySize: keySize, iterations: iterationCount });
    let encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: CryptoJS.enc.Hex.parse(iv) });
    return btoa(salt + '#/' + iv + '#/' + encrypted.ciphertext.toString(CryptoJS.enc.Base64));
};

export function decrypt(passPhrase, cipherText) {
    let array = atob(cipherText).split('#*');
    let salt = array[0];
    let iv = array[1];
    let cipher = atob(array[2]);
    let iterationCount = 100
    let keySize = 256 / 32;
    let key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), { keySize: keySize, iterations: iterationCount });
    let cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(cipher) });
    let decrypted = CryptoJS.AES.decrypt(cipherParams, key, { iv: CryptoJS.enc.Hex.parse(iv) });
    return btoa(decrypted.toString(CryptoJS.enc.Utf8));
};