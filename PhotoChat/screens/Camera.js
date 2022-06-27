import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions, 
    FlatList, 
    Image, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View
} from "react-native";
import { Audio, Video } from 'expo-av';
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useIsFocused } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import theme from "../core/theme";
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

const CameraCapture = ({route, navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFlash, setIsFlash] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [type, setType] = useState(0);
    const [showGallery, setShowGallery] = useState(true)
    const [galleryItems, setGalleryItems] = useState([])
    const [galleryScrollRef, setGalleryScrollRef] = useState(null)
    const [galleryPickedImage, setGalleryPickedImage] = useState(null)
    const cameraRef = useRef();
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {

            const cameraPermissions = await Camera.requestPermissionsAsync();
            const galleryPermissions = await MediaLibrary.requestPermissionsAsync();

            const audioPermissions = await Audio.requestPermissionsAsync();

            if (cameraPermissions.status === 'granted' && audioPermissions.status === 'granted' && galleryPermissions.status === 'granted') {
                const getPhotos = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['photo', 'video'] })
                setGalleryItems(getPhotos)
                setGalleryPickedImage(getPhotos.assets[0])
                setHasPermission(true)

            }

        })();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                navigation.navigate('Save', { source, imageSource: null, type })
            }
        }
    };

    const recordVideo = async () => {
        if (cameraRef.current) {
            try {

                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480p'] }


                const videoRecordPromise = cameraRef.current.recordAsync(options);
                if (videoRecordPromise) {
                    setIsVideoRecording(true);
                    const data = await videoRecordPromise;
                    const source = data.uri;
                    let imageSource = await generateThumbnail(source)
                    navigation.navigate('Save', { source, imageSource, type })

                }
            } catch (error) {
                console.warn(error);
            }
        }
    };

    const generateThumbnail = async (source) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {
                    time: 5000,
                }
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };

    const stopVideoRecording = async () => {

        if (cameraRef.current) {
            setIsVideoRecording(false);
            cameraRef.current.stopRecording();
        }
    };

    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const handleGoToSaveOnGalleryPick = async () => {
        let type = galleryPickedImage.mediaType == 'video' ? 0 : 1

        const loadedAsset = await MediaLibrary.getAssetInfoAsync(galleryPickedImage);
        let imageSource = null
        if (type == 0) {
            imageSource = await generateThumbnail(galleryPickedImage.uri)
        }

        props.navigation.navigate('Save', {
            source: loadedAsset.localUri,
            type,
            imageSource
        })
    }

    const captureControl = () => {
        return (
        <View style={styles.container}>
            <TouchableOpacity 
                disabled={!isCameraReady}
                onPress={() => setIsFlash(!isFlash)}
                >
                <Feather name="zap" size={25} color={theme.SECONDARY_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity 
                disabled={!isCameraReady} 
                onPress={switchCamera}
                >
                <Feather name="rotate-cw" size={25} color={theme.SECONDARY_COLOR} />
            </TouchableOpacity>
            {type == 0 ?
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={!isCameraReady}
                    onLongPress={recordVideo}
                    onPressOut={stopVideoRecording}
                    style={styles.capture}
                />
                :
                <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={!isCameraReady}
                    onPress={takePicture}
                    style={styles.capturePicture}
                />
            }
            <TouchableOpacity 
                disabled={!isCameraReady} 
                onPress={() => type == 1 ? setType(0) : setType(1)}
                >
                <Feather name={type == 0 ? "camera" : "video"} size={25} color={theme.SECONDARY_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => 
                setShowGallery(true)} 
                >
                <Feather name="image" size={25} color={theme.SECONDARY_COLOR} />
            </TouchableOpacity>
        </View>
        )
    }

    if (hasPermission === null) {
        return <Text>App has no Permisions</Text>
    }
    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }

    if (showGallery) {
        return (
            <ScrollView
                ref={(ref) => setGalleryScrollRef(ref)}
                style={{flex: 1, backgroundColor: 'white'}}
                >
                <View
                    style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
                    <Image
                        style={{ flex: 1, aspectRatio: 1 / 1, height: WINDOW_WIDTH }}
                        source={{ uri: galleryPickedImage.uri }}
                        ratio={'1:1'}
                    />
                </View>
                <View 
                    style={{ justifyContent: 'flex-end', alignItems: 'center', marginRight: 20, marginVertical: 10, flexDirection: 'row' }}>

                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 10, marginRight: 15, borderRadius: 50, borderWidth: 1, borderColor: 'black' }}
                        onPress={() => handleGoToSaveOnGalleryPick()}
                        >
                        <Text style={{ fontWeight: 'bold', color: 'white', paddingBottom: 1 }}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', backgroundColor: 'gray', borderRadius: 50, borderWidth: 1, borderColor: 'black' }} onPress={() => setShowGallery(false)} >
                        <Feather style={{ padding: 10 }} name="camera" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>

                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={galleryItems.assets}

                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{flex: 1 / 3, borderLeftWidth: 2,
                                borderRightWidth: 2,
                                borderTopWidth: 2,
                                borderColor: 'white'}}
                                onPress={() => { galleryScrollRef.scrollTo({ x: 0, y: 0, animated: true }); setGalleryPickedImage(item); }}>

                                <Image
                                    style={{aspectRatio: 1 / 1}}
                                    source={{ uri: item.uri }}
                                />

                            </TouchableOpacity>

                        )}

                    />
                </View>

            </ScrollView>
        )
    }
    
  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
        <View
            style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
            {isFocused ?
                <Camera
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    type={cameraType}
                    flashMode={isFlash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    // style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
                    ratio={'1:1'}
                    onCameraReady={onCameraReady}
                />
                : null
            }
        </View>
        <View style={[{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
            }]}>
                <View>
                    {captureControl()}
                </View>

            </View>
        <Text>Camera</Text>
    </View>
  )
}

export default CameraCapture

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly', 
        width: '100%', 
        alignItems: 'center', 
        flexDirection: 'row', 
        backgroundColor: 'white'
    },
})