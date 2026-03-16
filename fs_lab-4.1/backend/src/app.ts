import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

app.use("/api/employees", employeeRoutes);

export default app;