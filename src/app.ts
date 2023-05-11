require('dotenv').config({
    path: `${process.env.ENV_FILE}`.trim()
});

import Server from "./models/server";


const server = new Server();
server.start();