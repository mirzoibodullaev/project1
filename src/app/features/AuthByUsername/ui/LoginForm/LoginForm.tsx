import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassowrd } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsloading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import cls from "./LoginForm.module.scss";
import DynamicModuleLoader, {
    ReducersList,
} from "shared/lib/DynamicModuleLoader/DynamicModuleLoader";

export interface LoginFormProps {
    className?: string;
}

const initReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassowrd);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <DynamicModuleLoader reducers={initReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t("Форма авторизации")} />
                {error && (
                    <Text
                        text={t("Вы ввели неверный логин или пароль")}
                        theme={TextTheme.ERROR}
                    />
                )}

                <Input
                    autoFocus
                    placeholder={t("Введите логин")}
                    type="text"
                    className={cls.input}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    placeholder={t("Введите пароль")}
                    type="text"
                    className={cls.input}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ThemeButton.CLEAR}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t("Войти")}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
