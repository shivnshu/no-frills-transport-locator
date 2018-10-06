FROM golang:1.10.2

ADD . /go

RUN go get github.com/gorilla/mux
RUN go get gopkg.in/mgo.v2

RUN go build -o server.out /go/src/server/server.go

EXPOSE 8000

ENTRYPOINT ["/go/server.out"]
