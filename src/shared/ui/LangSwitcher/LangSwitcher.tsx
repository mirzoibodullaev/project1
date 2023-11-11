import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Button, ThemeButton } from "../Button/Button";

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
    const { t } = useTranslation();
    const toggle = () => {
        i18next.changeLanguage(i18next.language === "ru" ? "en" : "ru");
    };

    return (
        <Button
            className={classNames(cls.LangSwitcher, {}, [className])}
            theme={ThemeButton.CLEAR_INVERTED}
            onClick={toggle}
        >
            {/* i18next-extract-disable-line */ t(short ? "Короткий язык" : "Язык")}
        </Button>
    );
};
