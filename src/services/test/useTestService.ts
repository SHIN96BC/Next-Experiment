import { useMutation, useQuery } from '@tanstack/react-query';
import queryOptions from '@Src/services/test/queries';
import { TestFindAllReq } from '@Src/services/test/model';

export const useFindAllTest = (params: TestFindAllReq) =>
  useQuery(queryOptions.findAll(params));

export const useSaveTest = () => useMutation(queryOptions.save());
