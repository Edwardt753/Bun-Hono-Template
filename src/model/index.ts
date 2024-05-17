import { mainDbConfig } from "../model/dbConfig";
import { Sequelize, type ModelDefined } from "sequelize";

import * as studentmodel from "./main_model/studentmodel";
interface Main_DB {
  model_name: string;
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  studentsmodel: ModelDefined<
    studentmodel.Attributes,
    studentmodel.CreationAttributes
  >;
}

// Create Connection Between Sequelize and Database (--> MySQL)
const sequelize = new Sequelize(
  mainDbConfig.database,
  mainDbConfig.username,
  mainDbConfig.password,
  mainDbConfig.options
);

const main_db: Partial<Main_DB> = {};
main_db.model_name = "this is the db_journal";
main_db.Sequelize = Sequelize;
main_db.sequelize = sequelize;

main_db.studentsmodel = studentmodel.studentmodel(sequelize as Sequelize);

// Synchronize Sequelize Model and Actual Datatables in SQL
main_db.sequelize
  .sync({ force: true })
  // .sync({ force: true }) // force sync --> remove old and create new
  // .sync({ alter: true }) // sync update --> update existing table only
  .then(async () => {
    if (Bun.env.SEED_DB === "TRUE") {
      //insert data seeder
      try {
        // await main_db.content?.bulkCreate(seed.listContentsData);
        console.log("seeder");
      } catch (error) {
        console.log(error);
      }
    }
    // initialSeed();
    console.log("syncronization to db_academy has done");
  });
export default main_db;
