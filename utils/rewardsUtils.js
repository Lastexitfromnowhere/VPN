
// utils/rewardsUtils.js

const mongoose = require('mongoose');
const nodeStatsSchema = new mongoose.Schema({
  walletAddress: String,
  bandwidthShared: Number,
  connectionUptime: Number,
  connectionQuality: Number,
  startTime: Date,
  dailyReward: Number,
  totalEarned: Number,
  rewardTier: String
});

const NodeStats = mongoose.model('NodeStats', nodeStatsSchema);

// Initialisation des stats d'un nœud
async function initNodeStats(walletAddress) {
  const existingNode = await NodeStats.findOne({ walletAddress });
  if (existingNode) return existingNode;

  const newNode = new NodeStats({
    walletAddress,
    bandwidthShared: 0,
    connectionUptime: 0,
    connectionQuality: 100,
    startTime: new Date(),
    dailyReward: 0,
    totalEarned: 0,
    rewardTier: 'Starter'
  });

  await newNode.save();
  return newNode;
}

// Calcul des récompenses d'un nœud
async function calculateVPNRewards(walletAddress) {
  const node = await NodeStats.findOne({ walletAddress });
  if (!node) return undefined;

  const baseRewardRate = 0.01;
  const uptimeHours = (Date.now() - node.startTime) / (1000 * 3600);

  const bandwidthReward = node.bandwidthShared * baseRewardRate;
  const uptimeBonus = uptimeHours * 0.005;
  const qualityMultiplier = node.connectionQuality / 100;

  const dailyReward = (bandwidthReward + uptimeBonus) * qualityMultiplier;

  node.dailyReward = dailyReward;
  node.totalEarned += dailyReward;

  if (node.totalEarned > 1000) node.rewardTier = 'Pro';
  if (node.totalEarned > 5000) node.rewardTier = 'Elite';

  await node.save();

  return {
    dailyReward,
    nodeStats: node
  };
}

module.exports = {
  initNodeStats,
  calculateVPNRewards
};
