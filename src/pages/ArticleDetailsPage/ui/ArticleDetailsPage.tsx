import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "entities/Article";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticleDetailsPage.module.scss";
import DynamicModuleLoader, {
    ReducersList,
} from "shared/lib/DynamicModuleLoader/DynamicModuleLoader";
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from "../model/slices/articleDetailsCommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from "../model/selectors/comments";
import { fetchArticleById } from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation("article-details");
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const commentsError = useSelector(getArticleCommentsError);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, []);

    if (!id) {
        return <div>{t("Статья не найдена")}</div>;
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ArticleDetails id={id} />
                <Text className={cls.commentsTitle} title={t("Комментарии")} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
