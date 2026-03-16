import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";
import organizationRoutes from "./routes/organizationRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/organization", organizationRoutes);

export default app;
