const app = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);
const { DELETE_SUCCESS, NOT_FOUND } = require("../src/constants/message");
const endpoint = "/api/v1/movies";

describe("Movies Endpoints", () => {
  it("Should return a property called movies", async done => {
    // Sends GET Request to /movies endpoint
    const response = await request.get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("movies");
    done();
  });

  it("Should return a movie with named: The Girl with the Dragon Tattoo", async done => {
    // Sends GET Request to /movies/:id endpoint
    const response = await request.get(`${endpoint}/2`);
    // console.log(response.body.error);
    expect(response.status).toBe(200);
    expect(response.body.movie.name).toBe("The Girl with the Dragon Tattoo");
    done();
  });

  it("Should create a movie with name: Split", async done => {
    // Sends POST Request to /movies endpoint
    let movieName = `Test Movie ${Date.now()}`;
    const response = await request.post(endpoint).send({
      name: movieName,
      description: "Test Movie",
      releaseDate: "January 20, 2017",
      duration: "117",
      rating: 4,
      genreIds: [2, 4]
    });
    expect(response.status).toBe(201);
    expect(response.body.movie.name).toBe(movieName);
    done();
  });

  it("Should DELETE a movie with given ID (from a newly created genre)", async done => {
    // Sends POST Request to /movies endpoint
    const createdMovie = await request.post(endpoint).send({
      name: `Test Movie ${Date.now()}`,
      description: "Test Movie",
      releaseDate: "January 20, 2017",
      duration: "117",
      rating: 4,
      genreIds: [1, 2]
    });
    const id = createdMovie.body.movie.id;
    const response = await request.delete(`${endpoint}/${id}`);
    expect(response.status).toBe(200);
    console.log(response.body.error);
    expect(response.body.message).toBe(DELETE_SUCCESS("Movie"));
    done();
  });

  it("Should try to delete a Movie with given ID", async done => {
    // Sends DELETE Request to /movies/:id endpoint
    const response = await request.delete(`${endpoint}/10`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(NOT_FOUND("Movie"));
    done();
  });
});
