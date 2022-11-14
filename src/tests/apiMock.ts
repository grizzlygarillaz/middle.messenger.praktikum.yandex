import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (_req, res, ctx) => {
    console.log('Call logout endpoind');

    return res(ctx.status(200));
  }),
];

const server = setupServer(...handlers);

export default server;
