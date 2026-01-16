import "./App.css";
import { employees } from "./data/employees";
import { groupByDepartment } from "./utils/groupByDepartment";
import { DepartmentSection } from "./components/DepartmentSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function App() {
  const departments = groupByDepartment(employees);

  return (
    <div className="page">
      <SiteHeader />

      <main className="site-main">
        {departments.map((department) => (
          <DepartmentSection key={department.name} department={department} />
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
