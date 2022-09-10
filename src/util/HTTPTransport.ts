enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HttpBody = Document | XMLHttpRequestBodyInit | null;

interface Options {
  method: METHOD,
  data?: HttpBody,
  headers?: Record<string, string>,
  timeout?: number,
  retries?: number,
}

class HTTPTransport {
  public get = (url: string, options: Options = {} as Options) => this.request(
    url,
    { ...options, method: METHOD.GET },
  );

  public put = (url: string, options: Options = {} as Options) => this.request(
    url,
    { ...options, method: METHOD.PUT },
  );

  public post = (url: string, options: Options = {} as Options) => this.request(
    url,
    { ...options, method: METHOD.POST },
  );

  public delete = (url: string, options: Options = {} as Options) => this.request(
    url,
    { ...options, method: METHOD.DELETE },
  );

  private request = (url: string, options: Options) => {
    const {
      method,
      data,
      headers = {},
      timeout = 5000,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === 'GET' && data) {
        url += this.queryStringify(data);
      }
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === 'GET' || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };

  protected queryStringify(data: HttpBody) : string {
    const stringData: string[] = [];

    if (data) {
      Object.keys(data).forEach((key: keyof HttpBody) => {
        const value = Array.isArray(data[key]) ? (data[key] as []).join(',') : data[key];
        stringData.push(`${key}=${value}`);
      });

      return `?${stringData.join('&')}`;
    }

    return '';
  }

  public fetchWithRetry(url : string, options: Options) : Promise<unknown> {
    options.retries = options.retries === undefined ? 5 : options.retries;
    try {
      return new HTTPTransport().post(url, options);
    } catch (err) {
      if (options.retries < 1) {
        throw err;
      }
      options.retries -= 1;
      return this.fetchWithRetry(url, options);
    }
  }
}

export default HTTPTransport;
