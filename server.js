const express = require('express');
const app = express();
const port = 15100;

app.use(express.static('dist'));

app.get('/', (request, response) => {
    response.render('./dist/index.html');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});