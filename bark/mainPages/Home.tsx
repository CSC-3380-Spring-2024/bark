import {View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Button, Alert, TouchableHighlight} from 'react-native'

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
    },

    /**
    title:{
        fontSize:30,
        color: "black",
        alignSelf: "center",
        fontFamily: "American Typewriter",
    },
    */

    headings:{
        fontSize: 25,
        color:"#6F8FAF",
        alignSelf: "flex-start",
        fontWeight: "bold",
        fontFamily: "Apple SD Gothic Neo",
        marginVertical: 7,
        marginHorizontal: 10

    },

    profilePic:{
        width: 40,
        height: 40,
        borderRadius: 40/2,
        alignSelf: "flex-start",
        marginHorizontal:10,
        marginVertical: 7
    },

    dogBio:{
        fontSize: 20,
        color: "black",
        alignSelf: "flex-start",
        fontFamily: "Apple SD Gothic Neo",
        marginHorizontal: 15
    },
    
    dogPics:{
        width: 390,
        height: 410,
        alignSelf: "center",
    },

    view : { 
        width:195, 
        height:50, 
        backgroundColor : "lightgreen", 
        alignItems : "center", 
        justifyContent : "center", 
    }, 

    view2 : { 
        width:195, 
        height:50, 
        backgroundColor : "#FF3131", 
        alignItems : "center", 
        justifyContent : "center", 
    }, 

    viewContainer: {
        flexDirection: "row",
    },

    buttonText:{
        fontSize: 18,
        color: "black",
    },

    username:{
        fontSize: 12,
        color: "black",
        marginTop: 10,
        fontWeight: "bold"
    }

});

const Home=()=>(
    <ScrollView>
    <SafeAreaView>

        <View style={{flexDirection: "row"}}>
            <Image source={require("./pfp.jpg")}style={styles.profilePic}></Image>  
            <View>
                <Text style={styles.username}>dog_username1234</Text>
                <Text style={{fontSize:12,color:"black",marginTop:1}}>Location</Text>
            </View>
        </View>
            
        
        <View>
            <Image source={require("./dogs.jpg")}style={styles.dogPics}></Image>
            <View style={styles.viewContainer}>
                <TouchableHighlight
                    onPress={() => Alert.alert("ayyyy")}>
                        <View style={styles.view}>
                            <Text style={styles.buttonText}>Yes!</Text>
                        </View>
                </TouchableHighlight>
                <TouchableHighlight
                onPress={()=> Alert.alert("awwww")}>
                    <View style={styles.view2}>
                        <Text style={styles.buttonText}>Pass...</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <Text style={styles.headings}>Name: Thor, Poppy, and Gus</Text>
            <Text style={styles.headings}>Bio:</Text>
            <Text style={styles.dogBio}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quaerat molestias quae enim aut ipsa expedita rem aspernatur quidem autem ad fugit labore, vitae, blanditiis inventore cupiditate eos. Eum, qui excepturi. Sapiente explicabo vitae deleniti alias quisquam, est, perspiciatis eum necessitatibus, asperiores voluptate hic! Aut dolor iusto tempora voluptatibus dignissimos.</Text>
            <View style={styles.container}></View>
        </View>
    
    
    </SafeAreaView>
    </ScrollView>
);

export default Home;
