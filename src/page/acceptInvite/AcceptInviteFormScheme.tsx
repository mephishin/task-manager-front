import { z } from "zod";

export const acceptInviteFormValidationScheme = z.object({
    inviteKey: z.uuid(),
});

export type AcceptInviteFormScheme = z.infer<typeof  acceptInviteFormValidationScheme>;