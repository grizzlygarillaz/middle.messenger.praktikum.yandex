import { isArrayOrObject, isPlainObject, PlainObject } from './helpers';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HttpBody = Document | XMLHttpRequestBodyInit | null | Record<string, any>;

interface DataProps {
  body?: HttpBody,
  headers?: Record<string, any>,
  timeout?: number,
  retries?: number,
}

interface Options extends DataProps {
  method: METHOD
}

class HTTPTransport {
  static API_URL = process.env.API_ENDPOINT;

  protected endpoint: string;

  constructor(endpoint: string) {
    endpoint = endpoint.replace(/^\//, '');

    this.endpoint = `${HTTPTransport.API_URL}/${endpoint}`;
  }

  public get<Response>(url: string, options?: DataProps): Promise<Response> {
    return this.request(
      url,
      {
        ...options,
        method: METHOD.GET,
      },
    );
  }

  public put<Response>(url: string, options: DataProps): Promise<Response> {
    return this.request(
      url,
      {
        ...options,
        method: METHOD.PUT,
      },
    );
  }

  public post<Response>(url: string, options?: DataProps): Promise<Response> {
    return this.request(
      url,
      {
        ...options,
        method: METHOD.POST,
      },
    );
  }

  public delete<Response>(url: string, data?: DataProps): Promise<Response> {
    return this.request(
      url,
      {
        ...data,
        method: METHOD.DELETE,
      },
    );
  }

  private request<Response>(url: string, options: Options):Promise<Response> {
    const {
      method,
      body,
      headers = { 'Content-Type': 'application/json' },
    } = options;

    url = `${this.endpoint}/${url.replace(/^\//, '')}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === 'GET' && body) {
        url += this.queryStringify(body as Record<string, any>);
      }
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !body) {
        xhr.send();
      } else {
        xhr.send(body as XMLHttpRequestBodyInit);
      }
    });
  }

  private queryStringify(data: PlainObject) {
    if (!isPlainObject(data)) {
      throw new Error('input must be an object');
    }

    return this.getParams(data).map((arr) => arr.join('=')).join('&');
  }

  private getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
  }

  private getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (isArrayOrObject(value)) {
        result.push(...this.getParams(value, this.getKey(key, parentKey)));
      } else {
        result.push([this.getKey(key, parentKey), encodeURIComponent(String(value))]);
      }
    });

    return result;
  }
}

export default HTTPTransport;
