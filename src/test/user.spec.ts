import "mocha";
import "chai-http";
const chai = require("chai");
//let should = chai.should();


chai.use(require("chai-http"));

import * as config from '../config/index';

console.log("**************");
console.log("inside chai mocha");



describe("User Specifications Test", () => {

    describe("POST /v1/api/user It should return new user details", () => {
        it("returns status code 201", (done) => {
            let request = {
                "email": "pranjal.kulshrestha121@gmail.com",
                "firstName": "Pranjal",
                "password": "Password@123",

            }
            chai.request(config.SERVER.APP_URL)
                .post(`${config.SERVER.APP_URL}/api/v1/user`)
                .send(request)
                .end((error: any, response: any) => {
                    if (error) {
                        console.log(error);
                    }
                    response.should.have.status(201);
                    response.body.should.have.property("statusCode").eql(201);
                    done();
                })
        })
    })

    describe("POST / It should return Bad request Error for same Email Address", () => {
        it("returns status code 400|409", (done) => {
            let request = {
                "email": "pranjal.kulshrestha92@gmail.com",
            };
            chai.request(config.SERVER.APP_URL)
                .get(`${config.SERVER.API_BASE_URL}/api/v1/user`)
                .send(request)
                .end((error: any, response: any) => {
                    if (error) {
                        console.log(error);
                    }
                    response.body.should.have.status(400);
                    response.body.should.have.property("statusCode").eql(400);
                    response.body.
                    done();
                });
        });
    });

    describe("GET /:id should return User Details for given userId", () => {
        it("returns status code 200", (done) => {
            let id=`628746699b455017583cccde`
            chai.request(config.SERVER.APP_URL)
                .get(`${config.SERVER.API_BASE_URL}/api/v1/user/${id}`)
                .end((error: any, response: any) => {
                    if (error) {
                        console.log(error);
                    }
                    response.should.have.status(200);
                    response.body.should.have.property("statusCode").eql(200);
                    response.body.data.should.be.a('object');
                    done();
                });
        });
    });

    describe("GET /:id should return 404(Not found) for invalid userId", () => {
        it("returns status code 404", (done) => {
            let id=`628746699b455017591cccde`
            chai.request(config.SERVER.APP_URL)
                .get(`${config.SERVER.API_BASE_URL}/api/v1/user/${id}`)
                .end((error: any, response: any) => {
                    if (error) {
                        console.log(error);
                    }
                    response.should.have.status(404);
                    response.body.should.have.property("statusCode").eql(404);
                    done();
                });
        });
    });

    describe("GET /users/listing should return all UsersPaginated result ", () => {
        it("returns status code 200", (done) => {
            let pageNo=1;
            let limit=10;
            chai.request(config.SERVER.APP_URL)
                .get(`${config.SERVER.API_BASE_URL}/api/v1/user/users/listing?pageNo=${pageNo}&limit=${limit}`)
                .end((error: any, response: any) => {
                    if (error) {
                        console.log(error);
                    }
                    response.should.have.status(200);
                    response.body.should.have.property("statusCode").eql(200);
                    response.body.data.data.should.be.a('array');
                    response.body.should.have.property("total");
                    response.body.should.have.property("nextPage");
                    done();
                });
        });
    });



    
})
