import { useState } from "react";
import PageContainer from "../components/PageContainer";
import NavTabs from "../components/NavTabs";
import Card from "../components/Card";
import Add from "./Add";
import List from "./List";

const DASHBOARD_TABS = [
  {
    id: "add",
    label: "Agregar Video",
    icon: "➕",
  },
  {
    id: "list",
    label: "Listar Videos",
    icon: "📋",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <PageContainer className="pt-4 sm:pt-6 pb-12">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-fuchsia-500 mb-1 sm:mb-2">
            ⚙️ Panel de Administración
          </h1>
          <p className="text-xs sm:text-base text-slate-400">
            Gestiona los videos del quiz
          </p>
        </div>

        {/* Tabs */}
        <Card gradient noPadding>
          <NavTabs
            tabs={DASHBOARD_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="p-4 sm:p-8">
            {activeTab === "add" && <Add />}
            {activeTab === "list" && <List />}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
