import { useCallback } from "react";
import { Currency } from "../../model/types/currency";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.UZS, content: Currency.UZS },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = ({
    className,
    value,
    onChange,
    readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange]
    );

    return (
        <Select
            className={classNames("", {}, [className])}
            label={t("Укажите валюту")}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly= {readonly}
        />
    );
};
