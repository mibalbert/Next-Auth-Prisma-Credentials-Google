/**
 * auth/[token]/reset-password/page.jsx
 */

const ResetPassword = async ({ params }) => {
  // const token = params?.token;

  // const response = await fetch(
  //   "http://localhost:3000/api/auth/check-reset-password-token",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token }),
  //   }
  // );

  return (
    <div className="w-full max-w-md mx-auto">
      <div>ResetPassword</div>
      <div>{params?.token}</div>
      {/* <div>{JSON.stringify(response, null, 2)}</div> */}
      <ResetPassword />
    </div>
  );
};

export default ResetPassword;
