use transportLocator;

var bulk = db.locations.initializeUnorderedBulkOp();

bulk.insert({_id: 0, phone_no: "+1-1234567890", lat: 26.5, long: 80.2, other: "test_driver"});

bulk.execute();
