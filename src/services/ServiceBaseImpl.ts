import convertToQueryString from '@Src/utils/services/convertToQueryString';
import { HTTPInstance, ServiceBase } from '@Src/services/ServiceBase';

/**
 * API Request Service Base
 */
class ServiceBaseImpl implements ServiceBase {
  /**
   * HTTP Request Method Instance
   * @type {HTTPInstance}
   */
  public http: HTTPInstance;

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
   * Authorization Token
   * @type {string}
   */
  public token?: string;

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;
    this.headers = {
      // csrf: 'token',
      // Referer: this.baseURL,
    };

    /**
     * HTTP Instance Constructor Injection
     * @type {{head: <R>(url: string, config?: RequestInit) => Promise<R>, patch: <R, A=NonNullable<unknown>>(url: string, data?: A, config?: RequestInit) => Promise<R>, post: <R, A=NonNullable<unknown>>(url: string, data?: A, config?: RequestInit) => Promise<R>, get: <R, A=NonNullable<unknown>>(url: string, params?: A, config?: RequestInit) => Promise<R>, options: <R>(url: string, config?: RequestInit) => Promise<R>, delete: <R>(url: string, config?: RequestInit) => Promise<R>, put: <R, A=NonNullable<unknown>>(url: string, data?: A, config?: RequestInit) => Promise<R>}}
     */
    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
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
   * Common Request Method
   * @param {string} method
   * @param {string} url
   * @param params
   * @param data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   * @private
   */
  private async request<R = unknown>({
    method,
    url,
    params,
    data,
    config,
  }: {
    method: string;
    url: string;
    params?: unknown;
    data?: unknown;
    config?: RequestInit;
  }): Promise<R> {
    try {
      const headers: HeadersInit & { Authorization?: string } = {
        ...this.headers,
        'Content-Type': 'application/json',
        ...config?.headers,
      };

      console.log('this.token = ', this.token);

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const reqUrl =
        method === 'GET' && params
          ? `${url}?${convertToQueryString(params)}`
          : url;

      const response = await fetch(this.baseURL + reqUrl, {
        method,
        headers,
        // credentials: 'include',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: R = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * HTTP GET Method
   * @param {string} url
   * @param {A} params
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public get<R, A = NonNullable<unknown>>(
    url: string,
    params?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>({ method: 'GET', url, params, config });
  }

  /**
   * HTTP DELETE Method
   * @param {string} url
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public delete<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'DELETE', url, config });
  }

  /**
   * HTTP HEAD Method
   * @param {string} url
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public head<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'HEAD', url, config });
  }

  /**
   * HTTP OPTIONS Method
   * @param {string} url
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public options<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'OPTIONS', url, config });
  }

  /**
   * HTTP POST Method
   * @param {string} url
   * @param {A} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public post<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>({ method: 'POST', url, data, config });
  }

  /**
   * HTTP PUT Method
   * @param {string} url
   * @param {A} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public put<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>({ method: 'PUT', url, data, config });
  }

  /**
   * HTTP PATCH Method
   * @param {string} url
   * @param {A} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public patch<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>({ method: 'PATCH', url, data, config });
  }
}

export default ServiceBaseImpl;
