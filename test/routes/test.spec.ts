import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "server";
const app = createServer();

chai.use(chaiHttp);

describe("routes /test", () => {
  it("GET METHOD - /", () => {
    chai
      .request(app)
      .get("/test")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({ data: [] });
      });
  });

  it("GET METHOD - /:id", () => {
    chai
      .request(app)
      .get("/test/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({ id: 1 });
      });
  });

  it("POST METHOD - /", () => {
    chai
      .request(app)
      .post("/test")
      // .set("content-type", "application/json")
      // .type("form")
      .send({ sample: "data" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({ data: { sample: "data" } });
      });
  });

  it("PUT METHOD - /:id", () => {
    chai
      .request(app)
      .put("/test/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({ id: 1 });
      });
  });

  it("DELETE METHOD - /:id", () => {
    chai
      .request(app)
      .delete("/test/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({ id: 1 });
      });
  });
});
