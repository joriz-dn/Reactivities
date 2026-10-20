import agent from "../api/agent.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Photo, Profile} from "../types/profile.ts";
import {useMemo} from "react";

export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();
    
    //GET Profile
    const {data: profile, isLoading: loadingProfile} = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profile/${id}`)
            return response.data
        },
        enabled: !!id
    });
    
    // Load Photos
    const {data: photos, isLoading: photoLoading} = useQuery<Photo[]>({
        queryKey: ['photo', id],
        queryFn: async () => {
            const response = await agent.get(`/profile/${id}/photos`)
            return response.data
        },
        enabled: !!id,
    })
    
    // Upload Photo
    const uploadPhoto = useMutation({
        mutationFn: async (photo: Blob) => {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await agent.post(`/profile/${id}/photos/add`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photo', id],
            });
            queryClient.setQueryData(['user'], (data:User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });
            queryClient.setQueryData(['profile', id], (data:Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            })
        }
    })
    
    //Check if user is its own profile
    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])
    
    //Set main Photo
    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.post(`/profile/${id}/photos/${photo.id}/set-as-main`)
        },
        onSuccess: (_, photo: Photo) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if(!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url
                }
            });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if(!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url
                }
            });
        }
    })
    
    //Delete Photo
    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profile/${id}/photos/${photoId}/delete`);
        },
        onSuccess: (_, photoId: string) => {
            queryClient.setQueryData(['photo', id], (photos: Photo[]) => {
                return photos.filter(x => x.id !== photoId);
            })
        }
    })

    //Delete Photo
    const cleanUpGallery = useMutation({
        mutationFn: async () => {
            await agent.delete(`/profile/${id}/photos/clean-up`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['photo', id],
            });
        }
    })
    
    return {
        profile,
        loadingProfile,
        photos,
        photoLoading,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        cleanUpGallery
    }
}