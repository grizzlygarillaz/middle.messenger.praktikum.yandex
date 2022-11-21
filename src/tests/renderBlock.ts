import { BlockClass } from 'core/Block';
import * as components from 'components';
import {
  PathRouter, registerComponent, renderDOM, Store,
} from 'core/index';
import defaultState from 'core/Store';
import BlockProps from 'typings/interfaces/Block';
import { sleep } from 'utils/helpers';
import { initRouter } from '../router';

type RenderBlockParams<T extends BlockProps> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends BlockProps>(
  { Block, props, state = defaultState }: RenderBlockParams<T>,
) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  const router = new PathRouter();

  window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM('#app', new Block(props));

  initRouter(router, store);

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();
}

export async function step(_name: string, callback: () => void) {
  await callback();
}
