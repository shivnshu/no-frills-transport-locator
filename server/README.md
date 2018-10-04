# RESTful Go APIs Server

## Directory Structure
`
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
└── transportLocator.js
`

## Installation Instructions
1. Run `export GOPATH=$(pwd)`
2. Run `go get github.com/gorilla/handlers`
3. Run `go get github.com/gorilla/mux`
4. Run `go get gopkg.in/mgo.v2`
5. Build using `go build -o server.out server.go`
