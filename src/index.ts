import app from './app';
import swaggerDocs from './middlewares/swagger ';

//server inizialition funtion
async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
    //Documentation
    swaggerDocs(app, app.get('port'))
}

//server ejecution
main(); 