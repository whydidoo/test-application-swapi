import { useCallback, useMemo } from 'react';
import {
  useLocation,
  useNavigate,
  useSearchParams,
  URLSearchParamsInit,
  createSearchParams,
} from 'react-router-dom';

type TQueryHookParams = {
  currentPathName?: boolean;
};

export function useGetQueryParamsLocation<T>({
  currentPathName = false,
}: TQueryHookParams = {}) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()) as unknown as T,
    [searchParams]
  );

  const changeQuery = useCallback(
    (values: T) => {
      const nextParams = {
        ...queryParams,
        ...values,
      } as unknown as URLSearchParamsInit;

      // Данная конструкция помогает изменять search от текущего path
      if (currentPathName) {
        return navigate({
          search: `?${createSearchParams(nextParams)}`,
          pathname,
        });
      }

      setSearchParams(nextParams);
    },
    [currentPathName, setSearchParams, navigate, queryParams, pathname]
  );

  return {
    queryParams,
    changeQuery,
  };
}
