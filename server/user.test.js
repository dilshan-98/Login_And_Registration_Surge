const request = require("supertest");
const bcrypt = require("bcrypt");

//const mongoose = require("mongoose");
const User = require("./models/user");

const app = require("../server/server");


let auth = {};
let auth2 = {};



test("Login existing user", async () => {
    const user = await request(app)
        .post("/api/user/login")
        .send({
            email: "d4@gmail.com",
            password: "Dinusha123#"
        })
        .expect(200)
    expect(user.body.token);

    auth.token = user.body.token;
});

test("Get user details", async () => {
    const user = await request(app)
        .get("/api/user/userDetails")
        .set("authorization", `Bearer ${auth.token}`)
        .expect(200)
    expect(user.success = "true");
});

test("New User Signin", async () => {
    const user = await request(app)
        .post("/api/user/register")
        .send({
            fullname: "Shan Perera",
            username: "Shan98",
            email: "shan@gmail.com",
            password: "ShanPerera123#"
        })
        .expect(201)
    expect(user.body.token);

    auth2.token = user.body.token;
});

test("Update Profile : Only username and fullname", async () => {
    await request(app)
        .put("/api/user/userDetails")
        .set("authorization", `Bearer ${auth2.token}`)
        .send({
            fullname: "Shan Dinuwan Perera",
            username: "ShanDinuwan98"
        })
        
        .expect(201);

});



