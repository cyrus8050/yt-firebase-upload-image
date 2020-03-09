import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image , SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from './utilities/Userpermission'
import Fire from './Fire'
export default function App() {
  const [image, setImage] = useState(null)
  useEffect(() => {
   UserPermissions.getPermissionAsync()
  }, [])
  const upload = () => {
    Fire.shared.addPhoto(image).then(()=>{
      setImage(null)

    })
    .catch(err=>{
      alert(err.message)
    })
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Choose Pictures" onPress={pickImage}/>
      <View style={{marginHorizontal:32, marginTop:32, height:150}}>
        {image === null? <Text>No image is selected</Text>: <View><Image source={{uri:image}} style={{width:'100%', height:'100%'}}></Image>
        <Button title="Upload" onPress={upload}/>
        </View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
