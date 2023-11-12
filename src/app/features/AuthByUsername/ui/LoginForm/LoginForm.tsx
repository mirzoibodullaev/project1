import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./LoginForm.module.scss";
import { useState } from "react";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const [value, setValue] = useState("");
    const onChangeValue = (val: string) => {
        setValue(val);
    };
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                autoFocus
                placeholder="Введите текст"
                onChange={onChangeValue}
                type="text"
                className={cls.input}
            />
            <Input
                placeholder="Введите пароль"
                onChange={onChangeValue}
                type="text"
                className={cls.input}
            />
            <Button theme={ThemeButton.CLEAR} className={cls.loginBtn}>{t("Войти")}</Button>
        </div>
    );
};
