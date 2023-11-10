const express = require('express');

const app = express();

const port = 8081;

// Página no encontrada - 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status(500);
  res.send('404 - Not Found');
});

// Página de error en el servidor - 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`)
);