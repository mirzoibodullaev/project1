import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

export const fetArticlesList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>("articlesPage/fetArticlesList", async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Article[]>("/articles", {
            params: {
                _expand: "user",
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }
});
