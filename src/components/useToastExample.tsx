import {
  useDarkToast,
  useErrorToast,
  useInfoToast,
  useSuccessToast,
  useToast,
  useWarningToast,
} from "./Toast";

const ToastUseExample = () => {
  const { showToast } = useToast();
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const { showWarningToast } = useWarningToast();
  const { showInfoToast } = useInfoToast();
  const { showDarkToast } = useDarkToast();

  const handleClick = () => {
    showToast({
      text: "This is a toast message without the close button",
      type: "success",
      closeButton: false,
    });
    showSuccessToast("This is a success toast message");
    showErrorToast("This is an error toast message");
    showWarningToast("This is a warning toast message");
    showInfoToast("This is an info toast message");
    showDarkToast("This is a dark toast message");
  };
  return (
    <section className="flex flex-col gap-3">
      <h2>Toasts</h2>
      <button type="button" onClick={handleClick}>
        Show Toast
      </button>
    </section>
  );
};
export default ToastUseExample;
