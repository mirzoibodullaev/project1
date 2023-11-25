import { classNames } from "shared/lib/classNames/classNames";
import { ArticleView } from "entities/Article/model/types/article";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import TiledIcon from "shared/assets/icons/tile.svg";
import ListIcon from "shared/assets/icons/list.svg";
import cls from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}
const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = ({
    className,
    view,
    onViewClick,
}: ArticleViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };
    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => {
                return (
                    <Button
                        onClick={onClick(viewType.view)}
                        theme={ThemeButton.CLEAR}
                    >
                        <Icon
                            Svg={viewType.icon}
                            className={classNames("", {
                                [cls.selected]: viewType.view !== view,
                            })}
                        />
                    </Button>
                );
            })}
        </div>
    );
};
