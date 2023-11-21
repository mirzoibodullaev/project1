import { ReactNode, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Tooltip.module.scss";

interface TooltipProps {
    className?: string;
    text: string;
    children: ReactNode;
}

export const Tooltip = ({ text, children, className }: TooltipProps) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const showTooltip = () => setTooltipVisible(true);
    const hideTooltip = () => setTooltipVisible(false);

    return (
        <div
            className={classNames(cls.tooltip_container, {}, [className])}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {isTooltipVisible && (
                <div className={classNames(cls.tooltip, {}, [className])}>
                    {text}
                </div>
            )}
        </div>
    );
};
