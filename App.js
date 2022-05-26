import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
//Added Image capture package!

var { height, width } = Dimensions.get("window");

export default function App() {
  const [audioAccess, setAudioAccess] = useState(null);
  const [cameraAccess, setCameraAccess] = useState(null);
  const [cam, setCam] = useState(null);
  const [startRecord, setSatrtRecord] = useState(null);
  const [camType, setCamType] = useState(Camera.Constants.Type.back);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    (async () => {
      const cameraSetting = await Camera.requestCameraPermissionsAsync();
      setCameraAccess(cameraSetting.status === "granted");

      const audioSetting = await Camera.requestMicrophonePermissionsAsync();
      setAudioAccess(audioSetting.status === "Denied");
    })();
  }, []);

  const takeVideo = async () => {
    if (cam) {
      const data = await cam.startRecordAsync({
        maxDuration: 45,
      });
      setSatrtRecord(data.uri);
      console.log(data.uri);
    }
  };

  const stopVideo = async () => {
    cam.stopRecording();
  };

  //Error Granting access
  if (cameraAccess === false) {
    return <Text style={styles.errorText}>Error Accessing to the Camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.camContainer}>
        <Camera
          ref={(ref) => setCam(ref)}
          style={styles.fixedRatio}
          type={camType}
          ratio={"5"}
        />
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: startRecord,
        }}
        useNativeControls
        resizMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <View style={styles.btn}>
        <View style={styles.play}>
          <Pressable
          // onPress={() =>
          //   status.isPlaying
          //     ? video.current.pauseAsync()
          //     : video.current.playAsync()
          // }
          >
            <Text style={styles.textBTN1}>Play</Text>
          </Pressable>
        </View>
      </View> */}

      <View style={styles.btns}>
        <View style={styles.btnRecord}>
          <Pressable onPress={() => takeVideo()}>
            <Text style={styles.textBTN}>Start</Text>
          </Pressable>
        </View>
        <Text style={styles.logo}>Think3DDD</Text>
        <View style={styles.btnStop}>
          <Pressable onPress={() => stopVideo()}>
            <Text style={styles.textBTN}>Stop</Text>
          </Pressable>
        </View>
      </View>

      {/* <View style={styles.btn}>
        <View style={styles.save}>
          <Pressable>
            <Text style={styles.textBTN1}>Send</Text>
          </Pressable>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  camContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 0.5,
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 250,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  play: {
    width: 80,
    height: 80,
    backgroundColor: "#F9D923",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#187498",
  },
  save: {
    width: 80,
    height: 80,
    backgroundColor: "#4D96FF",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#187498",
    marginBottom: height / 90,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height / 90,
  },

  btnRecord: {
    width: 80,
    height: 80,
    backgroundColor: "#00FFAB",
    borderRadius: 100,
    marginLeft: width / 20,
    borderWidth: 2,
    borderColor: "#187498",
  },
  btnStop: {
    width: 80,
    height: 80,
    backgroundColor: "#EB5353",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#187498",
    marginRight: width / 20,
  },
  textBTN: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: height / 30,
  },
  textBTN1: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: height / 30,
  },
  logo: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f7699",
    marginTop: height / 40,
  },
  errorText: {
    justifyContent: "center",
    alignSelf: "center",
  },
});
