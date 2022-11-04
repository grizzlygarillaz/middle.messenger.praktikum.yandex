import { Dispatch } from 'core/Store/Store';
import chatAPI, {
  ChatAddUserData, ChatCreateData, ChatReadData, ChatToggleUserData,
} from 'api/ChatAPI';
import { objectToCamelCase } from 'util/helpers';
import UserAPI from 'api/UserAPI';

export const getChats = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data?: ChatReadData,
) => {
  try {
    const chats = await chatAPI.read(data);

    dispatch({ chats: objectToCamelCase(chats) as Chat[], currentChat: null });
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};

export const addChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: ChatCreateData,
) => {
  try {
    await chatAPI.create(data);

    const chats = await chatAPI.read();

    dispatch({ chats: objectToCamelCase(chats) as Chat[] });
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  chatId: number,
) => {
  try {
    await chatAPI.delete(chatId);

    const chats = await chatAPI.read();

    dispatch({ chats: objectToCamelCase(chats) as Chat[], currentChat: null });
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: ChatAddUserData,
) => {
  try {
    const user = await UserAPI.search({ login: data.login });

    if (!user[0]) {
      throw new Error('User not founded');
    }

    await chatAPI.addUser({ chatId: data.chatId, users: [user[0].id] });

    const chats = objectToCamelCase(await chatAPI.read()) as Chat[];

    const currentChat = chats.find((chat) => chat.id === data.chatId) ?? null;

    if (currentChat) {
      currentChat.users = await chatAPI.getUsers(data.chatId);
    }

    dispatch({ chats, currentChat });

    alert(`Пользователь ${user[0].login} добавлен`);
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};

export const chatUserDelete = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  data: ChatToggleUserData,
) => {
  try {
    await chatAPI.deleteUser(data);

    const chats = objectToCamelCase(await chatAPI.read()) as Chat[];

    const currentChat = chats.find((chat) => chat.id === data.chatId) ?? null;

    if (currentChat) {
      currentChat.users = await chatAPI.getUsers(data.chatId);
    }

    dispatch({ chats, currentChat });

    alert('Пользователь удален');
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};

export const changeChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  chatId: number,
) => {
  try {
    const chats = objectToCamelCase(await chatAPI.read()) as Chat[];

    const currentChat = chats.find((chat) => chat.id === chatId) ?? null;

    const token = await chatAPI.token(chatId);

    if (currentChat) {
      currentChat.users = await chatAPI.getUsers(chatId);
    }

    dispatch({
      currentChat: objectToCamelCase(currentChat as {}) as Chat,
      token: token.token,
      chats,
    });
  } catch (err) {
    console.error(err);

    dispatch({ error: err.reason });
  }
};
