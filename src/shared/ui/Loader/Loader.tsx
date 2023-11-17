import { classNames } from "shared/lib/classNames/classNames";
import "./Loader.scss";
import { memo } from "react";

interface LoaderProps {
    className?: string;
}

const Loader = memo(({ className }: LoaderProps) => {
    return (
        <div className={classNames("lds-ellipsis", {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
});

export default Loader;
