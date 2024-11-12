import { useState } from "react";
import { resendEmail } from "../data/apiService";
import Button from "./Buttons/Button";
import Typography from "./Typography";
interface ActivateAccountProps {
  email: string;
}
const ActivateAccount = ({ email }: ActivateAccountProps) => {
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const onResendButtonClick = async () => {
    try {
      const response = await resendEmail({ email: email });
      //console.log(response);
      response?.message && setResendMessage(response.message);
    } catch (error) {
      console.error("Error: Could not resend email link.", error);
    }
  };
  return (
    <section className="flex flex-col items-center gap-2">
      <Typography as="h2" variant="h2">
        Email confirmation required.
      </Typography>
      <Typography as="p" variant="h5">
        An email has been sent to {email || "your email"}.
      </Typography>
      <Typography as="p" variant="h5">
        Click "Confirm Email" in the email to activate you account.
      </Typography>
      <Button type="outlinedSecondary" onClick={onResendButtonClick}>
        Resend email
      </Button>
      {resendMessage && (
        <Typography as="p" variant="h5">
          {resendMessage}
        </Typography>
      )}
    </section>
  );
};
export default ActivateAccount;
