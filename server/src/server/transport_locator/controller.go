package transport_locator

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type Controller struct {
	Repository Repository
}

func (c *Controller) GetAllTransportsLocations(w http.ResponseWriter, r *http.Request) {
	log.Println("Called GetAllTransportsLocations controller")
	locations := c.Repository.GetAllTransportsLocations()
	data, _ := json.Marshal(locations)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	return
}

func (c *Controller) AddNewTransport(w http.ResponseWriter, r *http.Request) {
	log.Println("Called AddNewTransport controller")

	location := transportLocation{}

	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		panic(err)
	}
	// Seconds since unix epoch
	location.TimeStamp = time.Now().Unix()
	res := c.Repository.AddNewTransport(location)
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if res {
		w.Write([]byte("Signup successful."))
	} else {
		w.Write([]byte("Signup failed. Try signing in."))
	}
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

func (c *Controller) DeleteTransport(w http.ResponseWriter, r *http.Request) {
	log.Println("Called DeleteTransport controller")

	location := transportLocation{}

	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		panic(err)
	}
	w.WriteHeader(http.StatusOK)
	if location.ID == 0 {
		w.Write([]byte("ID not supplied."))
		return
	}
	res := c.Repository.DeleteTransport(location.ID)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if res {
		w.Write([]byte("Deletion successful."))
	} else {
		w.Write([]byte("Deletion failed. Driver with supplied ID does not exist."))
	}
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

func (c *Controller) UpdateTransportLocation(w http.ResponseWriter, r *http.Request) {
	log.Println("Called UpdateTransportLocation controller")

	location := transportLocation{}

	location.TimeStamp = time.Now().Unix()
	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		panic(err)
	}
	if location.ID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Driver ID not supplied"))
		return
	}
	res, err := c.Repository.UpdateTransportLocation(location)
	w.WriteHeader(http.StatusOK)
	if res == false && err == nil {
		w.Write([]byte("Driver ID does not exist. Please signup first."))
		return
	}
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

func (c *Controller) GetNearbyTransports(w http.ResponseWriter, r *http.Request) {
	log.Println("Called GetNearbyTransports controller")

	userLocation := queryLocation{}

	err := json.NewDecoder(r.Body).Decode(&userLocation)
	if err != nil {
		panic(err)
	}

	locations := c.Repository.GetNearByTransports(userLocation)
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
