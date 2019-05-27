Run `npm install`

Set up a `.env` file:
```
NODE_ENV=development
```

Set up a `config.json` file:
```
{
	"dev": {
		"username": "postgres",
		"password": null,
		"database": "",
		"host": "127.0.0.1",
		"port": "5432",
		"dialect": "postgres",
		"token_secret": ""
	},
	"test": {
		"username": "",
		"password": "",
		"database": "",
		"host": "",
		"dialect": "postgres",
		"token_secret": ""
	},
	"production": {
		"username": "",
		"password": "",
		"database": "",
		"host": "",
		"dialect": "postgres",
		"token_secret": ""
	}
}
```
