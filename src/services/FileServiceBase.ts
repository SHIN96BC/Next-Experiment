import { FileInstance } from '@Src/services/ServiceBase';

export interface FileServiceBase {
  file?: FileInstance;
  token?: string;
  setToken?: (token: string) => void;
  fileUpload: (url: string, data: FormData, config: RequestInit) => void;
}
