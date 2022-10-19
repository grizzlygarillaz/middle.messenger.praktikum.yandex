import BlockProps from 'typings/interfaces/Block';

export default interface ModalTriggerProps extends BlockProps {
  modal: string,
  openModal: (modal: string) => void
}
