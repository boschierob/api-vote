module.exports = mongoose => {
  var voterSchema = mongoose.Schema({ name: 'string' });
  var schema = mongoose.Schema(
    {	
      question: String,
      options:String,
      voters: [voterSchema],
      limit_date: Date,
      voter: voterSchema
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Vote = mongoose.model("vote", schema);
  return Vote;
};