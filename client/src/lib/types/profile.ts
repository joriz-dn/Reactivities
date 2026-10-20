export type Profile = {
    id: string
    displayName: string
    bio?: string
    imageUrl?: string
}

export type Photo = {
    id: string,
    url: string
}

export type EditProfile = {
    displayName: string
    bio?: string
}