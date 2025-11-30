import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connectDb = async () => {
  // Si ya está conectado, reutilizar la conexión
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Si está conectando, esperar
  if (mongoose.connection.readyState === 2) {
    return new Promise((resolve) => {
      mongoose.connection.once("connected", () => resolve(mongoose.connection));
    });
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
    console.log("MongoDB connected:", mongoose.connection.host);
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDb;
