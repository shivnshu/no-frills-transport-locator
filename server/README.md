# RESTful Go APIs Server

## Directory Structure
```
.
├── README.md
├── src
│   └── server
│       ├── server.go ...............: Entry Point
│       └── transport_locator .......: Helper Package
│           ├── controller.go .......: Methods to handle requests
│           ├── model.go ............: Database schemas
│           ├── repository.go .......: Interface to MongoDB
│           └── router.go ...........: Routing definitions
└── transportLocator.js .............: Example mongoDB entry
```

## Installation Instructions

### Docker Installation
1. Run `mongo < transportLocator.js` to create database and collection
2. Bind mongoDB server to all network interfaces of host machine
3. Run `docker build . -t <image-name>` to build container image
4. Run `docker run -it -p 8000:8000 <image-name>` to start the server

### Native Installation
1. Run `mongo < transportLocator.js` to create database and collection
2. Run `export GOPATH=$(pwd)`
3. Run `go get github.com/gorilla/handlers`
4. Run `go get github.com/gorilla/mux`
5. Run `go get gopkg.in/mgo.v2`
6. Build using `go build -o server.out server.go`
