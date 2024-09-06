import {
  TestFindAllReq,
  TestFindAllRes,
  TestSaveReq,
  TestSaveRes,
} from '@Src/services/test/model';
import { Service } from '@Src/services/Service';
import ServiceImpl from '@Src/services/ServiceImpl';

class TestService {
  private service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  getTest(params: TestFindAllReq) {
    return this.service.get<TestFindAllRes, TestFindAllReq>('', params);
  }

  addTest(data: TestSaveReq) {
    return this.service.post<TestSaveRes, TestSaveReq>('/test', data);
  }
}

export default TestService;

// const testService = new TestService();
//
// export default testService;
