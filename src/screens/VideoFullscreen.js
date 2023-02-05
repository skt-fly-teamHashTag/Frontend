import React from "react";
import { View } from "react-native"
import VideoPlayer from "react-native-video-controls";

const VideoFullscreen = ({ navigation, route }) => {
  const videoPath = route.params;
  return (
    <View style={{ width:'100%', height: '100%' }}>
      <VideoPlayer
        source={{ uri: videoPath }}
        onBack={navigation.goBack}
      />
    </View>
  )
}

export default VideoFullscreen;