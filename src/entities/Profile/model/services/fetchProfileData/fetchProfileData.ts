import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/profile";
import { ThunkConfig } from "app/providers/StoreProvider";

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>("profile/fetchProfileData", async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.get<Profile>(`/profile/${profileId}`);
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("error");
    }
});
