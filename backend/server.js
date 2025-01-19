const http = require('http');
const app = require('./app');
const port= process.env.PORT ||3000;
//the above line is used to set the port number to 3000 if the port number is not set in the environment variable.
//This is done to avoid any conflicts with other applications running on the same server.
//The port number can be set in the environment variable by using the following command:

const server=http.createServer(app);

server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
});