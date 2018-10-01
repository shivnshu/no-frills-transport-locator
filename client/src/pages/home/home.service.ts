import { Injectable } from "@angular/core";
import { HTTPService } from "../../app/httpservice.service";

@Injectable()
export class HomeService{
    constructor(private httpService: HTTPService){

    }
    
    getData(){
        return this.httpService.sendGETRequest("http://localhost/get")
    }
}