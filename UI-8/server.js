
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/sample')); //__dir and not _dir
var PORT = 3000; // you can use any port
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
