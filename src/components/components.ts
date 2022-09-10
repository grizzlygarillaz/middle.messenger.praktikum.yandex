import registerComponent from '../util/registerComponent';

import Button from './Button';
import Card from './Card';
import CardBody from './Card/Body';
import CardFooter from './Card/Footer';
import CardHeader from './Card/Header';
import Input from './Input';
import Link from './Link';
import Chat from './Chat';
import Message from './Message';
import ChatItem from './ChatItem';
import InputBox from './InputBox';
import InputError from './InputBox/Error';

registerComponent('Button', Button as any);
registerComponent('Card', Card);
registerComponent('CardBody', CardBody);
registerComponent('CardFooter', CardFooter);
registerComponent('CardHeader', CardHeader);
registerComponent('Chat', Chat as any);
registerComponent('ChatItem', ChatItem as any);
registerComponent('Input', Input as any);
registerComponent('InputBox', InputBox as any);
registerComponent('InputError', InputError as any);
registerComponent('Link', Link as any);
registerComponent('Message', Message as any);
