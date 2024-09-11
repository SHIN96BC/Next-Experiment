import {
  TestFindAllReq,
  TestFindAllRes,
  TestSaveReq,
  TestSaveRes,
} from '@Src/services/test/model';
import { ServiceBase } from '@Src/services/ServiceBase';

class TestService {
  /**
   * API Service 객체
   * @type {ServiceBase}
   * @private
   */
  private service: ServiceBase;

  /**
   * 생성자 주입
   * @param {ServiceBase} service
   */
  constructor(service: ServiceBase) {
    this.service = service;
  }

  /**
   * 테스트 전체 조회
   * @param {TestFindAllReq} params
   * @returns {Promise<TestFindAllRes>}
   */
  getTest(params: TestFindAllReq) {
    return this.service.get<TestFindAllRes, TestFindAllReq>('/test', params);
  }

  /**
   * 테스트 등록
   * @param {TestSaveReq} data
   * @returns {Promise<TestSaveRes>}
   */
  addTest(data: TestSaveReq) {
    return this.service.post<TestSaveRes, TestSaveReq>('/test', data);
  }
}

export default TestService;

// const testService = new TestService();
//
// export default testService;
