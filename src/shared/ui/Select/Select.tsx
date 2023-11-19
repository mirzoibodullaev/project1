import { ChangeEvent, memo, useMemo } from "react";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo(
    ({ className, label, options, value, onChange, readonly }: SelectProps) => {
        const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
            if (onChange) {
                onChange(e.target.value);
            }
        };

        const optionList = useMemo(() => {
            return options?.map((option) => {
                <option
                    className={cls.option}
                    value={option.value}
                    key={option.value}
                >
                    {option.content}
                </option>;
            });
        }, [options]);

        const mods: Mods = {};
        return (
            <div className={classNames(cls.Wrapper, mods, [className])}>
                {label && <span className={cls.label}>{`${label}>`}</span>}
                <select
                    disabled={readonly}
                    className={cls.select}
                    value={value}
                    onChange={onChangeHandler}
                >
                    {optionList}
                </select>
            </div>
        );
    }
);
