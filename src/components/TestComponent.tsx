'use client';

import { useEffect } from 'react';
import serviceContainer from '@Src/services/ServiceContainer';
import { useFindAllTest } from '@Src/services/test/useTestService';

export default function TestComponent() {
  const { data, refetch } = useFindAllTest({ key: 'test' });

  useEffect(() => {
    serviceContainer.setToken(
      'testToken@#!#!@#!@#!@#!@#!@#$@%#$%^RDfsdfDSFSFASDF'
    );
  }, []);

  return (
    <div>
      <button type="button">Test Api</button>
    </div>
  );
}
