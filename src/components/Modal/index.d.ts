import Block from 'core/Block';
import ModalProps from 'components/Modal/type';
declare class Modal extends Block<ModalProps> {
    static componentName: string;
    constructor(props: ModalProps);
    protected render(): any;
    protected init(): void;
}
export default Modal;
