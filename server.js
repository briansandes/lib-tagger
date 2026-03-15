const app = require('./src/app');
const AppDataSource = require('./src/config/datasource');

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected ✅');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed ❌', err);
    process.exit(1);
  });