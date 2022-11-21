import Block from 'core/Block';
import ButtonProps from 'components/Button/type';
declare class Button extends Block<ButtonProps> {
    static componentName: string;
    constructor(props: ButtonProps);
    protected render(): any;
}
export default Button;
