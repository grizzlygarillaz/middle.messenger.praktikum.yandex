import Block from 'core/Block';
import LinkProps from 'components/Link/type';
declare class Link extends Block<LinkProps> {
    static componentName: string;
    constructor(props: LinkProps);
    protected render(): any;
    navigate(): void;
}
export default Link;
