package transport_locator

// Define Models i.e. schemas

type transportLocation struct {
	ID          int64   `bson:"_id"`
	PhoneNumber string  `bson:"phone_number"`
	Latitude    float64 `bson:"lat"`
	Longitude   float64 `bson:"long"`
	Name        string  `bson:"name"`
	CarNumber   string  `bson:"car_number"`
	Message     string  `bson:"message"`
	TimeStamp   int64   `bson:"time_stamp"`
}

type transportLocations []transportLocation

type queryLocation struct {
	Latitude        float64 `bson:"lat"`
	Longitude       float64 `bson:"long"`
	SearchParameter float64 `bson:"search_param"`
}
