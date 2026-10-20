import {Box, Button, Grid, Typography} from "@mui/material";
import {useDropzone} from "react-dropzone";
import {CloudUpload} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import {Cropper, type ReactCropperElement} from "react-cropper";
import "cropperjs/dist/cropper.css"

type Props = {
    uploadPhoto: (photo: Blob) => void,
    loading: boolean,
}

function PhotoUploadWidget({uploadPhoto, loading} : Props) {

    const [files, setFiles] = useState<object & { preview : string }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);
    
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file as Blob),
            })));
        }
    });
    const color = isDragActive ? '#1976d2' : 'darkgray';
    
    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob(blob => {
            uploadPhoto(blob as Blob);
        })
    }, [uploadPhoto])
    
    return (
        <Grid container>
            <Grid size={4}>
                <Typography variant='overline'>Step 1 - Add Photo</Typography>
                <Box {...getRootProps()} 
                    sx={{
                        border: '3px dashed #eee',
                        borderColor: isDragActive ? '#1976d2' : '#eee',
                        borderRadius: 1,
                        paddingTop: '30px',
                        textAlign: 'center',
                        height: 'auto',
                        minHeight: 300,
                        mr: 2,
                        mb: 0,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{fontSize:60, color:color}}></CloudUpload>
                    <Typography variant='h6' sx={{color:color}}>Drag image here</Typography>
                </Box>
            </Grid>
            <Grid size={4}>
               <Box>
                   <Typography variant='overline'>Step 2 - Resize</Typography>
                   {
                       files[0]?.preview &&
                       <Cropper
                           src={files[0].preview}
                           style={{ height: 300, width: '90%'}}
                           // Cropper.js options
                           initialAspectRatio={1}
                           aspectRatio={1}
                           viewMode={1}
                           guides={false}
                           ref={cropperRef}
                           preview='.img-preview'
                           background={false}
                       />
                   }
               </Box>
            </Grid >
            <Grid size={4}>
                {files[0]?.preview && (
                    <>
                        <Typography variant='overline'>Step 3 - Preview & Upload</Typography>
                        <Box
                            className="img-preview"
                            sx={{width: '100%', height: 300, overflow: 'hidden'}} />
                        <Button
                            sx={{mt: 2}}
                            onClick={onCrop}
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >Upload</Button>
                    </>
                )}
            </Grid>
        </Grid>
    );
}

export default PhotoUploadWidget;