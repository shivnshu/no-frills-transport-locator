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
		"GetAllLocations",
		"GET",
		"/get_all_locations",
		controller.GetAllLocations,
	},
	Route{
		"UpdateLocation",
		"POST",
		"/update_location",
		controller.UpdateLocation,
	},
	Route{
		"GetNearby",
		"POST",
		"/get_nearby",
		controller.GetNearby,
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
