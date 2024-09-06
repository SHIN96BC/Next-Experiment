export interface TestFindAllReq {
  key: string;
}

export interface TestFindAllRes {
  name: string;
  email: string;
  phone: string;
}

export interface TestSaveReq {
  name: string;
  email: string;
  phone: string;
}

export interface TestSaveRes {
  isOk: boolean;
}
