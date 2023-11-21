import { classNames } from "shared/lib/classNames/classNames";
import { Comment } from "entities/Comment/model/types/comment";
import { Text } from "shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { useTranslation } from "react-i18next";
import cls from "./CommentList.module.scss";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = ({
    className,
    comments,
    isLoading,
}: CommentListProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => {
                    return (
                        <CommentCard
                            isLoading={isLoading}
                            className={cls.comment}
                            comment={comment}
                        />
                    );
                })
            ) : (
                <Text text={t("Комментарии отсутсвуют")} />
            )}
        </div>
    );
};
