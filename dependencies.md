# Copy paste below to install the used dependencies

```bash
npm i express mongoose express-fileupload morgan helmet cookie-parser cors express-rate-limit dotenv jsonwebtoken bcrypt
```

```bash
npm i -D nodemon
```

## Dependencies your generated boilerplate **project will require** (based on the files you create):

### From `server.js` and `src/config/app.js`:

* `express`
* `morgan`
* `cors`
* `helmet`
* `cookie-parser`
* `express-rate-limit`
* `express-fileupload`
* `dotenv`
* `path` (built-in, no install needed)

### From `src/config/connect.js` and `user.model.js`:

* `mongoose`
* `bcrypt`(preferred) or `bcryptjs`

### From `src/utils/tokenGenerator.js`:

* `jsonwebtoken`

### For development purposes:

* `nodemon`
* `prettier`
