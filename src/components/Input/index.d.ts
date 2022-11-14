import Block from 'core/Block';
import { InputProps } from 'components/Input/type';
declare class Input extends Block<InputProps> {
    static componentName: string;
    constructor(props: InputProps);
    checkValid(): boolean;
    get value(): string;
    get name(): string;
    protected render(): any;
}
export default Input;
