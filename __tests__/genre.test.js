const app = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);
const { DELETE_SUCCESS, NOT_FOUND } = require("../src/constants/message");
const endpoint = "api/v1/genres";

describe("Genre Endpoints", () => {
  it("Should return a property called genres", async done => {
    // Sends GET Request to /movies endpoint
    const response = await request.get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("genres");
    done();
  });

  it(`Should CREATE a genre with name: Comedy`, async done => {
    // Sends POST Request to /genres endpoint
    let genreName = `Test Genre ${Date.now()}`;

    const response = await request.post(endpoint).send({
      name: genreName,
      description: "Test Genre description"
    });
    expect(response.status).toBe(201);
    expect(response.body.genre.name).toBe(genreName);
    done();
  });

  it(`Should RETURN a genre with name: Horror`, async done => {
    // Sends GET Request to /genres/:id endpoint
    const response = await request.get(`${endpoint}/1`);
    expect(response.status).toBe(200);
    expect(response.body.genre.name).toBe("Horror");
    done();
  });

  it("Should DELETE a genre with given ID (from a newly created genre)", async done => {
    // Sends POST Request to /genres endpoint
    const createdGenre = await request.post(endpoint).send({
      name: `Test Genre ${Date.now()}`,
      description: "Test Genre description"
    });
    const id = createdGenre.body.genre.id;
    const response = await request.delete(`${endpoint}/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(DELETE_SUCCESS("Genre"));
    done();
  });

  it("Should try to delete a genre with given ID", async done => {
    // Sends DELETE Request to /genres/:id endpoint
    const response = await request.delete(`${endpoint}/10`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(NOT_FOUND("Genre"));
    done();
  });
});
