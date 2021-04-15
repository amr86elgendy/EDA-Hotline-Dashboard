import mongoose from 'mongoose';

const connectDB = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => console.log('MongoDB is connected')
  );
};

export default connectDB;
