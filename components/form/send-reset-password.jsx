/**
 * send-password-reset.jsx
 */

"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const SendPasswordReset = ({
  email,
  loading,
  otherLoading,
  setOtherLoading,
  setResponseObj,
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleChangePassword = async () => {
    setResponseObj({ message: "", ok: false });
    setOtherLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/send-reset-password-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
      const res = await response.json();
      if (res.ok) {
        setEmailSent(true);
        setOtherLoading(false);
        setResponseObj({ message: res.message, ok: res.ok });
      }
      setOtherLoading(false);
    } catch (error) {
      setOtherLoading(false);
      setResponseObj({ message: error.message, ok: false });
    }
  };

  useEffect(() => {
    let interval;
    if (emailSent && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setEmailSent(false);
      setCountdown(60);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown, emailSent]);

  return (
    <div className="w-full">
      <Button
        className="w-full"
        type="button"
        variant="link"
        onClick={handleChangePassword}
        disabled={(emailSent && countdown > 0) || loading || otherLoading}
      >
        <span className="flex items-center gap-2">
          {!emailSent ? (
            <div>Change Password</div>
          ) : (
            <div>Resend Reset Password Email in {countdown}s</div>
          )}
        </span>
      </Button>
    </div>
  );
};

export default SendPasswordReset;

// import React from "react";

// const SendPasswordReset = () => {
//   return <div>SendPasswordReset</div>;
// };

// export default SendPasswordReset;

// setOtherLoading(true);
// try {
//   const response = await sendPasswordResetEmail({
//     email: email,
//   });
//   if (response.ok) {
//     setEmailSent(true);
//     setResponseObj(
//       "Reset Password Email sent successfully. Check your inbox!"
//     );
//   } else {
//     setEmailSent(false);
//     setCountdown(60);
//     setResponseObj(
//       response.message || "Failed to send reset password email."
//     );
//   }
// } catch (error) {
//   setEmailSent(false);
//   setCountdown(60);
//   setResponseObj(
//     "Failed to send password reset email. Please try again later."
//   );
// } finally {
//   setCountdown(60);
//   setOtherLoading(false);
// }
