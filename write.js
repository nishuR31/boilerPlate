// #!/usr/bin/env node

import { exec, spawn } from "child_process";
import { promises as fs } from "fs";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";
import dirs from "./directories/dirs";
import files from "./directories/files";
import rootFiles from "./directories/rootFiles";
import env from "./files/env";
import required from "./files/required";
import OTP from "./files/OTP";
import apiResponse from "./files/apiResponse";
import hideEmail from "./files/hideEmail";
import apiErrorResponse from "./files/apiErrorResponse";
import asyncHandler from "./files/asyncHandler";
import isEmpty from "./files/isEmpty";
import tokenOptions from "./files/tokenOptions";
import cookieOptions from "./files/cookieOptions";
import codes from "./files/statusCodes";
import tokenGeneration from "./files/tokenGenerator";
import model from "./files/user.model";
import user from "./files/user.controller";
import logger from "./files/logger.middleware";
import app from "./files/app";
import server from "./files/server";
import gitignore from "./files/gitignore";
import dependencies from "./files/dependencies";
import connect from "./files/connect";

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
      "src/config/app.js": app,
      "src/config/connect.js": connect,
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
    };

    await Promise.all(
      Object.keys(filePaths).map((path) =>
        fs.writeFile(`${backendDir}/${path}`, filePaths[path])
      )
    );

    await sleep(1000, "\nChanging directory and install dependencies\n");
    await execute(dependencies, {
      // cwd: path.resolve(
      //   path.dirname(fileURLToPath(import.meta.url)),
      //   "../backend"
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

    await sleep(1000, "\nReady to work..\n");
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
}

run();
