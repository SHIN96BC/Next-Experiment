import TestService from '@Src/services/test/TestService';
import { TestFindAllReq, TestSaveReq } from '@Src/services/test/model';
import serviceContainer from '@Src/services/ServiceContainer';

/**
 * React Query Keys Object
 * @type {{findAll: readonly [string]}}
 */
const queryKeys = {
  findAll: ['test'] as const,
};

/**
 * React Query Options Object
 * @type {{save: () => {mutationFn: (data: TestSaveReq) => Promise<TestSaveRes>}, findAll: (params: TestFindAllReq) => {queryKey: readonly [string], queryFn: () => Promise<TestFindAllRes>}}}
 */
const queryOptions = {
  findAll: (params: TestFindAllReq) => ({
    queryKey: queryKeys.findAll,
    queryFn: () =>
      serviceContainer
        .resolveService<TestService>('testService')
        .getTest(params),
  }),
  save: () => ({
    mutationFn: (data: TestSaveReq) =>
      serviceContainer.resolveService<TestService>('testService').addTest(data),
  }),
};

export default queryOptions;
