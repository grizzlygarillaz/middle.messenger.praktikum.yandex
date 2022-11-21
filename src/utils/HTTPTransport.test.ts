import HTTPTransport from './HTTPTransport';

describe('utils/HTTPTranspert', () => {
  const http = new HTTPTransport('test');

  describe('GET', () => {
    it('should response {response: "get"}', () => {
      http.get('get').then((res: any) => {
        expect(res.response).toEqual('get');
      });
    });
  });

  describe('POST', () => {
    it('should return {response: "post"}', () => {
      http.post('post').then((res: any) => {
        expect(res.response).toEqual('post');
      });
    });
  });

  describe('PUT', () => {
    it('should return {response: "put"}', () => {
      http.put('put').then((res: any) => {
        expect(res.response).toEqual('put');
      });
    });
  });

  describe('DELETE', () => {
    it('should return {response: "delete"}', () => {
      http.delete('delete').then((res: any) => {
        expect(res.response).toEqual('delete');
      });
    });
  });
});
