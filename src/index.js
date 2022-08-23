import "/src/style.sass";
import icons from "/src/img/icons";
import "/src/components/components";
import pages from "/src/views/views";

const chats = [
  {name: "Chat 1", lastMessage: {text: "Some text from chat no 1"}, unread: 1, date: "00:00"},
  {name: "Chat 2", lastMessage: {text: "Some text from chat no 1", author: "Text Author"}, date: "01:00"},
  {name: "Chat 3", lastMessage: {text: "Some large text from giga large chat number 3, with some people"}, date: "02:00"},
  {name: "Chat 4", lastMessage: {text: "Some text from chat no 1"}, unread: 123, date: "05:00"},
  {name: "Chat 5", lastMessage: {text: "Some text from chat no 1"}, unread: 4, date: "06:00"},
  {name: "Chat 6", lastMessage: {text: "Some text from chat no 1"}, unread: 4, date: "09:00"},
  {name: "Chat 7", lastMessage: {text: "Some text from chat no 1"}, unread: 4, date: "12:00"},
];

const messages = [
  {own: false, author: "User name", date: "00:00", data: {text: "Hello world"}},
  {own: true, author: "User name", date: "00:00", data: {text: "Hello world"}},
  {own: false, author: "User name", date: "00:00", data: {text: `Hello world! This is the longest text in a current chat`}},
];

window.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector("#app");

  let page = window.location.pathname.replace(/^\/|\/$/, '').replace(/\//, '.')
  if (!page) {
    return
  }
  if (pages.hasOwnProperty(page)) {
    app.innerHTML = pages[page]({chats, icons, messages});
  } else {
    app.innerHTML = pages.error({code: 404, message: 'Страница не найдена', 'icon': icons.arrow_back});
  }
})