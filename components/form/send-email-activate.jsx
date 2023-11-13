/**
 * send-email-activate.jsx
 */

"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const COUNTDOWN = 6;

const SendEmailActivate = ({
  email,
  loading,
  className,
  otherLoading,
  setOtherLoading,
  setResponseObj,
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN);

  const handleResendVerificationLink = async () => {
    // setResponseObj({ message: "", ok: false });
    setOtherLoading(true);
    try {
      const response = await fetch("/api/auth/send-activate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const res = await response.json();
      if (res.ok) {
        setEmailSent(true);
        setOtherLoading(false);
        setResponseObj({ message: res.message, ok: res.ok });
      }
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
      setCountdown(COUNTDOWN);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown, emailSent]);

  return (
    <div className={cn("w-full", className)}>
      <Button
        type="submit"
        className="w-full"
        variant="link"
        onClick={handleResendVerificationLink}
        disabled={(emailSent && countdown > 0) || loading || otherLoading}
      >
        <span className="flex items-center gap-2">
          {!emailSent ? (
            <div>Resend Verification Link</div>
          ) : (
            <div>Resend Verification Link in {countdown}s</div>
          )}
        </span>
      </Button>
    </div>
  );
};

export default SendEmailActivate;

// /**
//  * send-email-activate.jsx
//  */

// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { resendVerificationLinkServer } from "@/app/actions/actions";
// // import { resendVerificationLinkServer } from "@/app/actions/actions";

// const SendEmailActivate = ({
//   email,
//   loading,
//   setOtherLoading,
//   setResponseObj,
// }) => {
//   const [emailSent, setEmailSent] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleResendVerificationLink = async () => {
//     setOtherLoading(true);
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/auth/send-activate-email",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );
//       const res = await response.json();
//       if (res.ok) {
//         setEmailSent(true);
//         setResponseObj(
//           "Verification Email sent successfully. Check your inbox!"
//         );
//       } else {
//         setEmailSent(false);
//         setCountdown(60);
//         setResponseMessage(
//           res.message || "Failed to resend verification email."
//         );
//       }
//     } catch (error) {
//       setEmailSent(false);
//       setCountdown(60);
//       setResponseMessage(
//         "Failed to resend verification email. Please try again later."
//       );
//     } finally {
//       setCountdown(60);
//       setOtherLoading(false);
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (emailSent && countdown > 0) {
//       interval = setInterval(() => {
//         setCountdown(countdown - 1);
//       }, 1000);
//     } else {
//       setEmailSent(false);
//       setCountdown(60);
//     }
//     return () => {
//       clearInterval(interval);
//     };
//   }, [countdown, emailSent]);
//   return (
//     <div className="w-full">
//       <Button
//         type="submit"
//         className="w-full"
//         variant="link"
//         onClick={handleResendVerificationLink}
//         disabled={(emailSent && countdown > 0) || loading}
//       >
//         <span className="flex items-center gap-2">
//           Resend Verification Link
//           {emailSent && <div>in {countdown}s</div>}
//         </span>
//       </Button>
//     </div>
//   );
// };

// export default SendEmailActivate;
