import {
  DataTypes,
  Sequelize,
  type ModelDefined,
  type Optional,
} from "sequelize"; //import from sequelize

export interface Attributes {
  id: number;
  email: string;
  gender: string;
  grade: number;
  updatedAt: Date;
  createdAt: Date;
}

export type CreationAttributes = Optional<
  Attributes,
  "id" | "email" | "gender" | "grade" | "updatedAt" | "createdAt"
>;

export const studentmodel = (sequelize: Sequelize) => {
  const student: ModelDefined<Attributes, CreationAttributes> =
    sequelize.define(
      "students",
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        fullname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        grade: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        freezeTableName: true,
        underscored: true,
        paranoid: true, //--Soft delete feature
        deletedAt: "status",
      }
    );
  return student;
};

export default studentmodel;
