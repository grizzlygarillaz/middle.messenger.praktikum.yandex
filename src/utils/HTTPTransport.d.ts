declare type HttpBody = Document | XMLHttpRequestBodyInit | null | Record<string, any>;
interface DataProps {
    body?: HttpBody;
    headers?: Record<string, any>;
    timeout?: number;
    retries?: number;
}
declare class HTTPTransport {
    static API_URL: string | undefined;
    protected endpoint: string;
    constructor(endpoint: string);
    get<Response>(url: string, options?: DataProps): Promise<Response>;
    put<Response>(url: string, options: DataProps): Promise<Response>;
    post<Response>(url: string, options?: DataProps): Promise<Response>;
    delete<Response>(url: string, data?: DataProps): Promise<Response>;
    private request;
    private queryStringify;
    private getKey;
    private getParams;
}
export default HTTPTransport;
