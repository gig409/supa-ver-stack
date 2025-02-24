import { rest } from "msw"
import { USER_EMAIL, USER_ID, USER_PASSWORD } from "./user"

export const authSession = {
  refresh_token: "valid",
  access_token: "valid",
  user: {
    id: USER_ID,
    email: USER_EMAIL,
  },
}

export const authAccount = {
  id: USER_ID,
  email: USER_EMAIL,
}

export const SUPABASE_URL = "https://supabase-project.supabase.co"
export const SUPABASE_AUTH_TOKEN_API = "/auth/v1/token"
export const SUPABASE_AUTH_USER_API = "/auth/v1/user"
export const SUPABASE_AUTH_ADMIN_USER_API = "/auth/v1/admin/users"

export const handlers = [
  rest.post(
    `${SUPABASE_URL}${SUPABASE_AUTH_TOKEN_API}`,
    async (req, res, ctx) => {
      const { email, password, refresh_token } = JSON.parse(req.body as string)

      if (refresh_token) {
        if (refresh_token !== "valid")
          return res(ctx.status(401), ctx.json({ error: "Token expired" }))
        return res(ctx.status(200), ctx.json(authSession))
      }

      if (!email || !password || password !== USER_PASSWORD)
        return res(
          ctx.status(401),
          ctx.json({ message: "Wrong email or password" })
        )
      return res(ctx.status(200), ctx.json(authSession))
    }
  ),
  rest.get(
    `${SUPABASE_URL}${SUPABASE_AUTH_USER_API}`,
    async (req, res, ctx) => {
      const token = req.headers.get("authorization")?.split("Bearer ")?.[1]

      if (token !== "valid")
        return res(ctx.status(401), ctx.json({ error: "Token expired" }))
      return res(ctx.status(200), ctx.json({ id: USER_ID }))
    }
  ),
  rest.post(
    `${SUPABASE_URL}${SUPABASE_AUTH_ADMIN_USER_API}`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(authAccount))
    }
  ),
  rest.delete(
    `${SUPABASE_URL}${SUPABASE_AUTH_ADMIN_USER_API}/*`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    }
  ),
]
