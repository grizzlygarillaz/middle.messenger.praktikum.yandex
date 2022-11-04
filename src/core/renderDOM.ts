import Block from './Block';

export default function renderDOM(rootSelector: string, block: Block) {
  const root = document.querySelector(rootSelector);

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
