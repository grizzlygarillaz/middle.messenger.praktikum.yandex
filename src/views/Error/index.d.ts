import ErrorProps from 'views/Error/type';
import Block from 'core/Block';
export declare const ERROR_TEMPLATE: {
    403: {
        code: number;
        message: string;
    };
    404: {
        code: number;
        message: string;
    };
    418: {
        code: number;
        message: string;
    };
};
declare class ErrorPage extends Block<ErrorProps> {
    static componentName: string;
    constructor(props: ErrorProps);
    render(): any;
}
export default ErrorPage;
