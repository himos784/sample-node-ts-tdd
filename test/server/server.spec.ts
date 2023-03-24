import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import createServer from "server";
const app = createServer();

chai.use(chaiHttp);

describe("server runs", () => {
  it("server created with no error", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({
          message: "Hello World",
        });
        done();
      });
  });
});
