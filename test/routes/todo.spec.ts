import { numberToBoolean } from "helpers/booleanChecker";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { createTodo, truncateTodos } from "helpers/todo";
import createServer from "server";
const app = createServer();

chai.use(chaiHttp);

const sampleTodos = [
  { title: "Buy milk", completed: false },
  { title: "Do laundry", completed: true },
  { title: "Do Unit Test", completed: true },
];

describe("routes /todo", () => {
  beforeEach(async () => {
    await truncateTodos();
  });

  it("retrieve list of todos", async () => {
    await createTodo(sampleTodos[0]);
    await createTodo(sampleTodos[1]);
    await createTodo(sampleTodos[2]);

    chai
      .request(app)
      .get("/todo")
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        const todos = res.body.data;
        expect(todos[0].title).to.eql(sampleTodos[0].title);
        expect(numberToBoolean(Number(todos[0].completed), 1)).to.eql(
          sampleTodos[0].completed
        );
        expect(todos[1].title).to.eql(sampleTodos[1].title);
        expect(numberToBoolean(Number(todos[1].completed), 1)).to.eql(
          sampleTodos[1].completed
        );
        expect(todos[2].title).to.eql(sampleTodos[2].title);
        expect(numberToBoolean(Number(todos[2].completed), 1)).to.eql(
          sampleTodos[2].completed
        );
      });
  });

  it("retrieve todo", async () => {
    const todo = await createTodo(sampleTodos[2]);

    chai
      .request(app)
      .get(`/todo/${todo.id}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        const todo = res.body.data;
        expect(todo.title).to.eql(sampleTodos[2].title);
        expect(numberToBoolean(Number(todo.completed), 1)).to.eql(
          sampleTodos[2].completed
        );
      });
  });

  it("returns the created todo", async () => {
    chai
      .request(app)
      .post("/todo")
      .send(sampleTodos[2])
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        const todo = res.body.data;
        expect(todo.title).to.eql(sampleTodos[2].title);
        expect(numberToBoolean(Number(todo.completed), 1)).to.eql(
          sampleTodos[2].completed
        );
      });
  });

  it("returns the updated todo", async () => {
    const newTitle = "Edited Do Unit Test";
    const todo = await createTodo(sampleTodos[2]);

    chai
      .request(app)
      .put(`/todo/${todo.id}`)
      .send({ ...todo, ...{ title: newTitle } })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        const todo = res.body.data;
        expect(todo.title).to.eql(newTitle);
        expect(numberToBoolean(Number(todo.completed), 1)).to.eql(
          sampleTodos[2].completed
        );
      });
  });

  it("returns message Successfully deleted", async () => {
    const todo = await createTodo(sampleTodos[2]);

    chai
      .request(app)
      .delete(`/todo/${todo.id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.eql({ message: "Successfully deleted!" });
      });
  });
});
