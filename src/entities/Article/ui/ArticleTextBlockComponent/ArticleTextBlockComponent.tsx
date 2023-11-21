import { memo } from "react";
import { ArticleTextBlock } from "entities/Article/model/types/article";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArtArticleTextBlockComponent.module.scss";
import { Text } from "shared/ui/Text/Text";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    ({ className, block }: ArticleTextBlockComponentProps) => {
        return (
            <div className={classNames(cls.ArticleTextBlock, {}, [className])}>
                {block.title && (
                    <Text title={block.title} className={cls.title} />
                )}
                {block.paragraphs.map((paragraph) => {
                    return (
                        <Text
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    );
                })}
            </div>
        );
    }
);
