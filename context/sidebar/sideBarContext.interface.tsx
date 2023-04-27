import { Option } from "@/components/configSidebar/ConfigSidebar.interface";

export interface SidebarContextType {
  activeOption: Option;
  setActiveOption: (option: Option) => void;
  OPTIONS: Option[];
}