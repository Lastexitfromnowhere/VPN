module.exports = (req, res) => {
    const { walletAddress, nodeInfo, isHost } = req.body;

    if (!walletAddress || !nodeInfo) {
        return res.status(400).json({ success: false, error: "Informations du nœud manquantes" });
    }

    const connectionId = Math.random().toString(36).substr(2, 9);
    const publicIP = "192.168.1.100"; // À récupérer dynamiquement si possible
    const bandwidth = Math.floor(Math.random() * 100) + 10; // Valeur aléatoire pour tester

    console.log(`✅ Nouvel enregistrement de nœud VPN`);
    console.log(`👤 Adresse Wallet: ${walletAddress}`);
    console.log(`📡 Mode: ${isHost ? "Hébergeur" : "Utilisateur"}`);
    console.log(`ℹ️ Infos du Nœud: ${nodeInfo}`);
    console.log(`📡 IP: ${publicIP}, 🚀 Bandwidth: ${bandwidth} MB`);

    res.json({ 
        success: true, 
        message: "Nœud enregistré avec succès", 
        connectionId, 
        ip: publicIP, 
        bandwidth 
    });
};