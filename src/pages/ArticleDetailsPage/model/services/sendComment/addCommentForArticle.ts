import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAddCommentFormText } from "app/features/addCommentForm/model/selectors/addCommentFormSelectors";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails";
import { Comment } from "entities/Comment";
import { getUserAuthData } from "entities/User";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    "articleDetails/addCommentForArticle",
    async (text, { rejectWithValue, dispatch, extra, getState }) => {
        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue("no data");
        }
        try {
            const response = await extra.api.post<Comment>("/comments", {
                articleId: article.id,
                userId: userData.id,
                text,
            });
            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (e) {
            console.log(e);

            return rejectWithValue("error");
        }
    }
);
