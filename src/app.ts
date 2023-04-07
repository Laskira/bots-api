import express, {Application} from 'express';
import morgan from  'morgan';
import cors from 'cors';

const app: Application = express();

//Routes Importation
import Routes from './routes/index'

//Settings
app.set('port', process.env.PORT || 4000) //server port

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('', Routes);

export default app;