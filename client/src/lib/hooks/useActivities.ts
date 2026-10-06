import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import agent from "../api/agent.ts";

export const useActivities = () => {
    const queryClient = useQueryClient();
    
    // GET ALL
    const {data: activities, isPending} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    });
    
    // UPDATE
    const updateActivity = useMutation({
        mutationFn: async (activity : Activity) => {
            await agent.put(`/activities/${activity.id}`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities'],
            })
        }
    });
    
    //CREATE
    const createActivity = useMutation({
        mutationFn: async (activity : Activity) => {
            await agent.post(`/activities`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities'],
            })
        }
    });
    
    //DELETE
    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities'],
            })
        }
    });
    
    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity
    }
}