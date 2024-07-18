const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// console.log(tours);

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send({ message: 'Hello from the server side1', app: 'Nautors' });
// });

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  res.status(200).send({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

const port = 3006;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
