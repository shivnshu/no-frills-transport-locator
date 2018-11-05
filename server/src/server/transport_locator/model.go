package transport_locator

// Define Models i.e. schemas

type transportLocation struct {
	ID          int64   `bson:"_id"`
	PhoneNumber string  `bson:"phone_number,omitempty"`
	Latitude    float64 `bson:"lat,omitempty"`
	Longitude   float64 `bson:"long,omitempty"`
	Name        string  `bson:"name,omitempty"`
	CarNumber   string  `bson:"car_number,omitempty"`
	Message     string  `bson:"message,omitempty"`
	TimeStamp   int64   `bson:"time_stamp"`
	PublicKey   string  `bson:"public_key"`
}

type transportLocations []transportLocation

type queryLocation struct {
	Latitude        float64 `bson:"lat"`
	Longitude       float64 `bson:"long"`
	SearchParameter float64 `bson:"search_param"`
}

type publicKeys struct {
	PhoneNumber int64  `bson:"_id"`
	PublicKey   string `bson:"public_key"`
}

type encryptedData struct {
	PhoneNumber int64  `json:"PhoneNumber"`
	Data        string `json:"Data"`
}
