import { Block } from 'core/index';
declare type WithUserProps = {
    user: User | null;
};
export default function withUser<P extends WithUserProps>(Wrapper: typeof Block<P>): {
    new (props?: Omit<P, "user">): Block<Omit<P, "user">>;
    EVENTS: {
        readonly INIT: "init";
        readonly FLOW_CDM: "flow:component-did-mount";
        readonly FLOW_CDU: "flow:component-did-update";
        readonly FLOW_CWU: "flow:component-will-unmount";
        readonly FLOW_RENDER: "flow:render";
    };
    componentName?: string | undefined;
};
export {};
