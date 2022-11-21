import Block from 'core/Block';
interface SpinnerProps {
    size: string;
    theme: string;
}
declare class Spinner extends Block<SpinnerProps> {
    static componentName: string;
    constructor(props: SpinnerProps);
    protected render(): any;
}
export default Spinner;
