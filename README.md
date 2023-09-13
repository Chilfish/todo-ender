### Todo-nitro-Mysql

Hi, this is a simple backend for a todo app using [nitro] for server and mysql for database. Still in development.

### Features

- Error handling: I'am trying to handle the errors unitedly at [errorHandler.ts](./error/errorHandler.ts). So that it's unnecessary to try-catch everywhere, nitro will catch it. But I am not sure if it is a good practice.

- Authentication: I am using **[jws]** for authentication. That's signatured jwt. The public key and private key are stored in the environment variable. The public key is used to verify the token, and the private key is used to sign the token. The token is stored in the cookie.

- Promised mysql: I am using the promised mysql library [mysql2/promise] to connect to the database. It's easy to use.

- Database: I am using the cloud database service [tidb cloud]. It's free and easy to use.


### Get Started

```bash
pnpm install

pnpm dev
```

### Deploy on Vercel

[![Deploy to Vercel](https://vercel.com/button)][deploy]

Set the environment variables in Vercel, see `.env.example` for reference. (at `https://vercel.com/${your_name}/todo-ender/settings/environment-variables`).

Note that, you should generate the PUBLIC_KEY and PRIVATE_KEY by yourself (You can generate them at https://jwt.rocks/).

Also, you should create a database named `todo` or .env value in your mysql serve.


[nitro]: https://nitro.unjs.io/
[deploy]: https://vercel.com/import/project?template=https://github.com/Chilfish/todo-ender
[jws]: https://github.com/panva/jose#json-web-signature-jws
[mysql2/promise]: https://github.com/sidorares/node-mysql2/blob/master/documentation/en/Promise-Wrapper.md
[tidb cloud]: https://tidbcloud.com/
