import { classNames } from "shared/lib/classNames/classNames";
import { useCallback } from "react";
import { Button, ThemeButton } from "../Button/Button";
import CopyIcon from "shared/assets/icons/copy-icon.svg";
import cls from "./Code.module.scss";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = ({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);
    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                onClick={onCopy}
                className={cls.copyBtn}
                theme={ThemeButton.CLEAR}
            >
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
};
