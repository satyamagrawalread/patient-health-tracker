const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./database/db_connect');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const patientRoutes = require('./routes/patient');
const priorAuthRoutes = require('./routes/priorAuth');

PORT = process.env.PORT || 7860;

connectDB();

app.use(express.json());
app.use(cors({
    origin: '*'
}))
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(patientRoutes);
app.use(priorAuthRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})