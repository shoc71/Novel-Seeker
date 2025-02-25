// imports
import express from 'express';
// TODO: Uncomment the following code once you have built the queries and mutations in the client folder
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { fileURLToPath } from 'url';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
// TODO: Uncomment the following code once you have built the queries and mutations in the client folder
//import db from './config/connection.js'; //
//import routes from './routes/index.js';
import { connectDB } from './src/config/server.db.js'

// middleware
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Allows anything to connect
  credentials: true
}));

if (process.env.NODE_ENV === 'production') {
  console.log("production")
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// server start-up
app.listen(PORT, () => {
  connectDB();
  console.log(`Now listening on http://localhost:${PORT}`)
});
