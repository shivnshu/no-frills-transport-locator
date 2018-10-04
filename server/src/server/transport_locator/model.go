package transport_locator

// Define Models i.e. schemas

type transportLocation struct {
	ID          int     `bson: "_id`
	phoneNumber string  `json:"phone_number"`
	Latitude    float64 `bson:"lat"`
	Longitude   float64 `bson:"long"`
	Other       string  `json:"other"`
}

type transportLocations []transportLocation
