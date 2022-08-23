import Handlebars from "handlebars/dist/handlebars.runtime";

import button from "./button.hbs";
import card from "./card.hbs";
import chat_list from "./chat_list.hbs";
import chat from "./chat.hbs";
import chat_panel from "./chat_panel.hbs";
import message from "./messages.hbs";
import input from "./input.hbs";

Handlebars.registerPartial('button', button);
Handlebars.registerPartial('card', card);
Handlebars.registerPartial('chat_list', chat_list);
Handlebars.registerPartial('chat_panel', chat_panel);
Handlebars.registerPartial('chat', chat);
Handlebars.registerPartial('message', message);
Handlebars.registerPartial('input', input);