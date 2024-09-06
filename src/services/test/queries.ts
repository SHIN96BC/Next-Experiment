import TestService from '@Src/services/test/TestService';
import { TestFindAllReq, TestSaveReq } from '@Src/services/test/model';
import { serviceContainer } from '@Src/services/ServiceContainer';

const queryKeys = {
  findAll: ['test'] as const,
};

const queryOptions = {
  findAll: (params: TestFindAllReq) => ({
    queryKey: queryKeys.findAll,
    queryFn: () =>
      serviceContainer.resolve<TestService>('testService').getTest(params),
  }),
  save: () => ({
    mutationFn: (data: TestSaveReq) =>
      serviceContainer.resolve<TestService>('testService').addTest(data),
  }),
};

export default queryOptions;
