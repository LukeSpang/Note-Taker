const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(epxress.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "public"));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 