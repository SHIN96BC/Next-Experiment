import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@Src/services/test/queries';
import { TestFindAllReq } from '@Src/services/test/model';
import { useSelector } from 'react-redux';
import { RootState } from '@Src/lib/features/store';

/**
 * Find All Test
 * @param {TestFindAllReq} params
 * @returns {UseQueryResult<TestFindAllRes, DefaultError>}
 */
export const useFindAllTest = (params: TestFindAllReq) => {
  const authToken = useSelector<RootState>((state) => state.auth.token);

  return useQuery({
    ...queryOptions.findAll(params),
    enabled: !!authToken,
  });
};

/**
 * Save Test
 * @returns {UseMutationResult<TestSaveRes, DefaultError, TestSaveReq, unknown>}
 */
export const useSaveTest = () => useMutation(queryOptions.save());
