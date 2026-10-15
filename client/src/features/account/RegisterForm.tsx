import {useAccount} from "../../lib/hooks/useAccount.ts";
import {useForm} from "react-hook-form";
import {Box, Button, Paper, Typography} from "@mui/material";
import {
    HowToRegRounded
} from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router";
import {registerSchema, type RegisterSchema} from "../../lib/schemas/registerSchema.ts";

function RegisterForm() {
    const {registerUser} = useAccount();
    const {control, handleSubmit, setError, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (errors) => {
                if (Array.isArray(errors)) {
                    errors.forEach(error => {
                        if (error.includes("Email")) setError('email', {message: error});
                        else if (error.includes("Password")) setError('password', {message: error});
                    })
                }
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
                <HowToRegRounded fontSize='large'></HowToRegRounded>
                <Typography variant='h4'>Register</Typography>
            </Box>
            <TextInput label='Name' control={control} name='displayName'></TextInput>
            <TextInput label='Email' control={control} name='email'></TextInput>
            <TextInput label='Password' type='password' control={control} name='password'></TextInput>
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            > Register </Button>
            <Typography sx={{textAlign:'center'}}>
                Already have an account?
                <Typography sx={{ml:1}} component={Link} to='/login'>
                    Sign In.
                </Typography>
            </Typography>
        </Paper>
    );
}

export default RegisterForm;