import { spotifyRoutes } from "@/apps/spotify/routes";
import { homeworkRoutes } from "@/apps/homework/routes";
import { noticeRoutes } from "@/apps/notice/routes";

export const appRoutes = [
  ...spotifyRoutes,
  ...homeworkRoutes,
  ...noticeRoutes,
];
