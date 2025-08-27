let server = `
    import connect from "./config/connect.js";
    import app from "./config/app.js";
    import dotenv from "dotenv";

    dotenv.config();

    let port = process.env.PORT || 4321;

    (async () => {
      try {
        app.listen(port, () => {
          console.log(\`Server fired up on port : \${port}\`);
        });
        connect();
      } catch (err) {
        console.error(\`Error occured firing up server and database : \${err}\`);
      }
    })();

            `;
export default server;
