import HTTPTransport from 'utils/HTTPTransport';

export interface ErrorResponse {
  reason: string
}

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
  read(data: unknown): Promise<unknown>
}

interface UpdateApiMethod {
  update(id: string | number, data: unknown): Promise<unknown>
}

interface DeleteApiMethod {
  delete(id: string | number): Promise<unknown>
}

export {
  BaseAPI,
  CreateApiMethod,
  ReadApiMethod,
  UpdateApiMethod,
  DeleteApiMethod,
  StoreApiMethod,
};
