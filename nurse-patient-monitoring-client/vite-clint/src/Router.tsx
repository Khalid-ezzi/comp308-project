import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/account/login";
import App from "./App";
import Register from "./pages/account/register";
import Home from "./pages/home/home";
import PatientsDashboard from "./pages/patient-management/patients-dashboard";
import PatientAdd from "./pages/patient-management/patient-add";
import PatientManagementPage from "./pages/patient-management/patient-management-page";
import EmergencyAlertForm from "./pages/patient-view/EmergencyAlertForm";
import DailyInfoEntryForm from "./pages/patient-view/DailyInfoEntryForm";
import SymptomsAndConditionsPage from "./pages/patient-view/SymptomChecklistForm";
import NurseProtectedRoute from "./components/NurseProtectedRoute";
import PatientProtectedRoute from "./components/PatientProtectedRoute";
import PatientDashboard from "./pages/patient-view/PatientDashboard";
import NurseAlertsPage from "./pages/patient-management/NurseAlertsPage";
import NotAuthorized from "./pages/error/NotAuthorized";
import PageNotFound from "./pages/error/PageNotFound";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />

                {/* Nurse-specific routes */}
                <Route
                    path="/patients"
                    element={
                        <NurseProtectedRoute>
                            <PatientsDashboard />
                        </NurseProtectedRoute>
                    }
                />
                <Route
                    path="/patients/add"
                    element={
                        <NurseProtectedRoute>
                            <PatientAdd />
                        </NurseProtectedRoute>
                    }
                />
                <Route
                    path="/patients/id/:id"
                    element={
                        <NurseProtectedRoute>
                            <PatientManagementPage />
                        </NurseProtectedRoute>
                    }
                />
                <Route
                    path="/alerts"
                    element={
                        <NurseProtectedRoute>
                            <NurseAlertsPage />
                        </NurseProtectedRoute>
                    }
                />

                {/* Patient-specific routes */}
                <Route
                    path="/alert-form"
                    element={
                        <PatientProtectedRoute>
                            <EmergencyAlertForm />
                        </PatientProtectedRoute>
                    }
                />
                <Route
                    path="/daily-info"
                    element={
                        <PatientProtectedRoute>
                            <DailyInfoEntryForm />
                        </PatientProtectedRoute>
                    }
                />
                <Route
                    path="/symptom-checklist"
                    element={
                        <PatientProtectedRoute>
                            <SymptomsAndConditionsPage />
                        </PatientProtectedRoute>
                    }
                />
                <Route
                    path="/my-history"
                    element={
                        <PatientProtectedRoute>
                            <PatientDashboard />
                        </PatientProtectedRoute>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/not-authorized" element={<NotAuthorized />} />
            </Route>
        </Routes>
    );
};

export default Router;
