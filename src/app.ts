import express = require('express');

const PORT = 3000;
const app = express();

// Used to parse JSON bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
