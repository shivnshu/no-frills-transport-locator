use transportLocator;

var locations = db.locations.initializeUnorderedBulkOp();
var publickeys = db.publickeys.initializeUnorderedBulkOp();

locations.insert({_id: 1, phone_no: "1234567890", lat: 26.5, long: 80.2, name: "test_driver", car_number: "420", message: "I am test driver", public_key: "0"});
publickeys.insert({_id: 1, public_key: "0"});

locations.execute();
publickeys.execute();
