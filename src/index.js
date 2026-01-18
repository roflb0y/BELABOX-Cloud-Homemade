import { sendStats } from "./net.js";
import { config, saveToken } from "./config.js";

import { WebSocket } from "ws";

const socket = new WebSocket("ws://belabox.local");

console.log("Connecting...");

socket.addEventListener("open", (event) => {
    console.log("Connection established");
    if (config.token !== "") {
        socket.send(
            JSON.stringify({
                auth: { token: config.token },
            }),
        );
    } else {
        socket.send(
            JSON.stringify({
                auth: { password: config.password, persistent_token: true },
            }),
        );
    }
});

socket.addEventListener("message", async (event) => {
    const j = JSON.parse(event.data);

    // node v12 type beat
    if (j.notification && j.notification.show && j.notification.show[0] && j.notification.show[0].msg === "Invalid password") {
        console.log(
            "Invalid password. Make sure to set the right password in config.json",
        );
        return;
    }
    if (j.auth && j.auth.success === true) {
        console.log("Logged in. Starting to send messages");
        return;
    }
    if (j.auth && j.auth.auth_token && config.token === "") {
        saveToken(j.auth.auth_token);
        return;
    }
    sendStats(j);
});

socket.addEventListener("close", async (event) => {
    console.log("Socket closed. Exiting...");
    process.exit(1);
})

setInterval(function () {
    if (socket) {
        socket.send(JSON.stringify({ keepalive: null }));
    }
}, 10000);
