import convertToQueryString from '@Src/services/convertToQueryString';
import { FileInstance, Service } from '@Src/services/Service';

interface HTTPInstance {
  get<R, A = NonNullable<unknown>>(
    url: string,
    params?: A,
    config?: RequestInit
  ): Promise<R>;
  delete<R>(url: string, config?: RequestInit): Promise<R>;
  head<R>(url: string, config?: RequestInit): Promise<R>;
  options<R>(url: string, config?: RequestInit): Promise<R>;
  post<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R>;
  put<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R>;
  patch<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R>;
}

export interface ServiceImplInterface {
  file: FileInstance;
  fileUpload: (
    url: string,
    data: FormData,
    config?: RequestInit
  ) => Promise<boolean>;
}

class ServiceImpl implements Service {
  public http: HTTPInstance;

  private baseURL: string;

  private headers: Record<string, string>;

  public file: FileInstance;

  public token?: string;

  constructor() {
    this.baseURL = `${process.env.API_SERVER_URL}`;
    this.headers = {
      // csrf: 'token',
      // Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };

    this.file = {
      fileUpload: this.fileUpload.bind(this),
    };
  }

  public setToken(token: string) {
    this.token = token;
  }

  private async request<R = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<R> {
    try {
      const headers: HeadersInit & { Authorization?: string } = {
        ...this.headers,
        'Content-Type': 'application/json',
        ...config?.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const reqUrl =
        method === 'GET' && data ? `${url}?${convertToQueryString(data)}` : url;

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

  private async fileRequest(
    method: string,
    url: string,
    data: FormData,
    config?: RequestInit
  ): Promise<boolean> {
    try {
      const response = await fetch(url, {
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

  public get<R, A = NonNullable<unknown>>(
    url: string,
    params?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>('GET', url, params, config);
  }

  public delete<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>('DELETE', url, undefined, config);
  }

  public head<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>('HEAD', url, undefined, config);
  }

  public options<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>('OPTIONS', url, undefined, config);
  }

  public post<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>('POST', url, data, config);
  }

  public put<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>('PUT', url, data, config);
  }

  public patch<R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ): Promise<R> {
    return this.request<R>('PATCH', url, data, config);
  }

  public fileUpload(url: string, data: FormData, config?: RequestInit) {
    return this.fileRequest('POST', url, data, config);
  }
}

export default ServiceImpl;
