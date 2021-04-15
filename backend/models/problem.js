import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
  },
  age: {
    type: Number,
    required: [true, 'Please enter age'],
  },
  sex: {
    type: String,
    required: [true, 'Please enter male or female'],
    enum: ['male', 'female']
  },
  city: {
    type: String,
    required: [true, 'Please enter city']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter an phoneNumber'],
  },
  phoneType: {
    type: String,
    required: [true, 'Please enter an phoneType'],
    enum: ['Mobile', 'Land Line'],
  },
  date: {
    type: String,
  },
  problems: [],
  response: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},  { timestamps: true });


const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
