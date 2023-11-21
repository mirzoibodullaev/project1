import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleImgBlockComponent.module.scss";
import { ArticleImgBlock } from "entities/Article/model/types/article";
import { Text, TextAlign } from "shared/ui/Text/Text";

interface ArticleImgBlockComponentProps {
    className?: string;
    block: ArticleImgBlock;
}

export const ArticleImgBlockComponent = memo(
    ({ className, block }: ArticleImgBlockComponentProps) => {
        return (
            <div
                className={classNames(cls.ArticleImgBlockComponent, {}, [
                    className,
                ])}
            >
                <img src={block.src} className={cls.img} alt={block.title} />
                {block.title && (
                    <Text text={block.title} align={TextAlign.CENTER} />
                )}
            </div>
        );
    }
);
