import { memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "entities/Article";
import { useTranslation } from "react-i18next";

const ArticleDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation("article-details");

    if (!id) {
        return <div>{t("Статья не найдена")}</div>;
    }
    return (
        <div>
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArticleDetailsPage);
