import { BlockClass } from 'core/Block';
import BlockProps from 'typings/interfaces/Block';
declare type RenderBlockParams<T extends BlockProps> = {
    Block: BlockClass<T>;
    props: T;
    state?: Partial<AppState>;
};
export declare function renderBlock<T extends BlockProps>({ Block, props, state }: RenderBlockParams<T>): Promise<void>;
export declare function step(_name: string, callback: () => void): Promise<void>;
export {};
