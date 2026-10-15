import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {LoginSchema} from "../schemas/loginSchema.ts";
import agent from "../api/agent.ts";
import {useNavigate} from "react-router";
import type {RegisterSchema} from "../schemas/registerSchema.ts";
import {toast} from "react-toastify";

export const useAccount = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    //Login
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        } 
    });
    
    //Logout
    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            await navigate(`/`);
        }
    });
    
    //Get Current User
    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(["user"])
    })
    
    //Register User
    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        },
        onSuccess: async () => {
            toast.success('User registered successfully.');
            navigate('/login');
        }
    })
    
    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    };
}