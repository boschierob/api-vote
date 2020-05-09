module.exports = mongoose => {
  var voterSchema = mongoose.Schema(
    { 
      first_name:{
              type: String,
              required:[true,'renseignez un prenom!']
            },
      last_name:{
              type: String,
              required:[true,'renseignez un nom!']
            },
      email: {
              type: String,
              required:[true,'email obligatoire']
            }
    }
  );


  var questionSchema = mongoose.Schema(
    {
      question:
          {type:String, required:true},
      options:
          [
            {option:'string'}
      ]

     });

 
  var voteSchema = mongoose.Schema(
    {	
      title:String,
      questions: [questionSchema],
      question: questionSchema,
      voters: [voterSchema],
      limit_date: Date,
      voter: voterSchema,
      occasion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Occasion'
      }
    },
    { timestamps: true }
  );

 /* schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
*/
  const Vote = mongoose.model("vote", voteSchema);
  return Vote;
};