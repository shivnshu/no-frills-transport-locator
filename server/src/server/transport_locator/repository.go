package transport_locator

import (
	"fmt"
	"gopkg.in/mgo.v2"
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
