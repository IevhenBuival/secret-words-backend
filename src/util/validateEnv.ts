import { cleanEnv, port, str } from "envalid"

export default cleanEnv(process.env, {
  MONGO_CONECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRED: str(),
})
