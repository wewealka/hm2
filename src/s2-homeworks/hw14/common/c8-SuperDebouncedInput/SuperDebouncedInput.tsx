import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import SuperInputText from "../../../hw04/common/c1-SuperInputText/SuperInputText";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type SuperDebouncedInputPropsType = Omit<
  DefaultInputPropsType,
  "type"
> & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: ReactNode;
  spanClassName?: string;
} & {
  onDebouncedChange?: (value: string) => void;
};

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  ...restProps
}) => {
  const timerIdRef = useRef<number | undefined>(undefined);

  const onChangeTextCallback = (value: string) => {
    onChangeText?.(value);

    if (onDebouncedChange) {
      if (timerIdRef.current !== undefined) {
        clearTimeout(timerIdRef.current);
      }
      timerIdRef.current = window.setTimeout(() => {
        onDebouncedChange(value);
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current !== undefined) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return <SuperInputText onChangeText={onChangeTextCallback} {...restProps} />;
};

export default SuperDebouncedInput;
