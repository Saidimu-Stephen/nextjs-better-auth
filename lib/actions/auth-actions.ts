"use server"
import { auth } from "../auth"
import { headers } from "next/headers"

export const signUp = async (email: string, password: string, name: string) => {
    const results = await auth.api.signUpEmail(
        {
            body: {
                email,
                password, 
                name,
                callbackURL: "/dashboard"
            },
            headers: await headers()
        }
    )
    return results
    
}


export const signIn = async (email: string, password: string) => {

    const results = await auth.api.signInEmail(
        {
            body: {
                email,
                password,
                callbackURL: "/dashboard"
            },
            headers: await headers()
        }
    )
    return results
}

export const signOut = async () => {
    const results = await auth.api.signOut({
        headers: await headers()
    })
    return results
 }

export const signInSocial = async (provider: "github" | "google") => {
    const {url}  = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: "/dashboard"
        
        }
    })
    if (url) {
        // In Next.js 13, you can use the `redirect` function from 'next/navigation' to perform a server-side redirect
        // However, since this is a server action, we can't directly use client-side navigation here.
        // Instead, we can return the URL to the client and let the client handle the redirection.
        return { url }
    } else {
        throw new Error(`Failed to initiate social sign-in with ${provider}`);
    }
}