import { Country } from "entities/Country/model/types/country";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Uzbekistan, content: Country.Uzbekistan },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Russia, content: Country.Russia },
];

export const CountrySelect = ({
    className,
    value,
    onChange,
    readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange]
    );

    return (
        <Select
            className={classNames("", {}, [className])}
            label={t("Укажите страну")}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
};
