import express from 'express';
const app = express();
const PORT = 3000;
import indexRouter from './routes/index';
import adminAuthRouter from './routes/adminAuth'

app.use(express.json());

app.use("/", indexRouter);
app.use("/admin", adminAuthRouter);

app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})
