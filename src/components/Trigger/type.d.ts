import BlockProps from 'typings/interfaces/Block';
export default interface TriggerProps extends BlockProps {
    openModal: string;
    onClick: () => void;
    dataTestId: string;
}
