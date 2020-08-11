const mongoose = require('mongoose'); 
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost/beetapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('The request to MongoDB was successfully completed.')
}). catch((error) =>{
    console.log('The MongoDB database connection failed.')
});
