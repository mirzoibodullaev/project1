import { useSelector } from "react-redux";
import { getProfileData } from "../model/selectors/getProfileData/getProfileData";
import { getProfileError } from "../model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import cls from "./ProfileCard.module.scss";

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation();
    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t("Профиль")} />
                <Button theme={ThemeButton.BACKGROUND} className={cls.editBtn}>
                    {t("Редактировать")}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.firstName}
                    placeholder="Ваше имя"
                    className={cls.input}
                />
                <Input
                    value={data?.lastName}
                    placeholder="Ваша фамилия"
                    className={cls.input}
                />
            </div>
        </div>
    );
};
