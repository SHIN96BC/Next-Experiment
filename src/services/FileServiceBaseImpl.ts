import { FileInstance } from '@Src/services/ServiceBase';
import { FileServiceBase } from '@Src/services/FileServiceBase';

/**
 * API File Request Base
 */
class FileServiceBaseImpl implements FileServiceBase {
  /**
   * API Request Base URL
   * @type {string}
   * @private
   */
  private baseURL: string;

  /**
   * HTTP Request Header
   * @type {Record<string, string>}
   * @private
   */
  private headers: Record<string, string>;

  /**
   * File Request Method Instance
   * @type {FileInstance}
   */
  public file: FileInstance;

  /**
   * Authorization Token
   * @type {string}
   */
  public token?: string;

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_API_FILE_SERVER_URL}`;
    this.headers = {
      // csrf: 'token',
      // Referer: this.baseURL,
    };

    /**
     * File Instance Constructor Injection
     * @type {{fileUpload: (url: string, data: FormData, config?: RequestInit) => Promise<boolean>}}
     */
    this.file = {
      fileUpload: this.fileUpload.bind(this),
    };
  }

  /**
   * Authorization Token Set Method
   * @param {string} token
   */
  public setToken(token: string) {
    this.token = token;
  }

  /**
   * Common File Request Method
   * @param {string} method
   * @param {string} url
   * @param {FormData} data
   * @param {RequestInit} config
   * @returns {Promise<boolean>}
   * @private
   */
  private async fileRequest(
    method: string,
    url: string,
    data: FormData,
    config?: RequestInit
  ): Promise<boolean> {
    try {
      const response = await fetch(this.baseURL + url, {
        method,
        headers: {
          ...this.headers,
          // 'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
        // credentials: 'include',
        body: data,
        ...config,
      });

      console.log('response = ', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // const responseData: R = await response.json();
      return true;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * File Upload Method
   * @param {string} url
   * @param {FormData} data
   * @param {RequestInit} config
   * @returns {Promise<boolean>}
   */
  public fileUpload(url: string, data: FormData, config?: RequestInit) {
    return this.fileRequest('POST', url, data, config);
  }
}

export default FileServiceBaseImpl;
