package transport_locator

// Define Models i.e. schemas

type transportLocation struct {
	ID          int     `bson: "_id`
	phoneNumber string  `json:"phone_number"`
	Latitude    float64 `bson:"lat"`
	Longitude   float64 `bson:"long"`
	Name        string  `json:"name"`
	carNumber   string  `json:"car_number"`
	Message     string  `json:"message"`
}

type transportLocations []transportLocation

type queryLocation struct {
	Latitude        float64 `bson:"lat"`
	Longitude       float64 `bson:"long"`
	searchParameter float64 `bson:"search_param"`
}
