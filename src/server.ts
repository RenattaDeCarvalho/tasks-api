import { app } from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Task API running on port ${PORT}`);
});