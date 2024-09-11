export interface HTTPInstance {
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

export interface FileInstance {
  fileUpload(
    url: string,
    data: FormData,
    config?: RequestInit
  ): Promise<boolean>;
}

export interface ServiceBase {
  http: HTTPInstance;
  token?: string;
  setToken?: (token: string) => void;
  get: <R, A = NonNullable<unknown>>(
    url: string,
    params?: A,
    config?: RequestInit
  ) => Promise<R>;
  post: <R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ) => Promise<R>;
  put: <R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ) => Promise<R>;
  patch: <R, A = NonNullable<unknown>>(
    url: string,
    data?: A,
    config?: RequestInit
  ) => Promise<R>;
  delete: <R>(url: string, config?: RequestInit) => Promise<R>;
  head: <R>(url: string, config?: RequestInit) => Promise<R>;
  options: <R>(url: string, config?: RequestInit) => Promise<R>;
}
