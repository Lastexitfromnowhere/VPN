const { calculateVPNRewards } = require("../utils/rewardsUtils");

module.exports = (req, res) => {
    const { walletAddress } = req.params;

    if (!walletAddress) {
        return res.status(400).json({ 
            success: false, 
            error: "Adresse de portefeuille manquante" 
        });
    }

    const rewards = calculateVPNRewards(walletAddress);

    if (!rewards) {
        return res.status(404).json({ 
            success: false, 
            error: "Nœud non trouvé" 
        });
    }

    res.json({
        success: true,
        dailyReward: rewards.dailyReward,
        nodeStats: rewards.nodeStats
    });
};