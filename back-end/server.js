const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config(); //to retreive the data from the .env

const authenticate = require('./middleware/authMiddleware')
const {
  getCompanies,
  getOneCompanie,
  createCompany,
  deleteCompany,
  updateCompany,
} = require("./controllers/companyController");
const {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} = require("./controllers/userController");
const {
  getClients,
  getOneClient,
  createClient,
  deleteClient,
  updateClient,
} = require("./controllers/clientController");
const {
  getCompteurs,
  getOneCompteur,
  createCompteur,
  deleteCompteur,
  updateCompteur,
} = require("./controllers/compteurController");
const {
  getFactures,
  getOneFacture,
  createFacture,
  deleteFacture,
  updateFacture,
} = require("./controllers/factureController");
const {
  getTranches,
  getOneTranche,
  createTranche,
  deleteTranche,
  updateTranche,
} = require("./controllers/trancheController");
const {login} = require('./controllers/loginController')

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Enable sending credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Login
app.post('/api/login' , login)

// signup
app.post("/api/addCompany", createCompany);
app.post("/api/addUser", createUser);

// all companies
app.get("/api/companies", getCompanies);

// authentication middleware
app.use('/api' , authenticate);

// check auth
app.get('/api/checkAuth' , authenticate , (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
})

// Company
app.get("/api/companie/:companyName", getOneCompanie);
app.put("/api/updateCompany/:companyId", updateCompany);
app.delete("/api/deleteCompany/:companyId", deleteCompany);

// User
app.get("/api/users", getUsers);
app.get("/api/user/:userId", getOneUser);
app.put("/api/updateUser/:userId", updateUser);
app.delete("/api/deleteUser/:userId", deleteUser);

// Client
app.get("/api/clients", getClients);
app.get("/api/client/:clientId", getOneClient);
app.post("/api/addClient", createClient);
app.put("/api/updateClient/:clientId", updateClient);
app.delete("/api/deleteClient/:clientId", deleteClient);

// Compteur
app.get("/api/compteurs", getCompteurs);
app.get("/api/compteurs/:compteurId", getOneCompteur);
app.post("/api/addCompteur", createCompteur);
app.put("/api/updateCompteur/:compteurId", updateCompteur);
app.delete("/api/deleteCompteur/:compteurId", deleteCompteur);

// Facture
app.get("/api/factures", getFactures);
app.get("/api/facture/factureId", getOneFacture);
app.post("/api/addFacture", createFacture);
app.put("/api/updateFacture/:factureId", updateFacture);
app.delete("/api/deleteFacture/:factureId", deleteFacture);

// Tranche
app.get("/api/tranches", getTranches);
app.get("/api/tranche/:trancheId", getOneTranche);
app.post("/api/addTranche", createTranche);
app.put("/api/updateTranche/:trancheId", updateTranche);
app.delete("/api/deleteTranche/:trancheId", deleteTranche);

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: true, // Secure only in production
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/db_GFE");
app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
