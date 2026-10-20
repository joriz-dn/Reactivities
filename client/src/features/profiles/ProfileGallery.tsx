import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Box, Button, Divider, ImageList, ImageListItem, Typography} from "@mui/material";
import {useState} from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget.tsx";
import StarButton from "../../app/shared/components/StarButton.tsx";
import DeleteButton from "../../app/shared/components/DeleteButton.tsx";

function ProfileGallery() {
    const {id} = useParams();
    const {photos, photoLoading, isCurrentUser, uploadPhoto, profile, setMainPhoto, deletePhoto, cleanUpGallery } = useProfile(id);
    const [edit, setEdit] = useState<boolean>(false);
    
    const handlePhotoUpload = (photo: Blob) => {
        uploadPhoto.mutate(photo, {
            onSuccess: () => {
                setEdit(false);
            }
        })
    }
    
    if (photoLoading) return <Typography>Loading...</Typography>;
    if (!photos) return <Typography>No Photos Found!</Typography>;
    return (
        <>
            <Box>
                <Box sx={{display:'flex', justifyContent:'end'}}>
                    {isCurrentUser && (
                        <div>
                            <Button onClick={() => setEdit(!edit)}>
                                {edit ? 'Cancel' : 'Add Photo'}
                            </Button>
                            {
                                (photos.length > 5) && (
                                    <Button onClick={() => cleanUpGallery.mutate()}>
                                      |  Clean up Gallery
                                    </Button>
                                )
                            }
                        </div>
                    )}
                </Box>
                <Divider sx={{my:2}} />
                {edit ? (
                    <PhotoUploadWidget
                        uploadPhoto={handlePhotoUpload}
                        loading={uploadPhoto.isPending}
                    />
                    ) : (
                    <ImageList cols={6} rowHeight={251} sx={{height:'100%'}}>
                        {photos.map((item) => (
                            <ImageListItem key={item.id}>
                                <img
                                    src={`${item.url.replace(
                                        '/upload/',
                                        '/upload/w_250,h_250,c_fill,f_auto,g_face/'
                                    )}`}
                                    alt={item.id}
                                    loading="lazy"
                                />
                                {
                                    isCurrentUser && (
                                        <div>
                                            <Box
                                                sx={{position:'absolute', top:0, left: 0}}
                                                onClick={() => setMainPhoto.mutate(item)}
                                            >
                                                <StarButton selected={item.url === profile?.imageUrl}></StarButton>
                                            </Box>
                                            {profile?.imageUrl !== item.url && (
                                                <Box
                                                    sx={{position:'absolute', top:0, right: 0}}
                                                    onClick={() => deletePhoto.mutate(item.id)}
                                                >
                                                    <DeleteButton />
                                                </Box>
                                            )}
                                        </div>
                                 )}
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}
            </Box>
        </>
    );
}

export default ProfileGallery;