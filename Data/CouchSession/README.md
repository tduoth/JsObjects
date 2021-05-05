# CouchSession

by Charlie Calvert

Work with session and login data, store it in a database, retrieve it.

Before running this app install CouchDb and set the **serverUrl** and **dbName** in **set-server.js**. You will need to create a new or use an existing database. The database can be empty at the start.

Create a file like this, call it **setClientId**:

```bash
export GOOGLE_CLIENT_ID=<YOUR CLIENT ID>
export GOOGLE_CLIENT_SECRET=<YOUR CLIENT SECRET>
```

Then source it:

```bash
source setClientId
```
