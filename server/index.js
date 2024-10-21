import app from "./server.js";
import { MongoClient } from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

// Replace this with your actual MongoDB URI
const uri = 'mongodb+srv://aaryan:admin@cluster0.6qs1k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const port = process.env.PORT || 5000;

// Debug: Log the MongoDB URI to ensure it's correct
console.log('MongoDB URI:', uri);

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error('Connection Error:', err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
