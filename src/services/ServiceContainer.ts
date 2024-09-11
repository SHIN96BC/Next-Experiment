import TestService from '@Src/services/test/TestService';
import ServiceBaseImpl from '@Src/services/ServiceBaseImpl';
import FileServiceBaseImpl from '@Src/services/FileServiceBaseImpl';
import { ServiceBase } from '@Src/services/ServiceBase';
import { FileServiceBase } from '@Src/services/FileServiceBase';
import customLocalStorage from '@Src/utils/storages/customLocalStorage';
import { AUTH_TOKEN_STORAGE_KEY } from '@Src/constants/auth';

/**
 * API Service Dependency Injection Container
 */
class ServiceContainer {
  /**
   * Service Base Instance Map
   * @type {Map<string, any>}
   * @private
   */
  private readonly serviceBases: Map<string, any> = new Map<string, any>();

  /**
   * Service Instance Map
   * @type {Map<string, any>}
   * @private
   */
  private readonly services: Map<string, any> = new Map<string, any>();

  /**
   * Authorization Token
   * @type {string | null}
   * @private
   */
  private token: string | null = null;

  /**
   * Service Base Register Method
   * @param {string} name
   * @param {T} service
   */
  public registerServiceBase<T>(name: string, service: T): void {
    this.serviceBases.set(name, service);
  }

  /**
   * Service Register Method
   * @param {string} name
   * @param {T} service
   */
  public registerService<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  /**
   * Service Resolve Method
   * @param {string} name
   * @returns {T}
   */
  public resolveService<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service;
  }

  /**
   * Set Token Method
   * @param {string} token
   * @returns {Promise<void>}
   */
  public async setToken(token: string): Promise<void> {
    this.token = token;
    if (typeof window !== 'undefined') {
      customLocalStorage.set(AUTH_TOKEN_STORAGE_KEY, token);
    }
    await this.updateServicesToken(token);
  }

  /**
   * Clear Token Method
   * @returns {Promise<void>}
   */
  public async clearToken(): Promise<void> {
    this.token = null;
    if (typeof window !== 'undefined') {
      customLocalStorage.remove(AUTH_TOKEN_STORAGE_KEY);
    }
    await this.updateServicesToken(null);
  }

  /**
   * Update Token Method(Service Base Instance)
   * @param {string | null} token
   * @returns {Promise<void>}
   * @private
   */
  // token update를 비동기로 병렬처리해서 성능을 향상시킨다.
  private async updateServicesToken(token: string | null): Promise<void> {
    const updates = Array.from(this.serviceBases.values()).map(
      async (service) => {
        if ('setToken' in service && typeof service.setToken === 'function') {
          await service.setToken(token);
        }
      }
    );
    await Promise.all(updates);
  }
}

/**
 * Service Container Instance
 * @type {ServiceContainer}
 */
const serviceContainer = new ServiceContainer();

/// ///////////////////////////////////////////////////////////////////////////////////////////////
// region - Dependency Injection
/// ///////////////////////////////////////////////////////////////////////////////////////////////

const serviceBaseImpl = new ServiceBaseImpl();
const fileServiceBaseImpl = new FileServiceBaseImpl();

// * SET Service Base Instance
serviceContainer.registerServiceBase<ServiceBase>(
  'serviceBase',
  serviceBaseImpl
);
serviceContainer.registerServiceBase<FileServiceBase>(
  'fileServiceBase',
  fileServiceBaseImpl
);

// * SET Service Instance
serviceContainer.registerService<TestService>(
  'testService',
  new TestService(serviceBaseImpl)
);

export default serviceContainer;

/// ///////////////////////////////////////////////////////////////////////////////////////////////
// endregion - Dependency Injection
/// ///////////////////////////////////////////////////////////////////////////////////////////////
