const experss = require('express');

const app = experss();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoing...');
//   res
//     .status(200)
//     .json({ message: 'You can post to this endpoint..', app: 'Natours' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
