// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type CodeChallengeLength =
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128

export type OAuth2State = { code?: string; state?: string }

export type OAuth2Code = { code: string; code_verifier: string }

import * as yup from "yup"
import { useEffect, useState } from "react"
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useSessionMetadata,
} from "codeforlife/hooks"
import type { TypedUseMutation } from "@reduxjs/toolkit/query/react"

function generateSecureRandomString(
  length: number,
  charSet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
) {
  // Create an array of 32-bit unsigned integers
  const randomValues = window.crypto.getRandomValues(new Uint8Array(length))

  // Map the random values to characters from our string
  let result = ""
  for (let i = 0; i < length; i++) {
    result += charSet.charAt(randomValues[i] % charSet.length)
  }

  return result
}

async function generateCodeChallenge(length: CodeChallengeLength) {
  const verifier = generateSecureRandomString(length)
  const data = new TextEncoder().encode(verifier)
  const digest = await window.crypto.subtle.digest("SHA-256", data)
  const value = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  return { verifier, challenge: { value, method: "S256" } }
}

export type UseOAuth2Options = {
  stateLength: number
  codeChallengeLength: CodeChallengeLength
}

// https://datatracker.ietf.org/doc/html/rfc7636#section-1
export async function useOAuth2<ResultType>(
  useLoginMutation: TypedUseMutation<ResultType, OAuth2Code, any>,
  onLogin: () => void,
  options?: Partial<UseOAuth2Options> = {},
) {
  const { stateLength = 32, codeChallengeLength = 128 } = options

  const [login, { isLoading, isError }] = useLoginMutation()
  const sessionMetadata = useSessionMetadata()
  const navigate = useNavigate()
  const searchParams =
    useSearchParams({ code: yup.string(), state: yup.string() }) || {}
  const location = useLocation<OAuth2State>()
  const [
    {
      code: { verifier: code_verifier, challenge: codeChallenge },
      state: originalState,
    },
  ] = useState({
    code: await generateCodeChallenge(codeChallengeLength),
    state: generateSecureRandomString(stateLength),
  })

  const { code, state } = location.state || {}

  useEffect(() => {
    if (sessionMetadata) onLogin()
    else if (searchParams.code && searchParams.state) {
      navigate<OAuth2State>(".", {
        replace: true,
        next: false,
        state: { code: searchParams.code, state: searchParams.state },
      })
    } else if (code && state === originalState && !isLoading && !isError) {
      login({ code, code_verifier })
        .unwrap()
        .then(onLogin)
        .catch(() => {
          navigate(".", {
            replace: true,
            state: {
              notifications: [
                {
                  props: {
                    error: true,
                    children: "Failed to login. Please try again.",
                  },
                },
              ],
            },
          })
        })
    }
  }, [
    sessionMetadata,
    navigate,
    // State
    searchParams.state,
    originalState,
    state,
    // Code
    searchParams.code,
    code,
    code_verifier,
    // Login
    login,
    isLoading,
    isError,
    onLogin,
  ])

  return { codeChallenge, state }
}
