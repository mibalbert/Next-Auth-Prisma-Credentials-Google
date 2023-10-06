/**
 * actions.js
 */

'use server'

import { revalidatePath } from "next/cache"

export async function createTodo(prevState, formData) {
  try {

    const email = formData.get('email')
    const password = formData.get('password')
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')

    let response = await fetch('http://localhost:3000/api/auth/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName
      })
    })

    response = await response.json()
    console.log("response")

    // if (response.ok) {
    //   const responseData = await response.json();
    //   console.log(responseData);
    //   // Handle the JSON response data here
    //   return revalidatePath('/');
    // } else {
    //   // Handle non-JSON response (plain text) or server errors
    //   const errorText = await response.text();
    //   console.error('Server Error:', response.status, errorText);
    //   return { message: 'Failed to create' };
    // }
  } catch (e) {
    return { message: 'Failed to create' }
  }
}