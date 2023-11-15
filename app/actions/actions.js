/**
 * actions.js
 */

"use server";

export async function loginUser(prevState, formData) {
  try {
    return { message: "WING" };
  } catch (error) {
    console.log(error);
    return { message: error };
  }
}

export async function registerNewUser(formData) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { message: "Something went wrong on the server" };
  }
}
