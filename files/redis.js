let redis = `import { createClient } from "redis";

export default async function redis() {
  try {
    let red = createClient({ url: process.env.REDIS });
    red.connect();
    red.on("error", (err) => {
      console.log(\`Redis threw error while running: \${err}\`);
    });
  } catch (err) {
    console.log(\`Error while redis connecting: \${err}\`);
  }
}

export { red };
`;
export default redis;
