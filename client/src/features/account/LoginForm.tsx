import {useAccount} from "../../lib/hooks/useAccount.ts";
import {loginSchema, type LoginSchema} from "../../lib/schemas/loginSchema.ts";
import {useForm} from "react-hook-form";
import {Box, Button, Paper, Typography} from "@mui/material";
import {LockOpen} from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useLocation, useNavigate} from "react-router";

function LoginForm() {
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });
    
    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            }
        });
    };
    
    return (
        <Paper 
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display:"flex",
                flexDirection:'column',
                p:3,
                gap: 3,
                maxWidth:'md',
                mx:'auto',
                borderRadius:2
            }}
        >
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: 3,
                color: 'primary.main',
            }} 
                 >
                <LockOpen fontSize='large'></LockOpen>
                <Typography variant='h4'>Sign in</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email'></TextInput>
            <TextInput label='Password' type='password' control={control} name='password'></TextInput>
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            > Login </Button>
            <Typography sx={{textAlign:'center'}}>
                Don't have an account?
                <Typography sx={{ml:1}} component={Link} to='/register'>
                    Sign Up.
                </Typography>
            </Typography>
        </Paper> 
    );
}

export default LoginForm;