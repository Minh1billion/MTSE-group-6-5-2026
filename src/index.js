import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import sequelize from './config/db.js';
import authRouter from './modules/auth/auth.router.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);

const start = async () => {
  try {
    await connectDB();

    await sequelize.sync({ alter: true });
    console.log('Database synced');

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

start();