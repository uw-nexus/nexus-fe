# NEXUS UW - Frontend

Projects platform between non-profit organizations (NPO) and students.

## Getting Started

Install dependencies.

```sh
npm install
```

Define your environment variables and run the [backend](https://github.com/vwidjaya/nexus-be)

```sh
export FE_ADDR=http://localhost:3000
export BE_ADDR=http://localhost:3100
export PORT=3000
```

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
