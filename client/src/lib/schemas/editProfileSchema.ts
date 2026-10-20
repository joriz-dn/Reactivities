import z from "zod";
import {requiredString} from "../util/util.ts";

export const editProfileSchema = z.object({
    displayName: requiredString("Display name"),
    bio: z.any().optional()
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>