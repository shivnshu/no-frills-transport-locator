package transport_locator

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
)

type Repository struct{}

const SERVER = "mongodb://172.17.0.1:27017"

const DBName = "transportLocator"

const Collection = "locations"

func (r Repository) GetAllTransportsLocations() transportLocations {
	session, err := mgo.Dial(SERVER)

	if err != nil {
		log.Println("Failed to establish connection to MongoDB")
	}

	defer session.Close()

	c := session.DB(DBName).C(Collection)
	results := transportLocations{}

	if err := c.Find(nil).All(&results); err != nil {
		log.Println("Failed to get results of GetAllTransportsLocations:", err)
	}
	return results
}

func (r Repository) AddNewTransport(location transportLocation) bool {
	session, err := mgo.Dial(SERVER)
	defer session.Close()

	var idLocation interface{}
	err = session.DB(DBName).C(Collection).FindId(location.ID).One(&idLocation)
	if err == nil {
		log.Printf("Transport with ID %d already exists.\n", location.ID)
		return false
	}
	err = session.DB(DBName).C(Collection).Insert(location)
	if err != nil {
		log.Fatal(err)
		return false
	}

	log.Println("Added new transport with id:", location.ID)
	return true
}

func (r Repository) DeleteTransport(id int64) bool {
	session, err := mgo.Dial(SERVER)
	defer session.Close()

	var idLocation interface{}
	err = session.DB(DBName).C(Collection).FindId(id).One(&idLocation)
	if err != nil {
		log.Printf("Transport with ID %d does not exists.\n", id)
		return false
	}
	err = session.DB(DBName).C(Collection).Remove(bson.M{"_id": id})
	if err != nil {
		log.Fatal(err)
		return false
	}

	log.Println("Deleted transport with id:", id)
	return true

}

func (r Repository) UpdateTransportLocation(location transportLocation) (bool, error) {
	session, err := mgo.Dial(SERVER)
	defer session.Close()

	var idLocation interface{}
	err = session.DB(DBName).C(Collection).FindId(location.ID).One(&idLocation)
	if err != nil {
		log.Printf("Transport with ID %d do not exist.\n", location.ID)
		return false, nil
	}

	bsonData, _ := bson.Marshal(location)
	var bsonMap map[string]interface{}
	_ = bson.Unmarshal(bsonData, &bsonMap)
	err = session.DB(DBName).C(Collection).Update(bson.M{"_id": location.ID}, bson.M{"$set": bsonMap})

	if err != nil {
		log.Fatal(err)
		return false, err
	}

	log.Println("Updated transport location with id:", location.ID)
	return true, nil
}

func (r Repository) GetNearByTransports(userLocation queryLocation) transportLocations {
	session, _ := mgo.Dial(SERVER)
	defer session.Close()

	minLat := userLocation.Latitude - userLocation.SearchParameter
	maxLat := userLocation.Latitude + userLocation.SearchParameter

	minLong := userLocation.Longitude - userLocation.SearchParameter
	maxLong := userLocation.Longitude + userLocation.SearchParameter

	query := bson.M{"lat": bson.M{"$gt": minLat, "$lt": maxLat}, "long": bson.M{"$gt": minLong, "$lt": maxLong}}
	// fmt.Println("DEBUG: query is ", query)

	results := transportLocations{}
	err := session.DB(DBName).C(Collection).Find(query).All(&results)
	if err != nil {
		log.Println("Failed to get results of GetNearByTransports:", err)
	}

	// fmt.Println("DEBUG: getNearbyResult ", results)
	return results
}
