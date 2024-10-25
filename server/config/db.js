const mongoose=require('mongoose');
require('dotenv').config();

const connectDB =async () =>{
console.log('MongoDB URI:' ,process.env.MONGODB_URI);
try{
await mongoose.connect(process.env.MONGODB_URI,{
useNewUrlParser:false,
useUnifiedTopology:false,
});console.log('MongoDB Connected');

}
catch(error){
console.error('MongoDB connected error',error);
process.exit(1);
}
};
module.exports =connectDB;