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
	w.Header().Set("Content-Type", "text/html; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Accessed UpdateLocation controller"))
	return
}

func (c *Controller) GetNearby(w http.ResponseWriter, r *http.Request) {
	log.Println("Called GetNearby controller")
	w.Header().Set("Content-Type", "text/html; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Accessed GetNearby controller"))
	return
}
