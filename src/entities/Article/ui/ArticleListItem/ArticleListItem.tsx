import { useTranslation } from "react-i18next";
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from "entities/Article/model/types/article";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from "shared/assets/icons/eye-icon.svg";
import Card from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = ({
    className,
    article,
    view,
}: ArticleListItemProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onOpentArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    const types = <Text text={article.type.join(", ")} className={cls.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );
    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text
                            text={article.user.username}
                            className={cls.username}
                        />
                        <Text text={article.createdAt} className={cls.data} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    <img
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            className={cls.textBlock}
                            block={textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <Button
                            onClick={onOpentArticle}
                            theme={ThemeButton.OUTLINE}
                        >
                            {t("Читать далее...")}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
            <Card onClick={onOpentArticle} className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </div>
    );
};
