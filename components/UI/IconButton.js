import {Pressable, Text, StyleSheet, View} from 'react-native'

function IconButton( {onPress}){
    return (
        <Pressable onPress={onPress}>
            <View style={styles.buttonContainer}>
            <Text style={styles.button}>+</Text>
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    button:{
        color: 'white',
        fontSize: 28,
        // fontWeight: 'bold'
    }
})

