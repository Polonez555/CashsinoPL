const express = require('express');
const cors = require('cors');
const rouletteRouter = require('./routes/roulette');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CashsinoPL API', version: '1.0.0' });
});

app.use('/api/roulette', rouletteRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CashsinoPL backend running on port ${PORT}`);
  });
}

module.exports = app;
