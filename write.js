// #!/usr/bin/env node

import { exec, spawn } from "child_process";
import { promises as fs } from "fs";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";
import dirs from "./directories/dirs.js";
import files from "./directories/files.js";
import rootFiles from "./directories/rootFiles.js";
import env from "./files/env.js";
import required from "./files/required.js";
import OTP from "./files/OTP.js";
import apiResponse from "./files/apiResponse.js";
import hideEmail from "./files/hideEmail.js";
import apiErrorResponse from "./files/apiErrorResponse.js";
import asyncHandler from "./files/asyncHandler.js";
import isEmpty from "./files/isEmpty.js";
import tokenOptions from "./files/tokenOptions.js";
import cookieOptions from "./files/cookieOptions.js";
import codes from "./files/statusCodes.js";
import tokenGeneration from "./files/tokenGenerator.js";
import model from "./files/user.model.js";
import user from "./files/user.controller.js";
import logger from "./files/logger.middleware.js";
import app from "./files/app.js";
import json from "./files/json.js";
import time from "./files/time.js";
import server from "./files/server.js";
import gitignore from "./files/gitignore.js";
import dependencies from "./files/dependencies.js";
import connect from "./files/connect.js";
import auth from "./files/auth.middleware.js";
import packagejson from "./files/packagejson.js";
import dev from "./files/devDependensies.js";

// let __filename = fileURLToPath(import.meta.url);
// let __dirname = path.dirname(__filename);
// let backendDir = path.resolve(__dirname, "../backend");
let backendDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../backend"
);
let parentDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
let boilerPlateDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
let execute = promisify(exec);

let sleep = (ms, msg = "Waiting...") =>
  new Promise((res, rej) =>
    setTimeout(() => {
      console.log(msg);
      res();
    }, ms)
  );

async function run() {
  try {
    // Create dirs
    await Promise.all(
      dirs.map((dir) =>
        fs.mkdir(`${backendDir}/src/${dir}`, { recursive: true })
      )
    );

    // Files to create

    // Create files inside their respective folders
    for (let dir in files) {
      for (let file of files[dir]) {
        let handle = await fs.open(`${backendDir}/src/${dir}/${file}`, "w");
        await handle.close(); // important to close!
      }
    }

    let handles = await Promise.all(
      rootFiles.map((file) => fs.open(`${backendDir}/${file}`, "w")) // opens all files
    );
    // close each handle properly
    await Promise.all(handles.map((h) => h.close()));
    //filepaths
    let filePaths = {
      ".env": env,
      ".gitignore": gitignore,
      "server.js": server,
      "package.json": packagejson,
      "src/config/app.js": app,
      "src/config/connect.js": connect,
      "src/config/redis.js": redis,
      "src/middleware/auth.middleware.js": auth,
      "src/middleware/role.middleware.js": ``,
      "src/middleware/uploader.middleware.js": ``,
      "src/middleware/logger.middleware.js": logger,
      "src/controllers/user.controller.js": user,
      "src/models/user.model.js": model,
      "src/utils/tokenGenerator.js": tokenGeneration,
      "src/utils/statusCodes.js": codes,
      "src/utils/cookieOptions.js": cookieOptions,
      "src/utils/tokenOptions.js": tokenOptions,
      "src/utils/isEmpty.js": isEmpty,
      "src/utils/asyncHandler.js": asyncHandler,
      "src/utils/apiErrorResponse.js": apiErrorResponse,
      "src/utils/hideEmail.js": hideEmail,
      "src/utils/apiResponse.js": apiResponse,
      "src/utils/OTP.js": OTP,
      "src/utils/required.js": required,
      "src/utils/json.js": json,
      "src/utils/time.js": time,
    };

    await Promise.all(
      Object.keys(filePaths).map((path) =>
        fs.writeFile(`${backendDir}/${path}`, filePaths[path])
      )
    );

    await sleep(1000, "\ninstalling dependencies\n");
    await execute(dependencies, {
      // cwd: path.resolve(
      //   path.dirname(fileURLToPath(import.meta.url)),
      //   "../backend"
      cwd: backendDir,
    });
    await sleep(1000, "\ninstalling dev dependencies\n");

    await execute(dev, {
      cwd: backendDir,
    });

    await sleep(
      1000,
      "\nChanged directory to backend and Installed dependencies\n"
    );
    await sleep(1000, "\nCleaning work place\n");

    process.on("exit", () => {
      process.chdir(parentDir);
      const script = `
  const fs = require('fs');
  fs.rmSync('${boilerPlateDir.replace(
    /\\/g,
    "\\\\"
  )}', { recursive: true, force: true });
  console.log('Deleted: ${boilerPlateDir}');
`;

      spawn(process.execPath, ["-e", script], {
        detached: true,
        stdio: "ignore",
        cwd: parentDir,
      }).unref();
    });
    // console.log(parentDir, boilerPlateDir, backendDir);

    process.on("exit", () => {
      try {
        process.chdir(parentDir); // move out so cwd isn't inside the folder to delete

        const script = `
      const fs = require('fs');
      const path = ${JSON.stringify(boilerPlateDir)};
      setTimeout(() => {
        try {
          fs.rmSync(path, { recursive: true, force: true });
          console.log('Deleted:', path);
        } catch (e) {
          console.error('Delete failed:', e.message);
        }
      }, 2000); // wait half a second so parent process fully exits
    `;

        spawn(process.execPath, ["-e", script], {
          detached: true,
          stdio: "ignore",
          cwd: parentDir,
          windowsHide: true,
        }).unref();
      } catch (e) {
        console.error("Schedule delete error:", e.message);
      }
    });
    await sleep(1000, "\nReady to work..\n");
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
}

run();
