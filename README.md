# Express Backend Boilerplate

A clean and production-ready **Express.js boilerplate** with built-in middlewares, modular folder structure, and utilities for rapid backend development.

## Features

- **Express 5** setup with ES Modules
- **Modular folder structure** (controllers, routes, middleware, models, utils)
- Authentication ready (JWT, cookies, role-based access)
- File upload support via [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- MongoDB integration with **Mongoose**
- Security middlewares: `helmet`, `cors`, `cookie-parser`
- Pre-configured error handling & API response format
- Environment variable management with `.env`
- Secure puhs handled by `.gitignore`

## Boiler Plate Project Structure

```bash
boilerplate/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middlewares
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Helpers (ApiResponse, logger, etc.)
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env.example        # Example env file
├── .env                # Example env file
├── write.js
├── .gitignore
├── package.json
└── README.md
```

## Installation

```bash
# Clone the repo
git clone https://github.com/nishuR31/boilerplate.git
cd boilerplate
```

## Usage

```bash
npm link
boilerplate my-project
cd my-project
npm install

or

npm run dev
```

## Environment Variables

Create a general `.env` file in the root directory:

```env
PORT=port number
MONGO_URI=mongo uri
SECRET_ACC=secret token for access token
SECRET_REF=secret token for refresh token
MAIL=your mail(gmail)
MAIL_PASS=mail app password(not mail password)
```

## File Upload Usage

Have configure middleware for express file upload

Upload with **Postman / frontend form** → `multipart/form-data` with field `file`.

## API Response Format

All responses follow a standard structure:

```json
{
  "message": "Action completed",
  "code": "xxx",
  "success": true/false,
  "payload": {},
  "stack": {} //for error
}
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

[License](LICENSE)
