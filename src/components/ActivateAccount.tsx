import { useState } from "react";
import { resendEmail } from "../data/apiService";
import Button from "./buttons/Button";
import Typography from "./Typography";
interface ActivateAccountProps {
  email: string;
}
const ActivateAccount = ({ email }: ActivateAccountProps) => {
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const onResendButtonClick = async () => {
    try {
      const response = await resendEmail({ email: email });
      response?.message && setResendMessage(response.message);
    } catch (error) {
      console.error("Error: Could not resend email link.", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-white p-8 rounded-xl max-w-[800px] h-[400px] w-full shadow-2xl border-2 border-lightGray ">
      <Typography as="h2" variant="h2">
        Email confirmation required.
      </Typography>
      <Typography as="p" variant="h5">
        An email has been sent to {email || "your email"}.
      </Typography>
      <Typography as="p" variant="h5">
        Click "Confirm Email" in the email to activate you account.
      </Typography>
      <Button
        type="outlinedSecondary"
        onClick={onResendButtonClick}
        className="mt-4"
      >
        Resend email
      </Button>
      {resendMessage && (
        <Typography as="p" variant="h5">
          {resendMessage}
        </Typography>
      )}
    </div>
  );
};
export default ActivateAccount;
