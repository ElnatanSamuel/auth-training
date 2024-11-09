const request = require("supertest");
const app = require("./server"); // Adjust the import based on your server setup

describe("POST /login", () => {
  it("should return access and refresh tokens on successful login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "testUser", password: "testPassword" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("should return 400 for invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "wrongUser", password: "wrongPassword" });

    expect(response.status).toBe(400);
  });
});
