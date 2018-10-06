package transport_locator

import (
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
)

type Repository struct{}

const SERVER = "mongodb://172.17.0.1:27017"

const DBName = "transportLocator"

const Collection = "locations"

// Return all locations in db
func (r Repository) GetAllLocations() transportLocations {
	session, err := mgo.Dial(SERVER)

	if err != nil {
		fmt.Println("Failed to establish connection to MongoDB")
	}

	defer session.Close()

	c := session.DB(DBName).C(Collection)
	results := transportLocations{}

	if err := c.Find(nil).All(&results); err != nil {
		fmt.Println("Failed to get results: ", err)
	}
	return results
}

// Update/Add car location
func (r Repository) UpdateLocation(location transportLocation) bool {
	session, err := mgo.Dial(SERVER)
	defer session.Close()

	_, err = session.DB(DBName).C(Collection).UpsertId(location.ID, location)

	if err != nil {
		log.Fatal(err)
		return false
	}

	fmt.Println("Updated/added location at id: ", location.ID)
	return true
}

func (r Repository) GetNearBy(userLocation queryLocation) transportLocations {
	session, _ := mgo.Dial(SERVER)
	defer session.Close()

	minLat := userLocation.Latitude - userLocation.SearchParameter
	maxLat := userLocation.Latitude + userLocation.SearchParameter

	minLong := userLocation.Longitude - userLocation.SearchParameter
	maxLong := userLocation.Longitude + userLocation.SearchParameter

	query := bson.M{"lat": bson.M{"$gt": minLat, "$lt": maxLat}, "long": bson.M{"$gt": minLong, "$lt": maxLong}}
	// fmt.Println("DEBUG: query is ", query)

	results := transportLocations{}
	_ = session.DB(DBName).C(Collection).Find(query).All(&results)

	// fmt.Println("DEBUG: getNearbyResult ", results)
	return results
}
