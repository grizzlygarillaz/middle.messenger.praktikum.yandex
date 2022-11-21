import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (_req, res, ctx) => {
    console.log('Call logout endpoind');

    window.store.dispatch({ user: null });

    return res(ctx.status(200));
  }),
  rest.post(`${process.env.API_ENDPOINT}/test/post`, (_req, res, ctx) => res(ctx.json({ response: 'post' }))),
  rest.get(`${process.env.API_ENDPOINT}/test/get`, (_req, res, ctx) => res(ctx.json({ response: 'get' }))),
  rest.put(`${process.env.API_ENDPOINT}/test/put`, (_req, res, ctx) => res(ctx.json({ response: 'put' }))),
  rest.delete(`${process.env.API_ENDPOINT}/test/delete`, (_req, res, ctx) => res(ctx.json({ response: 'delete' }))),
];

const server = setupServer(...handlers);

export default server;
