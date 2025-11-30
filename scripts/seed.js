// ...existing code...
const mongoose = require("mongoose");

const uri =
  process.env.MONGODB_URI ||
  "mongodb://root:example@localhost:27017/?authSource=admin";

const AppointmentTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    durationMinutes: { type: Number, required: true },
    price: { type: Number, default: 0 },
    description: { type: String, default: "" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AppointmentType =
  mongoose.models?.AppointmentType || mongoose.model("AppointmentType", AppointmentTypeSchema);

(async () => {
  try {
    console.log("Connecting to MongoDB:", uri);
    await mongoose.connect(uri, { dbName: "admin" });
    const items = [
      { name: "Classic", durationMinutes: 60, price: 3000 },
      { name: "Volume", durationMinutes: 90, price: 4500 },
    ];
    for (const it of items) {
      await AppointmentType.updateOne({ name: it.name }, { $set: it }, { upsert: true });
      console.log("Upserted:", it.name);
    }
    console.log("Seed complete");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
})();
// ...existing code...