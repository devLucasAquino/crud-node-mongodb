import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3001; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // Permitir apenas requisições desta origem
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type'],
  }));

  app.post('/save', async (req, res) => {
    const customer = req.body;
    console.log('Received customer:', customer); // Log para verificar os dados recebidos
    try {
      const result = await db.insert(customer);
      console.log('Insert result:', result); // Log para verificar o resultado da inserção
      res.status(200).json(result);
    } catch (error) {
      console.error('Error inserting customer:', error); // Log para verificar o erro
      res.status(500).json({ error: error.message });
    }
  });
  
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
