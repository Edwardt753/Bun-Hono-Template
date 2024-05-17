import type { Options } from "sequelize";

// to force env variable to absolute string
declare module "bun" {
  interface Env {
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    DB_PORT: string;
  }
}

interface DB_Config {
  database: string;
  username: string;
  password?: string;
  options?: Options;
}

export interface ConfigGeneratorProps {
  db_name: string;
  db_user: string;
  db_pass: string;
  db_host: string;
  db_port: number;
}
// real configuration in here
export const DBConfigGenerator = ({
  db_name = Bun.env.DB_NAME,
  db_user = Bun.env.DB_USER,
  db_pass = Bun.env.DB_PASS,
  db_host = Bun.env.DB_HOST,
  db_port = parseInt(Bun.env.DB_PORT, 10),
}: Partial<ConfigGeneratorProps> = {}) => {
  const dbConfig: DB_Config = {
    database: db_name,
    username: db_user,
    password: db_pass,
    options: {
      host: db_host,
      port: db_port,
      dialect: "mysql",
      timezone: "+07:00",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30 * 1000, // in miliseconds
        idle: 10 * 1000,
      },
    },
  };

  return dbConfig;
};

export const mainDbConfig = DBConfigGenerator();
