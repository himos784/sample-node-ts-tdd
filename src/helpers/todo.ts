import { Todo } from "models/todo";
import { FindOptions } from "sequelize";
import { UserData, UserRequestData } from "types/user";
import { v4 as uuidV4 } from "uuid";

//Create
const createTodo = async (data: UserRequestData): Promise<UserData> => {
  const id = uuidV4();
  const record = await Todo.create({ ...data, id });

  return record;
};

//Read
const getTodos = async (queryOptions: FindOptions): Promise<UserData[]> => {
  return await Todo.findAll(queryOptions);
};

const getTodo = async (id: string): Promise<UserData> => {
  const record = await Todo.findByPk(id);

  if (record === null) {
    return {
      id: "",
      title: "",
      completed: false,
    };
  }

  return record;
};

//Update
const updateTodo = async (id: string, data: UserRequestData): Promise<void> => {
  await Todo.update(data, { returning: true, where: { id } });
};

//Delete
const deleteTodo = async (id: string): Promise<void> => {
  await Todo.destroy({
    where: {
      id,
    },
  });
};

const truncateTodos = async (): Promise<void> => {
  await Todo.destroy({
    truncate: true,
  });
};

export { createTodo, getTodos, truncateTodos, getTodo, updateTodo, deleteTodo };
