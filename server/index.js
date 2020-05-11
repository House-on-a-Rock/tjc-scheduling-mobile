const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();

const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) =>
    res.status(200).send({
        message: 'Welcome to this API.',
    }),
);

app.use('/api', require('./api'));

const syncDb = () =>
    db.sync().then(() => {
        app.listen(port, () => {
            console.log(`Server is running on PORT ${port}`);
        });
    });
syncDb();

export default app;
