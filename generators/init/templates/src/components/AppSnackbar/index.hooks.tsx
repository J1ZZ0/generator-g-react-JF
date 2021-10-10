import { useSelector } from "react-redux";
import {
  getFeedbackMessage,
  getFeedbackOpen,
  getFeedbackType,
} from "redux-store/slices/feedback/selectors";

export const useAppSnackbar = () => {
  const open = useSelector(getFeedbackOpen);
  const type = useSelector(getFeedbackType);
  const message = useSelector(getFeedbackMessage);

  return {
    open,
    type,
    message,
  };
};
