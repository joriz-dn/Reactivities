import type {Profile} from "./profile.ts";

type Activity = {
    id: string
    title: string
    date: Date
    description: string
    category: string
    isCancelled: boolean
    city: string
    venue: string
    latitude: number
    longitude: number
    attendees: Profile[]
    isGoing: boolean
    isHost: boolean
    hostId: string
    hostDisplayName: string
    hostImageUrl: string
}

type ChatComment = {
    id: string
    createAt: Date
    body: string
    userId: string
    displayName: string
    imageUrl?: string
}
