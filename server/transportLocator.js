use transportLocator;

var bulk = db.locations.initializeUnorderedBulkOp();

bulk.insert({_id: 1, phone_no: "+1-1234567890", lat: 26.5, long: 80.2, name: "test_driver", car_number: "420", message: "I am test driver"});

bulk.execute();
