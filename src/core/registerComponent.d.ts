import Block from './Block';
interface BlockConstructable<Props = any> {
    new (props: Props): Block;
    componentName?: string;
}
declare function registerComponent<Props extends AnyRecord = {}>(Component: BlockConstructable<Props>): void;
export default registerComponent;
