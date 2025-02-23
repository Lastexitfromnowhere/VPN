const express = require('express');
const router = express.Router();

router.get('/network-stats', (req, res) => {
  const stats = {
    totalNodes: 1247,
    activeNodes: 892,
    totalBandwidth: 42.5,
    averageUptime: 98.5,
    networkHealth: 'healthy'
  };
  
  res.json(stats);
});

module.exports = router;