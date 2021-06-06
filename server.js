const express = require('express');
const path = require('path');

const app = express();
const PORT = process.emitWarning.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


require('./routes/apiroutes')(app);
require('./routes/htmlroutes')(app);

app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));