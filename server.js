const express = require('express')
import router from

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
