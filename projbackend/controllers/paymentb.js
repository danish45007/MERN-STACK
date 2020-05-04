var braintree = require("braintree");


// Gateway connection
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "ynzkvyzr4p8fhm9w",
  publicKey: "s9q2wv5z5zftpnnr",
  privateKey: "a2b24e516e26ff738bb8a33de2f77cd1"
});

// Get Token
exports.getToken = (req,res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response);
    }
  }); 
};

// Process payment
exports.processPaymnet = (req,res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount
  gateway.transaction.sale({
    amount: amountFromTheClient,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(result)

    }
  }); 
}