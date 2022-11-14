import Block from 'core/Block';
import InputBoxProps from 'components/InputBox/type';
declare class InputBox extends Block<InputBoxProps> {
    static componentName: string;
    constructor(props: InputBoxProps);
    checkValid(): boolean;
    get inputs(): Block[];
    get errors(): Block[];
    protected render(): any;
}
export default InputBox;
