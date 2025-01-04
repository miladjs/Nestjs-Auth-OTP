import { registerAs } from "@nestjs/config";

export const enum ConfigKeys {
  APP = "App",
  DB = "Db",
  Jwt = "Jwt",
}

const AppConfig = registerAs(ConfigKeys.APP, () => ({
  port: 4000,
}));

const JwtConfig = registerAs(ConfigKeys.Jwt, () => ({
  accessTokenSecret: "dd2e8e269b01a1c132cf5d8d59513ca2a762931c",
  refreshTokenSecret: "eb42927ff2c98cb128424b049d11bfca4c88aec0",
}));

const DbConfig = registerAs(ConfigKeys.DB, () => ({
  port: 5432,
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "kura",
}));

export const configurations = [AppConfig, DbConfig, JwtConfig];
