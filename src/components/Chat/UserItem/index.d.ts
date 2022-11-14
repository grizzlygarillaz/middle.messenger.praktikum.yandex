import Block from 'core/Block';
import { Store } from 'core/index';
declare const _default: {
    new (props?: Omit<{
        store: Store<AppState>;
    }, "store">): Block<Omit<{
        store: Store<AppState>;
    }, "store">>;
    EVENTS: {
        readonly INIT: "init";
        readonly FLOW_CDM: "flow:component-did-mount";
        readonly FLOW_CDU: "flow:component-did-update";
        readonly FLOW_CWU: "flow:component-will-unmount";
        readonly FLOW_RENDER: "flow:render";
    };
    componentName?: string | undefined;
};
export default _default;
