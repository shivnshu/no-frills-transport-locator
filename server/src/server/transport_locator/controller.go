package transport_locator

import (
	"encoding/json"
	"log"
	"net/http"
)

type Controller struct {
	Repository Repository
}

func (c *Controller) GetAllLocations(w http.ResponseWriter, r *http.Request) {
	log.Println("Called GetAllLocations controller")
	locations := c.Repository.GetAllLocations()
	data, _ := json.Marshal(locations)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	return
}

func (c *Controller) UpdateLocation(w http.ResponseWriter, r *http.Request) {
	log.Println("Called UpdateLocation controller")

	location := transportLocation{}

	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		panic(err)
	}

	res := c.Repository.UpdateLocation(location)
	w.WriteHeader(http.StatusOK)
	if res {
		w.Write([]byte("Updation successful"))
	} else {
		w.Write([]byte("Updation failed"))
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	return

	/*
		// DEBUG
		locationJson, err := json.Marshal(location)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(locationJson)
		return
	*/
}

func (c *Controller) GetNearby(w http.ResponseWriter, r *http.Request) {
	log.Println("Called GetNearby controller")

	userLocation := queryLocation{}

	err := json.NewDecoder(r.Body).Decode(&userLocation)
	if err != nil {
		panic(err)
	}

	locations := c.Repository.GetNearBy(userLocation)
	data, _ := json.Marshal(locations)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	return

	/*
		// DEBUG
		userLocationJson, err := json.Marshal(userLocation)
		if err != nil {
			panic(err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(userLocationJson)
		return
	*/
}
