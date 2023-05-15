import { Option } from "@/components/configSidebar/ConfigSidebar.interface";
import { Comment } from "@/types/Comments.interface";
import { UserDB } from "@/types/User.interface";

export interface SidebarContextType {
  activeOption: Option;
  setActiveOption: (option: Option) => void;
  OPTIONS: Option[];
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  users: UserDB[];
  setUsers: (users: UserDB[]) => void;
}