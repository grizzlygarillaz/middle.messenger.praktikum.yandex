import { Block, Store } from 'core/index';
declare type WithStateProps = {
    store: Store<AppState>;
};
export declare function withStore<P extends WithStateProps>(WrappedBlock: typeof Block): {
    new (props?: Omit<P, "store">): Block<Omit<P, "store">>;
    EVENTS: {
        readonly INIT: "init";
        readonly FLOW_CDM: "flow:component-did-mount";
        readonly FLOW_CDU: "flow:component-did-update";
        readonly FLOW_CWU: "flow:component-will-unmount";
        readonly FLOW_RENDER: "flow:render";
    };
    componentName?: string | undefined;
};
export default withStore;
