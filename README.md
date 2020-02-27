# NEXUS UW - Frontend

Projects platform between non-profit organizations (NPO) and students.

## Getting Started
Install dependencies.
```sh
npm install -g now
npm install
```

## Development
```sh
export FE_ADDR=http://localhost:3000
export BE_ADDR=http://localhost:3100
npm run dev
```

With NOW Secrets
```sh
now dev
```

## Production
```sh
npm run build
npm start
```

## Deployment to ZEIT Now
```sh
# only once, and replace with corresponding values
now secrets add nexus-fe-addr [FRONTEND_ADDR]
now secrets add nexus-be-addr [BACKEND_ADDR]

# on every deployment
now

# push most recent deployment to production
now --prod
```
