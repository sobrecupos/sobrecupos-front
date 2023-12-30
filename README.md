# Marketplace

## Requirements

- Download and install the latest [node 18 version](https://nodejs.org/es/download/).
  We suggest you use [NVM](https://github.com/nvm-sh/nvm) to manage your node versions and to [automate the version-selection](https://github.com/nvm-sh/nvm#deeper-shell-integration) per project.
- Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

```shell
npm i -g yarn
```

## Setup

Install all dependencies:

```shell
yarn install
```

Then copy the content from `.env.default` to an `.env` file and populate the credentials. Remember to comment out any production-related variables.

```shell
cp .env.default .env
```

## Development

Start the server by running

```shell
yarn dev
```

If you need to test events, you can expose your localhost using a third party app such as `ngrok` or push your changes to the `staging` branch.

## Deploying

All code in the main branch is automatically deployed via vercel integration.
