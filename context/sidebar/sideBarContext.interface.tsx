import { Option } from "@/components/configSidebar/ConfigSidebar.interface";
import { Comment } from "@/types/Comments.interface";

export interface SidebarContextType {
  activeOption: Option;
  setActiveOption: (option: Option) => void;
  OPTIONS: Option[];
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}