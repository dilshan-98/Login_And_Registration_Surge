const request = require("supertest");

const app = require("../server/server");

let auth = {};

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
});

test("Update Profile : Only username and fullname", async () => {
    await request(app)
        .put("/api/user/userDetails")
        .set("authorization", `Bearer ${auth.token}`)
        .send({
            fullname: "Dinusha Dilshan Siyasinghe"
        })
        .expect(201);
});



