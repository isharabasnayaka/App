import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { launchCamera } from 'react-native-image-picker';

const HomeScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const takePhoto = () => {
    launchCamera(
      { mediaType: 'photo', cameraType: 'back', maxWidth: 800, maxHeight: 600 },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled photo picker');
        } else if (response.errorCode) {
          console.log('Error: ', response.errorCode);
        } else {
          setImageUri(response.assets[0].uri); // set the image uri after capture
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={takePhoto} />
      {imageUri && (
        <View>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button
            title="Next"
            onPress={() => navigation.navigate('Upload', { imageUri })}
          />
        </View>
      )}
    </View>
  );
};

const UploadScreen = ({ navigation }) => {
  const { imageUri } = navigation.state.params;

  const uploadImage = () => {
    // You can add logic here for uploading the image
    console.log('Uploading image to server...', imageUri);
  };

  return (
    <View style={styles.container}>
      <Text>Upload the Photo</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Button title="Upload" onPress={uploadImage} />
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Upload: UploadScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
