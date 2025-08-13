// TODO: rename this file to session.ts and move to codeforlife-sso-frontend.

import {
  type Class,
  type OtpBypassToken,
  type Student,
  type User,
} from "codeforlife/api"
import { type Arg } from "codeforlife/utils/api"
import { type SessionMetadata } from "codeforlife/hooks"
import { buildLoginEndpoint } from "codeforlife/api/endpoints"

import { type OAuth2CodeExchangeArg } from "../app/hooks"
import api from "."

const baseUrl = "session/"

export type LoginWithEmailResult = SessionMetadata
export type LoginWithEmailArg = Arg<User, "email" | "password">

export type LoginWithOtpResult = null
export type LoginWithOtpArg = { otp: string }

export type LoginWithOtpBypassTokenResult = SessionMetadata
export type LoginWithOtpBypassTokenArg = Arg<OtpBypassToken, "token">

export type LoginAsStudentResult = SessionMetadata
export type LoginAsStudentArg = Arg<User, "first_name" | "password"> & {
  class_id: Class["id"]
}

export type AutoLoginAsStudentResult = SessionMetadata
export type AutoLoginAsStudentArg = {
  student_id: Student["id"]
  auto_gen_password: string
}

export type LoginWithGoogleResult = SessionMetadata
export type LoginWithGoogleArg = OAuth2CodeExchangeArg

const sessionApi = api.injectEndpoints({
  endpoints: build => ({
    loginWithEmail: buildLoginEndpoint<LoginWithEmailResult, LoginWithEmailArg>(
      build,
      baseUrl + "login-with-email/",
    ),
    loginWithOtp: buildLoginEndpoint<LoginWithOtpResult, LoginWithOtpArg>(
      build,
      baseUrl + "login-with-otp/",
    ),
    loginWithOtpBypassToken: buildLoginEndpoint<
      LoginWithOtpBypassTokenResult,
      LoginWithOtpBypassTokenArg
    >(build, baseUrl + "login-with-otp-bypass-token/"),
    loginAsStudent: buildLoginEndpoint<LoginAsStudentResult, LoginAsStudentArg>(
      build,
      baseUrl + "login-as-student/",
    ),
    autoLoginAsStudent: buildLoginEndpoint<
      AutoLoginAsStudentResult,
      AutoLoginAsStudentArg
    >(build, baseUrl + "auto-login-as-student/"),
    loginWithGoogle: buildLoginEndpoint<
      LoginWithGoogleResult,
      LoginWithGoogleArg
    >(build, baseUrl + "login-with-google/"),
  }),
})

export default sessionApi
export const {
  useLoginWithEmailMutation,
  useLoginWithOtpMutation,
  useLoginWithOtpBypassTokenMutation,
  useLoginAsStudentMutation,
  useAutoLoginAsStudentMutation,
  useLoginWithGoogleMutation,
} = sessionApi
