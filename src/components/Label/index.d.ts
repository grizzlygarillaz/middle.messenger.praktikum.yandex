import Block from 'core/Block';
import LabelProps from 'components/Label/type';
declare class Label extends Block<LabelProps> {
    static componentName: string;
    protected render(): any;
}
export default Label;
