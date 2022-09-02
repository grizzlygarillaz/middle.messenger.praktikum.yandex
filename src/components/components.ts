import Handlebars from 'handlebars/dist/handlebars.runtime';

import button from './Button/button.hbs';
import card from './card.hbs';
import chatList from './chat_list.hbs';
import chat from './chat.hbs';
import chatPanel from './chat_panel.hbs';
import message from './messages.hbs';
import input from './input.hbs';

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('card', card);
Handlebars.registerPartial('chat-list', chatList);
Handlebars.registerPartial('chat-panel', chatPanel);
Handlebars.registerPartial('chat', chat);
Handlebars.registerPartial('message', message);
Handlebars.registerPartial('input', input);
