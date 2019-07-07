const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || './dist';
app.use(express.static(www));
console.log(`serving ${www}`);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: www });
});
app.post('*', (req, res) => {
  res.sendFile(`index.html`, { root: www });
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
