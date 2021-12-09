import { PORT } from './common/config';
import app from './app';

const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error);
  }
};

start();
