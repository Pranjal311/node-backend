


import App from "./app";
import { config } from "./app";

// create server and start listening on port
let server = App.instance.listen(config.SERVER.PORT);


// add server listener
server.on('listening', function () {
    console.log(`Server started listening on port ${config.SERVER.PORT}`);
});