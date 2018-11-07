package transport_locator

import (
	"crypto/rand"
	"crypto/rsa"
	// "crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"log"
	"net/http"
	"time"
)

type Controller struct {
	Repository Repository
}

func (c *Controller) extractPublicKey(key string) *rsa.PrivateKey {
	block, _ := pem.Decode([]byte(key))
	if block == nil {
		log.Println("Error reading key")
	}
	publicKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		log.Println("Error decoding PKI key")
	}
	return publicKey
}

func (c *Controller) decryptTransportLocation(data encryptedData) transportLocation {
	ID := data.ID
	publicKey := c.Repository.getPublicKey(ID)
	decryptKey := c.extractPublicKey(publicKey)
	cipherData, _ := base64.StdEncoding.DecodeString(data.Data)
	decryped, err := rsa.DecryptPKCS1v15(rand.Reader, decryptKey, cipherData)
	if err != nil {
		log.Println("Unable to decrypt data")
		panic(err)
	}

	location := transportLocation{}
	err = json.Unmarshal(decryped, &location)
	if err != nil {
		panic(err)
	}
	return location
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

	var location transportLocation

	err := json.NewDecoder(r.Body).Decode(&location)
	if err != nil {
		panic(err)
	}
	// publicKey = extractPublicKey(location.PublicKey)
	// log.Println(publicKey)
	c.Repository.addUpdatePublicKey(location.ID, location.PublicKey)

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
}

func (c *Controller) UpdateTransportLocation(w http.ResponseWriter, r *http.Request) {
	log.Println("Called UpdateTransportLocation controller")

	data := encryptedData{}

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err)
	}

	location := c.decryptTransportLocation(data)

	location.TimeStamp = time.Now().Unix()
	// err := json.NewDecoder(r.Body).Decode(&location)
	// if err != nil {
	// panic(err)
	// }

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
}
