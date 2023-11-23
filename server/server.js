import express from 'express';

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  return res.json('This is the server');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
