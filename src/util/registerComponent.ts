import * as Handlebars from 'handlebars/dist/handlebars.runtime';
import Block from './Blocks/Block';

interface HandlebarsProps {
  data: Record<string, any>,
  fn: (...arg: any) => void,
  hash: any,
}

function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, ({ data, fn, hash }: HandlebarsProps) => {
    const component = new Component(hash);

    if (!data.root.children) {
      data.root.children = {};
    }

    data.root.children[component.id] = component;

    const contents = fn ? fn(this) : '';

    return `<div data-id="${component.id}">${contents}</div>`;
  });
}

export default registerComponent;
