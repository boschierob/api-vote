module.exports = mongoose => {
  var schema = mongoose.Schema(
    {	
      id_question:String,
      result:Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Result = mongoose.model("result", schema);
  return Result;
};

