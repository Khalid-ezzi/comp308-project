import { FaHome, FaProcedures, FaUserEdit, FaNotesMedical, FaClipboardList, FaExclamationTriangle, FaHistory, FaStethoscope } from 'react-icons/fa';

const routes = (iconSize:any) => {
  return [
    {
      path: "/",
      title: "Home",
      role: "all",
      icon: <FaStethoscope size={iconSize || null} />,
    },
    {
      path: "/patients",
      title: "Patients Dashboard",
      role: "nurse",
      icon: <FaProcedures size={iconSize || null} />,
    },
    {
      path: "/alerts",
      title: "Alerts",
      role: "nurse",
      icon: <FaExclamationTriangle size={iconSize || null} />,
    },
    {
      path: "/patients/add",
      title: "Add New Patient",
      role: "nurse",
      icon: <FaUserEdit size={iconSize || null} />,
    },
    {
      path: "/alert-form",
      title: "Emergency Alert",
      role: "patient",
      icon: <FaExclamationTriangle size={iconSize || null} />,
    },
    {
      path: "/daily-info",
      title: "Daily Info Entry",
      role: "patient",
      icon: <FaNotesMedical size={iconSize || null} />,
    },
    {
      path: "/symptom-checklist",
      title: "Symptoms & Conditions",
      role: "patient",
      icon: <FaClipboardList size={iconSize || null} />,
    },
    {
      path: "/my-history",
      title: "My History",
      role: "patient",
      icon: <FaHistory size={iconSize || null} />,
    },
  ];
};

export default routes;
