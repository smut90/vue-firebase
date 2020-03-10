# Prepare-Sequence a vue-firebase webapp

## Initialize firebase on an existing vue app
```
firebase init hosting 
```
then select a firebase project and select folder `dist` as the folder to serve static files from.

### configure firebase
create a .env and .env.prod file with following env variables and add you firebase project configs
```
VUE_APP_FIREBASE_CONFIG_API_KEY=your-firebase-project-api-key
VUE_APP_FIREBASE_CONFIG_AUTH_DOMAIN=your-firebase-project-auth-domain
VUE_APP_FIREBASE_CONFIG_PROJECT_ID=your-firebase-project-id
VUE_APP_FIREBASE_CONFIG_DATABASE_URL=your-firebase-project-database-url
```

### Build vue app
```
npm run build
```

### Test locally
```
firebase serve
```

### Deploy to firebase hosting
```
firebase deploy
```
