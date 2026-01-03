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

const startServer = async (port,app) => {
    await initDatabaseConnection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}
module.exports = startServer;