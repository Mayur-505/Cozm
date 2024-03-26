import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import FormError from "./FormError";
import { cn } from "@/lib/utils";

type InputWithLabelProps = InputProps & {
  label?: string;
  error?: string;
  className?: string;
  id?: number | string;
  name?: string;
  labelClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
  inputWithIcon?: React.ReactNode;
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      label,
      className,
      id,
      name,
      labelClassName,
      inputClassName,
      error,
      isRequired,
      inputWithIcon,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={cn("space-y-[10px] border-b-2 border-[#cecece]", className)}
      >
        {label && (
          <Label
            className={cn(
              "font-primary text-[17px] font-[500] leading-[18px] text-[muted]",
              labelClassName
            )}
            htmlFor={id}
          >
            {label} {isRequired && <span className="text-[#ab40bd]">*</span>}
          </Label>
        )}
        <div className={`flex items-center gap-3 pb-[10px]`}>
          <Input
            {...rest}
            id={id}
            name={name}
            ref={ref}
            className={cn(inputClassName)}
          />
          {inputWithIcon && inputWithIcon}
        </div>
        {error && <FormError message={error} />}
      </div>
    );
  }
);

export default InputWithLabel;
