const { PORT } = require('./common/config');
const app = require('./app');

const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error);
  }
};

start();
