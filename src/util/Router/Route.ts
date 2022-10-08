import Block from '../Blocks/Block';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error('root not found');
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly query: string,
    private readonly BlockClass: typeof Block,
  ) {
  }
  //
  // navigate(pathname: string) {
  //   if (this.match(pathname)) {
  //     this.pathname = pathname;
  //     this.render();
  //   }
  // }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});

      render(this.query, this.block);
    }
  }
}

export default Route;
