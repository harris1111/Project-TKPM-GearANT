import express from 'express';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import activate_view_middleware from './middlewares/view.mdw.js';
import activate_route_middleware from './middlewares/route.mdw.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static('res'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static('public'));

activate_view_middleware(app);
activate_route_middleware(app);

const port = process.env.PORT || 8080;
app.listen(port, function () {});
console.log(`Listening on port`,port)

