import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { classNames } from "shared/lib/classNames/classNames";
import { useSelector } from "react-redux";
import { getProfileReadonly, profileActions, updateProfileData } from "entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import cls from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation();
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCalcelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t("Профиль")} />
            {readonly ? (
                <Button
                    theme={ThemeButton.OUTLINE}
                    className={cls.editBtn}
                    onClick={onEdit}
                >
                    {t("Редактировать")}
                </Button>
            ) : (
                <>
                    <Button
                        theme={ThemeButton.OUTLINE_RED}
                        className={cls.editBtn}
                        onClick={onCalcelEdit}
                    >
                        {t("Отменить")}
                    </Button>
                    <Button
                        theme={ThemeButton.OUTLINE}
                        className={cls.saveBtn}
                        onClick={onSave}
                    >
                        {t("Сохранить")}
                    </Button>
                </>
            )}
        </div>
    );
};