import { expect } from "chai";
import { numberToBoolean } from "helpers/booleanChecker";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  truncateTodos,
  updateTodo,
} from "helpers/todo";
import { Op } from "sequelize";

const sampleTodos = [
  { title: "Buy milk", completed: false },
  { title: "Do laundry", completed: true },
  { title: "Do Unit Test", completed: true },
];

describe("todo - helper", () => {
  beforeEach(async () => {
    await truncateTodos();
  });

  describe("todo - create", () => {
    it("returns a non-completed todo", async () => {
      const title = sampleTodos[2].title;
      const completed = false;
      const data = { title, completed };

      const todo = await createTodo(data);

      expect(todo.title).to.eql(title);
      expect(todo.completed).to.eql(completed);
    });

    it("returns a completed todo", async () => {
      const title = sampleTodos[2].title;
      const completed = true;
      const data = { title, completed };

      const todo = await createTodo(data);

      expect(todo.title).to.eql(title);
      expect(todo.completed).to.eql(completed);
    });
  });

  describe("todo - read", () => {
    it("returns 3 todos", async () => {
      await createTodo(sampleTodos[0]);
      await createTodo(sampleTodos[1]);
      await createTodo(sampleTodos[2]);

      const todos = await getTodos({});

      expect(todos).to.have.lengthOf(3);
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

    it("returns a todo from created todo using id", async () => {
      const title = sampleTodos[2].title;
      const todo = await createTodo(sampleTodos[2]);

      const returnedTodo = await getTodo(todo.id);

      expect(returnedTodo.title).to.eql(title);
      expect(numberToBoolean(Number(returnedTodo.completed), 1)).to.eql(
        sampleTodos[2].completed
      );
    });

    it("returns record having title Do laundry and Do Unit Test", async () => {
      await createTodo(sampleTodos[0]);
      await createTodo(sampleTodos[1]);
      await createTodo(sampleTodos[2]);

      const todos = await getTodos({
        where: {
          title: { [Op.like]: "%Do%" },
        },
      });

      expect(todos[0].title).to.eql(sampleTodos[1].title);
      expect(todos[1].title).to.eql(sampleTodos[2].title);
    });
  });

  describe("todo - update", () => {
    it("returns an updated todo from created todo", async () => {
      const data = sampleTodos[2];
      const newTitle = "Updated Title";
      const todo = await createTodo(data);
      const todoId = todo.id;

      await updateTodo(todoId, {
        ...data,
        ...{ title: newTitle },
      });
      const returnedTodo = await getTodo(todoId);

      expect(returnedTodo.title).to.eql(newTitle);
    });
  });

  describe("todo - delete", () => {
    it("returns 0 todos - since all are truncated", async () => {
      await createTodo(sampleTodos[0]);
      await createTodo(sampleTodos[1]);
      await createTodo(sampleTodos[2]);
      await truncateTodos();

      const todos = await getTodos({});

      expect(todos).to.have.lengthOf(0);
    });

    it("returns empty UserData", async () => {
      const todo = await createTodo(sampleTodos[2]);

      await deleteTodo(todo.id);
      const returnedTodo = await getTodo(todo.id);
      const { id, title, completed } = returnedTodo;

      expect(id).to.eql("");
      expect(title).to.eql("");
      expect(completed).to.eql(false);
    });

    it("returns sampleTodos[0] and sampleTodos[2] since sampleTodos[1] is deleted", async () => {
      await createTodo(sampleTodos[0]);
      const todo = await createTodo(sampleTodos[1]);
      await createTodo(sampleTodos[2]);

      await deleteTodo(todo.id);

      const todos = await getTodos({});

      expect(todos).to.have.lengthOf(2);
      expect(todos[0].title).to.eql(sampleTodos[0].title);
      expect(numberToBoolean(Number(todos[0].completed), 1)).to.eql(
        sampleTodos[0].completed
      );
      expect(todos[1].title).to.eql(sampleTodos[2].title);
      expect(numberToBoolean(Number(todos[1].completed), 1)).to.eql(
        sampleTodos[2].completed
      );
    });
  });
});
