const express = require('express');
const cors = require('cors');

const db = require('./config/db');
db.connect();

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const productRouter = require('./routes/product');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 5004
app.listen(port, function() {
    console.log('Your app running on port ' + port);
});