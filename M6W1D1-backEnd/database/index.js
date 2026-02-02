const mongoose = require('mongoose');

require('dotenv').config();

const initDatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connected successfully');
        
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
        
    }
}

const startServer = async (PORT,app) => {
    await initDatabaseConnection();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}
module.exports = startServer;