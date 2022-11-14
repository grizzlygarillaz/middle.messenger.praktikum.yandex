import Block from 'core/Block';
import ErrorProps from 'components/InputBox/Error/type';
declare class InputError extends Block<ErrorProps> {
    static componentName: string;
    protected render(): any;
}
export default InputError;
