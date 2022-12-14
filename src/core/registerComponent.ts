import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

interface BlockConstructable<Props = any> {
  new (props: Props): Block;
  componentName?: string;
}

function registerComponent<Props extends AnyRecord = {}>(Component: BlockConstructable<Props>) {
  Handlebars.registerHelper(
    Component.componentName ?? Component.name,
    function (this: Props, { hash: { ref, modal, ...hash }, data, fn }: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {};
      }
      if (!data.root.refs) {
        data.root.refs = {};
      }
      if (!data.root.modals) {
        data.root.modals = {};
      }

      const { children, refs, modals } = data.root;
      /**
         * Костыль для того, чтобы передавать переменные
         * внутрь блоков вручную подменяя значение
         */
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === 'string') {
          hash[key] = hash[key].replace(new RegExp(`{{${key as string}}}`, 'i'), this[key]);
        }
      });
      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component;
      }
      if (modal) {
        modals[modal] = component;
      }
      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    },
  );
}

export default registerComponent;
