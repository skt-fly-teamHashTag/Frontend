import React from "react";
import { View } from "react-native"
import VideoPlayer from "react-native-video-controls";

const VideoFullscreen = ({ navigation, route }) => {
  const videoPaths = route.params;
  return (
    <View style={{ width:'100%', height: '100%' }}>
      <VideoPlayer
        source={{ uri: 'https://test-videodot-bucket.s3.ap-northeast-2.amazonaws.com/videos/'+videoPaths }}
        toggleResizeModeOnFullscreen={false}
        onEnterFullscreen={navigation.goBack}
        onExitFullscreen={navigation.goBack}
        onBack={navigation.goBack}
      />
    </View>
  )
}

export default VideoFullscreen;