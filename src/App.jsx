import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TasksFormPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="mx-auto">
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/ingreso" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/turnos" element={<TasksPage />} />
                <Route path="/solicitar-turno" element={<TaskFormPage />} />
                <Route path="/turnos/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
