const express = require('express');
 var cors = require('cors');
const app = express();
//const fs = require('fs');

const adminRoutes = require('./routes/admin.routes');

 
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(fileUpload());
// app.use(cors(corsOptions));
 app.use(cors());
 app.options('*', cors());
 
// application-level middleware (order matters)
 
 
//   app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header(
//      'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept,Authorization'
//     );
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
//     next();
//   });

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
 
 
 
 
 
app.use((req, res, next) => {
    console.log('My first application level middleware');
    next();
});
 
// application-level middleware but for only get method of / url
app.get('/', (req, res, next) => {
    console.log('application level middleware for only get method of / url');
    next();
});
 
app.get('/', (req, res) => {
    res.send('hello World!');
});
 
app.post('/', (req, res) => {
    res.send('hello World post!');
});
 
// app.post('/upload',  function(req, res) {
//   //  console.log(req);
//     var file;
 
//     if(!req.files)
//     {
//         res.send("File was not found");
//         return;
//     }
 
//     file = req.files.FormFieldName;  // here is the field name of the form
 
//     res.send("File Uploaded");
 
 
// });
 
 
 
 
/* app.use((req, res, next) => {
    console.log('This will not be called for / url');
    next();
}); */
 
app.use('/admins', adminRoutes);

 
 
app.get('**', (req, res) => {
    res.send('404 page not found');
});
 
app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});
