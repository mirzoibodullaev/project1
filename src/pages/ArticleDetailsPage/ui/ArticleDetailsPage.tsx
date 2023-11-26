import { memo, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleDetails } from "entities/Article";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { classNames } from "shared/lib/classNames/classNames";
import DynamicModuleLoader, {
    ReducersList,
} from "shared/lib/DynamicModuleLoader/DynamicModuleLoader";
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from "../model/slices/articleDetailsCommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../model/selectors/comments";
import { fetchCommentsByArticleId } from "../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddCommentForm } from "app/features/addCommentForm";
import { addCommentForArticle } from "../model/services/sendComment/addCommentForArticle";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "shared/ui/Page/Page";
import cls from "./ArticleDetailsPage.module.scss";

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
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, []);

    if (!id) {
        return <Page>{t("Статья не найдена")}</Page>;
    }
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <Button onClick={onBackToList} theme={ThemeButton.OUTLINE}>
                    {t("Назад к списку")}
                </Button>
                <ArticleDetails id={id} />
                <Text className={cls.commentsTitle} title={t("Комментарии")} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
