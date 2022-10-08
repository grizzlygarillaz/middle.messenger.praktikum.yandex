import HTTPTransport from '../util/HTTPTransport';

abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}

interface CreateApiMethod {
  create(data: unknown): Promise<unknown>
}

interface StoreApiMethod {
  store(data: unknown): Promise<unknown>
}

interface ReadApiMethod {
  read(id: string): Promise<unknown>
}

interface UpdateApiMethod {
  update(id: string, data: unknown): Promise<unknown>
}

interface DeleteApiMethod {
  delete(id: string): Promise<unknown>
}

export {
  BaseAPI,
  CreateApiMethod,
  ReadApiMethod,
  UpdateApiMethod,
  DeleteApiMethod,
  StoreApiMethod,
};
