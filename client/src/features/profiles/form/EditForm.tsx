import {Box, Button} from "@mui/material";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProfileSchema, type EditProfileSchema} from "../../../lib/schemas/editProfileSchema.ts";
import {useParams} from "react-router";
import {useProfile} from "../../../lib/hooks/useProfile.ts";
import {useEffect} from "react";

type Props = {
    handleIsEditing: (value:boolean) => void;
}

function EditForm({handleIsEditing}: Props) {
    const {id} = useParams();
    const {profile, editProfile} = useProfile(id);
    const {control,reset, handleSubmit} = useForm<EditProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(editProfileSchema),
        defaultValues:{
            displayName: "",
            bio: ""
        }
    });

    useEffect(() => {
        if (profile) {
            reset({
                displayName: profile.displayName ?? "",
                bio: profile.bio ?? "",
            });
        }
    }, [profile, reset]);
    
    const onSubmit = async (data: EditProfileSchema) => {
        console.log("Form data", data);
        if (profile) {
            editProfile.mutate({...profile, ...data}, {
                onSuccess: () => {
                    handleIsEditing(false);
                }
            })
        }
    }
    
    return (
        <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{display: "flex", flexDirection: "column", gap: 3}}>
            <TextInput label="Name" control={control} name="displayName" />
            <TextInput label="Bio" control={control} name="bio" multiline rows={3} />
            <Box sx={{display: "flex", justifyContent: "end", gap: 3}}>
                <Button
                    color='primary'
                    variant='contained'
                    type="submit"
                    disabled={editProfile.isPending}
                >Submit</Button>
            </Box>
        </Box>
    );
}

export default EditForm;