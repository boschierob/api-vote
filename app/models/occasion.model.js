module.exports = mongoose => {
  var schema = mongoose.Schema(
    {	
      title: String,
      initiator:String,
      description: String,
      date: Date,
      limit_date: Date,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Occasion = mongoose.model("occasion", schema);
  return Occasion;
};