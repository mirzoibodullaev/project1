import { Article, ArticleView } from "entities/Article/model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => {
            return (
                <ArticleListItemSkeleton
                    className={cls.card}
                    key={index}
                    view={view}
                />
            );
        });
};

export const ArticleList = ({
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
}: ArticleListProps) => {
    if (isLoading) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                {getSkeletons(view)}
            </div>
        );
    }
    const renderArticles = (article: Article) => {
        return (
            <ArticleListItem
                className={cls.card}
                article={article}
                view={view}
                key={article.id}
            />
        );
    };
    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
            {articles.length > 0 ? articles.map(renderArticles) : null}
        </div>
    );
};
