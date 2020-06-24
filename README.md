# NEXUS UW - Frontend

Projects platform between non-profit organizations (NPO) and students.

## Getting Started

Install dependencies.

```sh
npm install
```

Define your environment variables in a `.env` file, in KEY=VALUE format. If deploying to GAE, you can write them in your app.yaml instead. Then, run the [backend](https://github.com/vwidjaya/nexus-be).

| ENV             | Default               | Description                   |
| --------------- | --------------------- | ----------------------------- |
| DOMAIN          | localhost             | Domain serving both FE and BE |
| FE_ADDR         | http://localhost:3000 | Frontend service address      |
| BE_ADDR         | http://localhost:3100 | Backend service address       |
| ALGOLIA_APP_ID  | _null_                | Algolia app ID                |
| ALGOLIA_API_KEY | _null_                | Algolia admin PI key          |

## Development

```sh
npm run dev
```

## Production

```sh
npm run build
npm start
```

## Deployment with Google App Engine

Create your app.yaml for GAE, then run

```sh
npm run deploy
```
