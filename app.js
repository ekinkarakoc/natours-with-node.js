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

/* ------------ GET REQUEST --------------  */
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

/* ------------ GET REQUEST(id) --------------  */

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id == id);

  console.log(tour);
  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
});

/* ------------ POST REQUEST --------------  */
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

/* ------------ UPDATE REQUEST (PATCH) --------------  */

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: '<Updated tour here....>',
    },
  });
});

/* ------------ DELETE REQUEST --------------  */

app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(200).json({
    success: 'BAŞARILIIIIII',
  });
});
/* ------------ LISTENING PORT --------------  */

const port = 3006;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
