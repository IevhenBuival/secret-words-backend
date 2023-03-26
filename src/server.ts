import app from "./app"
import "dotenv/config"
import mongoose from "mongoose"
import env from "./util/validateEnv"
import apptest from "./apptest"

const port = env.PORT || 80

mongoose.set("strictQuery", true)

main().catch((err) => console.log("main catch:" + err))
async function main() {
  try {
    return await new Promise((resolve, reject) => {
      resolve(
        mongoose.connect(env.MONGO_CONECTION_STRING, undefined).then(
          () => {
            app.listen(port, function () {
              console.log(`start on ${port} port with mongoose`)
            })
            console.info(`Connected to database`)
          },
          (error) => {
            throw Error(`Connection error: ${error.stack}`)
          }
        )
      )
      reject(new Error("ups"))
    })
  } catch {
    throw new Error("throw uncaughtException mondo db")
  }
}

process.on("uncaughtException", (err) => {
  console.log(err, "UE")
  apptest.listen(port, function () {
    console.log(`start on ${port} port without mongoose`)
  })
})
