import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { SidebarItemType } from "../types/sidebar";
import AboutIcon from "shared/assets/icons/about.svg";
import MainIcon from "shared/assets/icons/main.svg";
import ProfileIcon from "shared/assets/icons/profile-icon.svg";
import ArticleIcon from "shared/assets/icons/article-icon.svg";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const SidebarItemList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            Icon: MainIcon,
            text: "Главная",
        },
        {
            path: RoutePath.about,
            Icon: AboutIcon,
            text: "О сайте",
        },
    ];
    if (userData) {
        SidebarItemList.push(
            {
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                text: "Профиль",
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                Icon: ArticleIcon,
                text: "Статьи",
                authOnly: true,
            }
        );
    }
    return SidebarItemList;
});
