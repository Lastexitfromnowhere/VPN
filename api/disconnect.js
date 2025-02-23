module.exports = (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ success: false, error: "Adresse wallet manquante pour la déconnexion" });
    }

    console.log(`✅ Déconnexion du nœud VPN`);
    console.log(`👤 Adresse Wallet: ${walletAddress}`);

    // Mettre à jour l'état du nœud dans vpnState
    vpnState = {
        isRunning: false,
        ip: "0.0.0.0",
        bandwidth: 0
    };

    res.json({ success: true, message: "Nœud déconnecté avec succès", ...vpnState });
};