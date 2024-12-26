import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect(
      (process.env.MONGODB_URI as string) ||
        "mongodb+srv://pedroFermin:iSAVdRsIuKgcR9tf@cluster0.n5jfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected:", db.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
