const express = require('express');
const { spin, evaluateBet } = require('../games/roulette');

const router = express.Router();

router.post('/spin', (req, res) => {
  const result = spin();
  res.json({ success: true, result });
});

router.post('/bet', (req, res) => {
  const { bet } = req.body;

  if (!bet || !bet.type || bet.value === undefined || !bet.amount) {
    return res.status(400).json({ success: false, error: 'Invalid bet payload' });
  }

  if (typeof bet.amount !== 'number' || bet.amount <= 0) {
    return res.status(400).json({ success: false, error: 'Bet amount must be a positive number' });
  }

  try {
    const result = spin();
    const outcome = evaluateBet(result, bet);
    res.json({ success: true, result, outcome });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
