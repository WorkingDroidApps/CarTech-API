import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config/config';
import routes from './routes/routes';

let app = express();
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

//passport config

//routes
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Server up and running on port ${app.server.address().port}`);

export default app;