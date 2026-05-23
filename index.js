import express from 'express';
import linkRouter from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/links', linkRouter);

app.listen(PORT, () => {
    console.log(`app is running in ${PORT}`);
})