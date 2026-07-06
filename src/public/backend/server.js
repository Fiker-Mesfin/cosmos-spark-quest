require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const spaceRoutes = require("./routes/spaceRoutes");
const exploreRoutes = require("./routes/exploreRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/space", spaceRoutes);
app.use("/api/explore", exploreRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
