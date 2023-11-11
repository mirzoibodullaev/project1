import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal/Modal";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import cls from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                onClick={onToggleModal}
                theme={ThemeButton.CLEAR_INVERTED}
                className={cls.links}
            >
                {t("Войти")}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Facere, minus. Praesentium fugit magni earum nemo nobis eveniet
                perspiciatis modi sunt?
            </Modal>
        </div>
    );
};
