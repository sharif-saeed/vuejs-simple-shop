import express from 'express';
import cors from 'cors';
import router from './routes/products.js';
import orderRouter from './routes/orders.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/products', router);
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});