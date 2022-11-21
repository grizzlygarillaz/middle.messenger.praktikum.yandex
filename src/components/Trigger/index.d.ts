import Block from 'core/Block';
import TriggerProps from 'components/Trigger/type';
declare class Trigger extends Block<TriggerProps> {
    static componentName: string;
    constructor(props: TriggerProps);
    protected render(): any;
}
export default Trigger;
