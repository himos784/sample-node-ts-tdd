import dbSequelize from "config/database";
import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "sequelize";

export class Todo extends Model<
  InferAttributes<Todo>,
  InferCreationAttributes<Todo>
> {
  declare id: string;
  declare title: string;
  declare completed: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "todos",
    sequelize: dbSequelize, // passing the `sequelize` instance is required
  }
);
