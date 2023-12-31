import { Suspense, memo } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { classNames } from "shared/lib/classNames/classNames";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import Loader from "shared/ui/Loader/Loader";
import cls from "./LoginModal.module.scss";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}
export const LoginModal = memo(
    ({ className, isOpen, onClose }: LoginModalProps) => {
        return (
            <Modal
                className={classNames(cls.LoginModal, {}, [className])}
                isOpen={isOpen}
                onClose={onClose}
                lazy
            >
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync onSucces={onClose} />
                </Suspense>
            </Modal>
        );
    }
);
