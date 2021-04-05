
import mongoose from "mongoose"

const User = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});
export default mongoose.model('User',User);
