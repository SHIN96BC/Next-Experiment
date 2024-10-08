import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryKey,
  QueryState,
} from '@tanstack/react-query';
import isEqual from '@Src/utils/services/isEqual';

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

/* getQueryClient는 공식문서에서 권장하는대로 서버에서 데이터를 fetching 할 때 마다 필요한 queryClient를 cache해서 사용할 수 있도록 구성 */
export const getQueryClient = cache(() => new QueryClient());

/* getDehydratedQuery는 서버에서 데이터를 prefetching하고 dehydrate한 결과를 return 하도록 구성(SSR) */
export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);
  console.log('dehydrate(queryClient) = ', dehydrate(queryClient));
  const [dehydratedQuery] = queries.filter((query) =>
    isEqual(query.queryKey, queryKey)
  );

  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q['queryFn']>>
  >;
}

// filtering 하지 않고 모든 dehydrated query를 반환하는 함수
export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]['queryFn']>>
  >[];
}

export const Hydrate = HydrationBoundary;

export default {};
