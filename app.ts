import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import createError from "http-errors";
import cors from "cors";
// Routers
import apiRouter from "./routers";

const app = express();
dotenv.config();
app.use(cors());

// DB연결
const DB_URL =
  process.env.MONGODB_URI || "MongoDB의 서버 주소와 env 파일을 확인해보세요!\n";
mongoose.connect(DB_URL, { dbName: "EarF" });
const db = mongoose.connection;
db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다!  " + DB_URL)
);
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

app.use(express.json()); // JSON 요청 바디 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 바디 파싱
app.use(express.static("public")); // 정적 파일 서비스

// const corsOptions: CorsOptions = {
//   origin: true,
//   optionsSuccessStatus: 200,
// };

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("this is EarF HOME PAGE");
});

//에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("뭔가 잘못된겁니다.");
});

const port = process.env.PORT as string;
const url = process.env.URL as string;

app.listen(port, () => {
  console.log(`
    #############################################
        🛡️ Server listening on {${url}:${port} 🛡️
    #############################################    
    `);
});