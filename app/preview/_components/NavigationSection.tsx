import { LuClipboardList, LuPackage, LuTag, LuUsers } from "react-icons/lu";
import AccordionHeader from "../../components/AccordionHeader";
import FilterTab from "../../components/FilterTab";
import Sidebar from "../../components/Sidebar";
import SidebarNavItem from "../../components/SidebarNavItem";
import Tab from "../../components/Tab";
import PaginationDemo from "./PaginationDemo";
import PreviewSection from "./PreviewSection";
import PreviewVariant from "./PreviewVariant";

const SIDEBAR_ITEMS = [
  { href: "/preview", label: "Pedidos", icon: LuClipboardList },
  { href: "/preview#produtos", label: "Produtos", icon: LuPackage },
  { href: "/preview#configuracoes", label: "Configurações", icon: LuTag },
  { href: "/preview#garcons", label: "Garçons", icon: LuUsers },
];

export default function NavigationSection() {
  return (
    <>
      <PreviewSection title="SidebarNavItem">
        <PreviewVariant label="default" className="w-full max-w-48">
          <SidebarNavItem href="/preview" icon={LuPackage} />
        </PreviewVariant>
        <PreviewVariant label="hover (passe o mouse)" className="w-full max-w-48">
          <SidebarNavItem href="/preview" icon={LuPackage} />
        </PreviewVariant>
        <PreviewVariant label="active" className="w-full max-w-48">
          <SidebarNavItem href="/preview" icon={LuPackage} active />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="Sidebar">
        <PreviewVariant label="plano gratuito" className="w-full max-w-60">
          <Sidebar
            userName="Odair Michael"
            items={SIDEBAR_ITEMS}
            activeHref="/preview"
            plan={{ remaining: 17, total: 30 }}
          />
        </PreviewVariant>
        <PreviewVariant label="sem indicadores" className="w-full max-w-60">
          <Sidebar
            userName="Odair Michael"
            items={SIDEBAR_ITEMS}
            activeHref="/preview"
          />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="FilterTab">
        <PreviewVariant label="default">
          <FilterTab />
        </PreviewVariant>
        <PreviewVariant label="active">
          <FilterTab active />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="Tab">
        <PreviewVariant label="active">
          <Tab active />
        </PreviewVariant>
        <PreviewVariant label="default">
          <Tab />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="AccordionHeader">
        <PreviewVariant label="expandido (clique para recolher)" className="w-full max-w-sm">
          <AccordionHeader title="Bebidas" itemCount={3} />
        </PreviewVariant>
        <PreviewVariant label="recolhido (clique para expandir)" className="w-full max-w-sm">
          <AccordionHeader title="Bebidas" itemCount={3} defaultExpanded={false} />
        </PreviewVariant>
      </PreviewSection>

      <PreviewSection title="Pagination">
        <PaginationDemo />
      </PreviewSection>
    </>
  );
}
