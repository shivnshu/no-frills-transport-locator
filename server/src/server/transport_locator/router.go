package transport_locator

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

var controller = &Controller{Repository: Repository{}}

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"GetAllTransportsLocations",
		"GET",
		"/get_all_transports_locations",
		controller.GetAllTransportsLocations,
	},
	Route{
		"AddNewTransport",
		"POST",
		"/add_new_transport",
		controller.AddNewTransport,
	},
	Route{
		"UpdateTransportLocation",
		"POST",
		"/update_transport_location",
		controller.UpdateTransportLocation,
	},
	Route{
		"GetNearbyTransports",
		"POST",
		"/get_nearby_transports",
		controller.GetNearbyTransports,
	},
}

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler
		log.Println("Set router: " + route.Method + " " + route.Pattern + " -> " + route.Name)
		handler = route.HandlerFunc

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}
	return router
}
