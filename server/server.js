import express from 'express';

const app = express();

const PORT = 3001;

app.use('/api/:num', async (req, res) => {
  const { num } = req.params;
  const URL = `https://www.random.org/integers/?num=${num}&min=0&max=7&col=1&base=10&format=plain&rnd=new`;
  try {
    const response = await fetch(URL);
    const data = await response.text();
    let target = '';
    for (let i = 0; i < num * 2; i += 2) {
      target += data[i];
    }
    res.locals.target = target;
    console.log('number is: ', target);
    return res.status(200).json(res.locals.target);
  } catch (err) {
    console.log('Error fetching random numbers:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  return res.json('This is the server');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
