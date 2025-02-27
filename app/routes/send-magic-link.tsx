import type { ActionFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { getFormData } from "remix-params-helper"
import { z } from "zod"

import { sendMagicLink } from "~/services/auth.server"

const ActionSchema = z.object({
  email: z
    .string()
    .email("invalid-email")
    .transform((email) => email.toLowerCase()),
  redirectTo: z.string().optional(),
})

interface ActionData {
  error?: string
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405)
  }

  const form = await getFormData(request, ActionSchema)

  if (!form.success) {
    return json<ActionData>(
      {
        error: "invalid-email",
      },
      { status: 400 }
    )
  }

  const { error } = await sendMagicLink(form.data)

  if (error) {
    return json<ActionData>(
      {
        error: "unable-to-send-magic-link",
      },
      { status: 500 }
    )
  }

  return json({})
}
