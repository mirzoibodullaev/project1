import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import cls from "./PageError.module.scss";
import { memo } from "react";

interface PageErrorProps {
    className?: string;
}

const PageError = memo(({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t("Произошла непредвиденная ошибка")}</p>
            <Button onClick={reloadPage}>{t("Обновить Страницу")}</Button>
        </div>
    );
});

export default PageError;
