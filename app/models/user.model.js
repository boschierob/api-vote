module.exports = mongoose => {
  var schema = mongoose.Schema(
    {	
      first_name:{type: String, required: true},
      last_name:{type: String, required: true},
      adress: {type: String, required: true},
      postal_code: {type: String, required: true},
      city: {type: String, required: true},
      email:{
            type: String, 
            required: true,
            validate: {
                        validator: function(v) {
                        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)
                        },
                        message: props => `${props.value} is incorrect email!`
                      },
            },
      password: {type: String, required : true, unique: true},
      occasions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Occasion"
        }
      ]
    },
    
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};