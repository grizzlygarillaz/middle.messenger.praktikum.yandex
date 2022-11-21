import { Block } from 'core/index';
declare const _default: {
    new (props?: any): Block<any>;
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
