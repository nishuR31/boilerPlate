let cron=
  `import cron from "node-cron";

export default function cronTask(sequence, func) {
  try {
    cron.schedule(sequence, async () => {
      try {
        await func(); // your async function runs here
      } catch (err) {
        console.error("Task error:", err);
      }
    });
    console.log(`Task scheduled: ${sequence}`);
  } catch (err) {
    console.error("Cron scheduling error:", err);
  }
}`

export default cron;
