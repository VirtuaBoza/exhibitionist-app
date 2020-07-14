# Exhibitionist

An open source asset tracking application used by museums, art galleries, and other public collections.

## Contributing

You will need `node` and `docker`.

### Client setup:

```bash
# /exhibitionist-app
cd client
npm install
```

Once packages are installed, run the Client app with

```bash
# /exhibitionist-app/client
npm start
```

---

### Proxy setup:

```bash
# /exhibitionist-app
cd proxy
npm install
```

Create a `.env` file in the proxy directory, obtain the environment variables from the repo owner, and paste them into the `.env`.

Once packages are installed, run the script to start the Typescript transpiler:

```bash
# /exhibitionist-app/proxy
npm run watch
```

In a separate terminal, run the script to start the server:

```bash
# /exhibitionist-app/proxy
npm run nodemon
```

---

### Hasura setup:

```bash
# /exhibitionist-app
cd hasura
npm install
```

After packages are installed, create your local docker container:

```bash
# /exhibitionist-app/hasura
docker-compose up
```

In a separate terminal, apply any migrations:

```bash
# /exhibitionist-app/hasura
npm run migrate
```

Open the hasura console and "Track All" tables and relationships:

```bash
# /exhibitionist-app/hasura
npm run console
```

## Authors

[Andrew Boza](https://github.com/virtuaboza)

[Tyler Watts](https://github.com/tylermwatts)
