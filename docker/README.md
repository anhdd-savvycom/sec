## Deployment guide

### Create .env file
```
cp .env.example .env
```

```
cp be/.env.example fe/.env
```

### Run stack
```
docker-compose up -d
```

### Default services
- Frontend Dashboard: http://localhost:3000/dashboard
- Frontend Client: http://localhost:3000/client
- Backend Playground: http://localhost:3001/graphql
