import { memo, useCallback, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import {
    ArticleList,
    ArticleView,
    ArticleViewSelector,
} from "entities/Article";
import cls from "./ArticlesPage.module.scss";
import DynamicModuleLoader, {
    ReducersList,
} from "shared/lib/DynamicModuleLoader/DynamicModuleLoader";
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from "../model/slices/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetArticlesList } from "../model/services/fetchArticlesList/fetchArticlesList";
import { useSelector } from "react-redux";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from "../model/selectors/articlesPageSelectors";
import { articleDetailsActions } from "entities/Article/model/slice/articleDetailsSlice";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(fetArticlesList());
        dispatch(articlesPageActions.initState());
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
