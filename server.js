const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Import des routes API
const connectNode = require("./api/connect");
const disconnectNode = require("./api/disconnect");
const nodeRewards = require("./api/nodeRewards");
const networkStats = require("./api/networkStats");

// Import des fonctions utilitaires de récompense
const { updateNodeStats } = require("./utils/rewardsUtils");

let vpnState = {
    isRunning: false,
    ip: "0.0.0.0",
    bandwidth: 0
};

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "VPN Status OK",
        ...vpnState
    });
});

app.post("/api/connect", connectNode);
app.post("/api/disconnect", disconnectNode);

app.get("/api/node-rewards/:walletAddress", nodeRewards);
app.get("/api/network-stats", networkStats);

setInterval(() => {
    console.log("This message is printed every 10 seconds");
}, 10000);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Backend API is running');
});