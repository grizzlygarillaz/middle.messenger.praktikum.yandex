import BlockProps from 'typings/interfaces/Block';
export interface BlockClass<P extends AnyRecord> extends Function {
    new (props: P): Block<P>;
    componentName?: string;
}
declare class Block<P extends Record<string, any> = BlockProps> {
    static EVENTS: {
        readonly INIT: "init";
        readonly FLOW_CDM: "flow:component-did-mount";
        readonly FLOW_CDU: "flow:component-did-update";
        readonly FLOW_CWU: "flow:component-will-unmount";
        readonly FLOW_RENDER: "flow:render";
    };
    id: string;
    static componentName?: string;
    protected props: P;
    protected children: {
        [id: string]: Block;
    };
    private _element;
    private eventBus;
    protected refs: {
        [key: string]: Block;
    };
    protected modals: {
        [key: string]: Block;
    };
    constructor(props?: P);
    protected init(): void;
    private _addEvents;
    private _registerEvents;
    private _createDocumentElement;
    private _createResources;
    setProps: (nextProps: any) => void;
    get element(): HTMLUnknownElement;
    getContent(): HTMLUnknownElement;
    private _compile;
    private _render;
    protected render(): string;
    private _componentDidMount;
    protected componentDidMount(props: P): void;
    private _componentDidUpdate;
    protected componentDidUpdate(oldProps: P, newProps: P): boolean;
    private _componentWillUnmount;
    protected componentWillUnmount(): void;
    private _removeEvents;
    _checkInDom(): void;
    private _makePropsProxy;
    show(): void;
    hide(): void;
    protected refresh(): void;
}
export default Block;
export { BlockProps };
