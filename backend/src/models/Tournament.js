const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  prizeCurrency: { type: String, enum: ["dollar", "star"], required: true },
  // Total winners awarded (50 or 100)
  tier: { type: Number, enum: [50, 100], default: 50 },
  // Prize given to each winner (same for all top N)
  prizePerWinner: { type: Number, required: true },
  // Optional: filter by game key, empty = all games count
  gameFilter: { type: String, default: "" },
  startedAt: { type: Date, default: Date.now },
  endsAt: { type: Date, default: null },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tournament", TournamentSchema);
