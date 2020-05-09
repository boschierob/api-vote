
 module.exports = mongoose => {
var schema = mongoose.Schema({
  answer: {
    type: String,
    unique: true
  },
  votes: {
    type: Number,
    default: 0
  }
});
 const Answer = mongoose.model("answer", schema);
  return Answer;
}