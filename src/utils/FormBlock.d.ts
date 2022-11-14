import Block from 'core/Block';
import BlockProps from 'typings/interfaces/Block';
import { Store } from 'core/index';
export interface FormProps extends BlockProps {
    submit: () => void;
    formError?: string;
    store: Store<AppState>;
}
export default class FormBlock<T extends {} = FormProps> extends Block<T> {
    get valid(): boolean;
    get inputComponents(): Block<BlockProps>[];
    get inputs(): Block<BlockProps>[];
    validate(): void;
    onSubmit(): void;
    get form_value(): Record<string, any>;
}
