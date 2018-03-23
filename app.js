const express = require ('express');
const authRoutes = require('./server/routes/auth.routes')
const app = express();

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome Home')
})

app.listen(5000, () => {
  console.log('listening on port 5000');
})
