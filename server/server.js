import express from 'express';
import userRoute from './route/userRoute.js';
const app = express();

const PORT = 3001;

app.use(express.json());
// app.use(bodyParser);
app.get('/api/:num', async (req, res) => {
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

app.use('/user', userRoute);

app.get('/', (req, res) => {
  return res.status(200).json('This is the server');
});

// 404
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
