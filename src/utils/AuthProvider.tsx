'use client';

import { ReactNode, useEffect } from 'react';
import serviceContainer from '@Src/services/ServiceContainer';
import { AUTH_TOKEN_STORAGE_KEY } from '@Src/constants/auth';
import customLocalStorage from '@Src/utils/storages/customLocalStorage';
import { useDispatch } from 'react-redux';
import { setAuth } from '@Src/lib/features/auth/authSlice';

/**
 * Auth Provider
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 * @constructor
 */
export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = customLocalStorage.get(AUTH_TOKEN_STORAGE_KEY);
    if (storedToken) {
      // api service 객체들에 token 세팅
      serviceContainer.setToken(storedToken);
      // redux에 토큰 세팅
      dispatch(setAuth({ name: '길동홍', token: storedToken }));
    }
  }, [dispatch]);

  return children;
}
