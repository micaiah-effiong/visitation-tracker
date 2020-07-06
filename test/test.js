const { post } = require("request");
const { get } = require("request");
const bcrypt = require("bcrypt");
const { expect } = require("chai");

process.env.NODE_ENV = "test";
process.env.SESSION_SECRET = bcrypt.genSaltSync(10);
const app = require("../app");
const db = require("../models/index");

let server;
before((done) => {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      server = app.listen(3001, done);
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("test", () => {
  var cookie;
  describe("Get Started", () => {
    it("should responed with success as true", (done) => {
      post(
        "http://localhost:3001/auth/register",
        {
          json: {
            firstname: "admin",
            lastname: "admin",
            phone: "09000000000",
            gender: "M",
            email: "admin@test.com",
            password: "testing123",
            type: "AD",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("should responed with success as true", (done) => {
      post(
        "http://localhost:3001/auth/register",
        {
          json: {
            firstname: "test",
            lastname: "test",
            phone: "09000000001",
            gender: "M",
            email: "test@test.com",
            type: "VIS",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Login user", (done) => {
      post(
        "http://localhost:3001/auth/login",
        {
          json: {
            email: "admin@test.com",
            password: "testing123",
          },
        },
        (error, res) => {
          cookie = res.headers["set-cookie"];
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Create a visit", (done) => {
      post(
        "http://localhost:3001/visits",
        {
          headers: {
            Cookie: cookie,
          },
          json: {
            email: "test@test.com",
            purpose: "testing 124",
            directedTo: "admin@test.com",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Get multiple users", (done) => {
      get(
        "http://localhost:3001/users",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          done();
        }
      );
    });
    it("Get a single user", (done) => {
      get(
        "http://localhost:3001/users/1",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          expect(res).to.be.ok;
          done();
        }
      );
    });
    it("Get multiple visits", (done) => {
      get(
        "http://localhost:3001/visits",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          done();
        }
      );
    });
    it("Get a single visit", (done) => {
      get(
        "http://localhost:3001/visits/1",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          done();
        }
      );
    });
  });
});

after((done) => {
  db.sequelize.close();
  server.close(done);
  process.exit();
});
