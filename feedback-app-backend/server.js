import express from "express";
import path from 'path'
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.js";
import { feedbackRoutes } from "./routes/feedbackRoutes.js";
import { commentRoutes } from "./routes/commentRoutes.js";
import { replyRoutes } from "./routes/replyRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from 'cors'
import connectDB from "./config/db.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/replies', replyRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './feedback-app-frontend/build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'feedback-app-frontend', 'build', 'index.html'))
    })
  } else {
    app.get('/', (req, res) => {
      res.send('API is running ...')
    })
  }

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
