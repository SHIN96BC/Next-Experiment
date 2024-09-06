import TestService from '@Src/services/test/TestService';
import ServiceImpl from '@Src/services/ServiceImpl';

class ServiceContainer {
  private services: Map<string, any> = new Map<string, any>();

  private token: string | null = null;

  constructor() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
    }
  }

  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service;
  }

  async setToken(token: string): Promise<void> {
    this.token = token;
    localStorage.setItem('token', token);
    await this.updateServicesToken(token);
  }

  async clearToken(): Promise<void> {
    this.token = null;
    localStorage.removeItem('token');
    await this.updateServicesToken(null);
  }

  // token update를 비동기로 병렬처리해서 성능을 향상시킨다.
  private async updateServicesToken(token: string | null): Promise<void> {
    const updates = Array.from(this.services.values()).map(async (service) => {
      if ('setToken' in service && typeof service.setToken === 'function') {
        await service.setToken(token);
      }
    });
    await Promise.all(updates);
  }
}

export const serviceContainer = new ServiceContainer();

/// ///////////////////////////////////////////////////////////////////////////////////////////////
// region - Dependency Injection
/// ///////////////////////////////////////////////////////////////////////////////////////////////

export const service = new ServiceImpl();

serviceContainer.register<TestService>('testService', new TestService(service));

/// ///////////////////////////////////////////////////////////////////////////////////////////////
// endregion - Dependency Injection
/// ///////////////////////////////////////////////////////////////////////////////////////////////
