import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
const getEncryptedStr = (str: string, key: string): string =>
  AES.encrypt(str, key).toString();
const getDecryptedStr = (str: string, key: string): string =>
  AES.decrypt(str, key).toString(enc);

export default class customSessionStorage {
  static set = (key: string, object: any): void => {
    if (typeof object === 'undefined' || !secretKey) {
      return;
    }

    const str = JSON.stringify(object);

    sessionStorage.setItem(key, getEncryptedStr(str, secretKey));
  };

  static get = (key: string): any => {
    try {
      const object: string = sessionStorage.getItem(key)!;

      if (typeof object === 'undefined' || !secretKey) {
        return undefined;
      }

      return JSON.parse(getDecryptedStr(object, secretKey));
    } catch {
      return undefined;
    }
  };

  static remove = (key: string): void => {
    sessionStorage.removeItem(key);
  };

  static clear = (): void => {
    sessionStorage.clear();
  };
}
