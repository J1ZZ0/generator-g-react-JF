import React, { memo } from "react";
import { Button, ButtonProps, CircularProgress } from "@material-ui/core";
import { useAppButton } from "./index.hooks";

type AppButtonProps = {
  loading?: boolean;
  path?: string;
} & ButtonProps;

export const AppButton = memo(({
  loading = false,
  path,
  onClick,
  ...props
}: AppButtonProps) => {
  const { classes, onButtonClicked, styles } = useAppButton(
    path,
    onClick,
  );

  if (loading) {
    return (
      <Button {...props} onClick={onButtonClicked}>
        <CircularProgress size={16} />
      </Button>
    );
  }

  return (
    <Button {...props} onClick={onButtonClicked} />
  );
});
