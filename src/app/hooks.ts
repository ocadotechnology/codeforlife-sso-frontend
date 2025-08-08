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

export type CodeChallengeMethod = "S256"
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
export type CodeChallenge = {
  verifier: string
  challenge: string
  method: CodeChallengeMethod
}

export type OAuth2 =
  | {
      state: string
      codeChallenge: Pick<CodeChallenge, "challenge" | "method">
    }
  | undefined
export type OAuth2State = { code?: string; state?: string }
export type OAuth2Code = { code: string; code_verifier: string }

import * as yup from "yup"
import {
  type SessionMetadata,
  useLocation,
  useNavigate,
  useSearchParams,
  useSessionMetadata,
} from "codeforlife/hooks"
import { useEffect, useState } from "react"
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

async function generateCodeChallenge(
  length: CodeChallengeLength,
): Promise<CodeChallenge> {
  const verifier = generateSecureRandomString(length)
  const data = new TextEncoder().encode(verifier)
  const digest = await window.crypto.subtle.digest("SHA-256", data)

  return {
    verifier,
    challenge: btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""),
    method: "S256",
  }
}

export type UseOAuth2KwArgs<ResultType> = {
  provider: string
  useLoginMutation: TypedUseMutation<ResultType, OAuth2Code, any>
  onCreateSession: (result: ResultType) => void
  onRetrieveSession: (metadata: SessionMetadata) => void
}

function makeOAuth2StorageKey(provider: string, key: string) {
  return `oauth2.${provider}.${key}`
}

export function useOAuth2State(
  provider: string,
  length: number = 32,
  storageKey: string = "state",
): [string | undefined, () => void] {
  const oAuth2StorageKey = makeOAuth2StorageKey(provider, storageKey)
  const storageValue = sessionStorage.getItem(oAuth2StorageKey)

  const [_state, _setState] = useState<string>()

  useEffect(() => {
    let state: string
    if (storageValue && storageValue.length === length) {
      state = storageValue
    } else {
      state = generateSecureRandomString(length)
      sessionStorage.setItem(oAuth2StorageKey, state)
    }

    _setState(state)
  }, [oAuth2StorageKey, storageValue, length])

  function resetState() {
    sessionStorage.removeItem(oAuth2StorageKey)
    _setState(undefined)
  }

  return [_state, resetState]
}

export function useOAuth2CodeChallenge(
  provider: string,
  length: CodeChallengeLength = 128,
  storageKey: string = "codeChallenge",
): [CodeChallenge | undefined, () => void] {
  const oAuth2StorageKey = makeOAuth2StorageKey(provider, storageKey)
  const storageValue = sessionStorage.getItem(oAuth2StorageKey)

  const [_codeChallenge, _setCodeChallenge] = useState<CodeChallenge>()

  useEffect(() => {
    let codeChallenge: CodeChallenge | undefined
    if (storageValue) {
      const storageJsonValue: unknown = JSON.parse(storageValue)
      if (
        typeof storageJsonValue === "object" &&
        storageJsonValue &&
        "verifier" in storageJsonValue &&
        typeof storageJsonValue.verifier == "string" &&
        storageJsonValue.verifier.length === length &&
        "challenge" in storageJsonValue &&
        typeof storageJsonValue.challenge === "string" &&
        "method" in storageJsonValue &&
        storageJsonValue.method === "S256"
      ) {
        codeChallenge = {
          verifier: storageJsonValue.verifier,
          challenge: storageJsonValue.challenge,
          method: storageJsonValue.method,
        }
      }
    }

    if (codeChallenge) _setCodeChallenge(codeChallenge)
    else {
      generateCodeChallenge(length)
        .then(codeChallenge => {
          sessionStorage.setItem(
            oAuth2StorageKey,
            JSON.stringify(codeChallenge),
          )

          _setCodeChallenge(codeChallenge)
        })
        .catch(error => {
          if (error) console.error(error)
        })
    }
  }, [oAuth2StorageKey, storageValue, length])

  function resetCodeChallenge() {
    sessionStorage.removeItem(oAuth2StorageKey)
    _setCodeChallenge(undefined)
  }

  return [_codeChallenge, resetCodeChallenge]
}

// https://datatracker.ietf.org/doc/html/rfc7636#section-1
export function useOAuth2<ResultType>({
  provider,
  useLoginMutation,
  onCreateSession,
  onRetrieveSession,
}: UseOAuth2KwArgs<ResultType>): OAuth2 {
  const [state, resetState] = useOAuth2State(provider)
  const [
    {
      verifier: codeVerifier,
      challenge: codeChallenge,
      method: codeChallengeMethod,
    } = {},
    resetCodeChallenge,
  ] = useOAuth2CodeChallenge(provider)
  const [login, { isLoading, isError }] = useLoginMutation()
  const sessionMetadata = useSessionMetadata()
  const navigate = useNavigate()
  const searchParams =
    useSearchParams({ code: yup.string(), state: yup.string() }) || {}
  const location = useLocation<OAuth2State>()

  const locationState = location.state || {}

  useEffect(() => {
    if (sessionMetadata) onRetrieveSession(sessionMetadata)
    else if (searchParams.code && searchParams.state) {
      navigate<OAuth2State>(".", {
        replace: true,
        next: false,
        state: { code: searchParams.code, state: searchParams.state },
      })
    } else {
      if (
        state &&
        codeVerifier &&
        locationState.code &&
        locationState.state === state &&
        !isLoading &&
        !isError
      ) {
        login({ code: locationState.code, code_verifier: codeVerifier })
          .unwrap()
          .then(onCreateSession)
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
    }
  }, [
    sessionMetadata,
    navigate,
    // State
    state,
    searchParams.state,
    locationState.state,
    // Code
    codeVerifier,
    searchParams.code,
    locationState.code,
    // Login
    login,
    isLoading,
    isError,
    onCreateSession,
    onRetrieveSession,
  ])

  return state && codeChallenge && codeChallengeMethod
    ? {
        state,
        codeChallenge: {
          challenge: codeChallenge,
          method: codeChallengeMethod,
        },
      }
    : undefined
}
