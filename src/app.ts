import express from 'express';
import chartRoutes from './routes/chartRoutes';
import dotenv from 'dotenv';
import setupSwagger from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', chartRoutes);

setupSwagger(app);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
