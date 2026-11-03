import agent from "../api/agent.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {EditProfile, Photo, Profile, ProfileActivity} from "../types/profile.ts";
import {useMemo} from "react";

export const useProfile = (id?: string, predicate?: string, filter?: string) => {
    const queryClient = useQueryClient();
    
    //GET Profile
    const {data: profile, isLoading: loadingProfile} = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profile/${id}`)
            return response.data
        },
        enabled: !!id && !predicate,
        staleTime: 5 * 60 * 1000,
    });
    
    // Load Photos
    const {data: photos, isLoading: photoLoading} = useQuery<Photo[]>({
        queryKey: ['photo', id],
        queryFn: async () => {
            const response = await agent.get(`/profile/${id}/photos`)
            return response.data
        },
        enabled: !!id && !predicate,
        staleTime: 5 * 60 * 1000,
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
    
    //Edit Profile
    const editProfile  = useMutation({
        mutationFn: async (editProfile: EditProfile) => {
            await agent.put(`/profile/${id}/edit`, editProfile);
        },
        onSuccess: async(_, editProfile: EditProfile) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if(!userData) return userData;
                return {
                    ...userData,
                    displayName: editProfile.displayName,
                    bio: editProfile.bio
                }
            });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if(!profile) return profile;
                return {
                    ...profile,
                    displayName: editProfile.displayName,
                    bio: editProfile.bio
                }
            });
        }
    });
    
    //Get Followings/Followers
    const {data: followings, isLoading: followingLoading}=
        useQuery<Profile[]>({
            queryKey: ['followings', id, predicate],
            queryFn: async () => {
                const response = await agent.get(
                    `/profile/${id}/follow/list?predicate=${predicate}`
                );
                return response.data;
            },
            enabled: !!id && !!predicate,
            staleTime: 5 * 60 * 1000,
        });
    
    //Follow or Unfollow
    const updateFollowing = useMutation({
        mutationFn: async (follower?: Profile) => {
            const profileId = follower?.id ?? id;
            await agent.post(`/profile/${profileId}/follow`)
        },
        onSuccess: async(_, follower?:Profile) => {
            const user = await queryClient.getQueryData(['user']) as User;
            const isCurrentUser= user?.id === profile?.id;
            if (!isCurrentUser) {
                queryClient.setQueryData(['profile', id], (profile: Profile) => {
                    if(!profile || !profile.followersCount === undefined) return profile;
                    return {
                        ...profile,
                        following: !profile.following,
                        followersCount: profile.following ? profile.followersCount??0 - 1 : profile.followersCount??1
                    }
                });
            } else {
                queryClient.setQueryData(['profile', id], (profile: Profile) => {
                    if(!profile || !profile.followersCount === undefined) return profile;
                    return {
                        ...profile,
                        followingsCount: !follower?.following ? profile.followingsCount??1 : profile.followingsCount??0 - 1,
                    }
                });
            }
            await queryClient.invalidateQueries({
                queryKey: ['followings', id, 'followers'],
            });
            await queryClient.invalidateQueries({
                queryKey: ['followings', id, 'followings'],
            });
        }
    });

    //Get Profile Activities
    const {data: profileActivities, isLoading: profileActivitiesLoading }=
        useQuery<ProfileActivity[]>({
            queryKey: ['profileActivity', id, filter],
            queryFn: async () => {
                const response = await agent.get(
                    `/profile/${id}/activities?filter=${filter}`
                );
                return response.data;
            },
            enabled: !!id && !!filter,
            staleTime: 5 * 60 * 1000,
        });
    
    return {
        profile,
        loadingProfile,
        photos,
        photoLoading,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        cleanUpGallery,
        editProfile,
        followings,
        followingLoading,
        updateFollowing,
        profileActivities,
        profileActivitiesLoading
    }
}