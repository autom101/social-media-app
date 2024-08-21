import HomeIcon from "@mui/icons-material/Home";
import GradeIcon from "@mui/icons-material/Grade";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";

export const LINKS = [
  {
    name: "Home",
    to: "/",
    Icon: HomeIcon,
  },
  {
    name: "My Posts",
    to: "myposts",
    Icon: GradeIcon,
  },
  {
    name: "Saved",
    to: "saved",
    Icon: BookmarkIcon,
  },
  {
    name: "Settings",
    to: "settings",
    Icon: SettingsIcon,
  },
];
