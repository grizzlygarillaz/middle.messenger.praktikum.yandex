import * as Handlebars from 'handlebars/dist/handlebars.runtime';
import Block from './Block';

function registerComponent(name: string, Component: typeof Block) {
  console.log(Component);
  Handlebars.registerHelper(name, ({ data, fn, hash }) => {
    const component = new Component(hash);

    if (!data.root.children) {
      data.root.children = {};
    }

    data.root.children[component.id] = component;

    return `<div data-id="${component.id}"></div>`;
  });
}

export default registerComponent;
