import express from 'express';
const app = express();
const PORT = 3000;
import indexRouter from './routes/index';

app.use(express.json());

app.use("/", indexRouter);

app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})
