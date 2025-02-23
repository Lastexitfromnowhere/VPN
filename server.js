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
const nodeRewards = require("./api/nodeRewards"); // Nouvelle route pour les récompenses

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

app.post("/api/connect", (req, res) => {
    const { walletAddress, nodeInfo, isHost } = req.body;

    if (!walletAddress || !nodeInfo) {
        return res.status(400).json({ success: false, error: "Informations du nœud manquantes" });
    }

    vpnState = {
        isRunning: true,
        ip: "192.168.1.100",
        bandwidth: Math.floor(Math.random() * 100) + 10
    };

    console.log(`✅ Nouvel enregistrement de nœud VPN`);
    console.log(`👤 Adresse Wallet: ${walletAddress}`);
    console.log(`📡 Mode: ${isHost ? "Hébergeur" : "Utilisateur"}`);
    console.log(`ℹ️ Infos du Nœud: ${nodeInfo}`);
    console.log(`📡 IP: ${vpnState.ip}, 🚀 Bandwidth: ${vpnState.bandwidth} MB`);

    res.json({
        success: true,
        message: "Nœud enregistré avec succès",
        connectionId: Math.random().toString(36).substr(2, 9),
        ...vpnState
    });
});

app.post("/api/disconnect", (req, res) => {
    vpnState = {
        isRunning: false,
        ip: "0.0.0.0",
        bandwidth: 0
    };

    console.log("🛑 VPN arrêté");
    
    res.json({
        success: true,
        message: "Nœud déconnecté avec succès"
    });
});

// Nouvelle route pour récupérer les récompenses d'un nœud
app.get("/api/node-rewards/:walletAddress", nodeRewards);

setInterval(() => {
    console.log("This message is printed every 10 seconds");
}, 10000);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Backend API is running');
});