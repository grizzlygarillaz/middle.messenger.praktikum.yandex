import CloseButtonProps from 'components/CloseButton/type';
import Block from 'core/Block';
declare class CloseButton extends Block<CloseButtonProps> {
    static componentName: string;
    constructor(props: CloseButtonProps);
    protected render(): any;
}
export default CloseButton;
