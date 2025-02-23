// api/nodeRewards.js
const { calculateVPNRewards } = require("../utils/rewardsUtils");

module.exports = (req, res) => {
  const { walletAddress } = req.params;
  
  // Vérifie si l'adresse du portefeuille est présente
  if (!walletAddress) {
    return res.status(400).json({ 
      success: false, 
      error: "Adresse de portefeuille manquante" 
    });
  }
  
  // Calcule les récompenses pour le nœud
  const rewards = calculateVPNRewards(walletAddress);
  
  // Vérifie si le nœud existe
  if (!rewards) {
    return res.status(404).json({ 
      success: false, 
      error: "Nœud non trouvé" 
    });
  }
  
  // Renvoie les récompenses et les statistiques du nœud
  res.json({
    success: true,
    dailyReward: rewards.dailyReward,
    nodeStats: rewards.nodeStats
  });
};