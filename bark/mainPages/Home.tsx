import {View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Button, Alert, TouchableHighlight, Dimensions} from 'react-native'

const dimensions=Dimensions.get('window');

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
    },

    headings:{
        fontSize: 18,
        //color:"#6F8FAF",
        fontWeight: "bold",
        fontFamily: "Apple SD Gothic Neo",
        marginVertical: 7,
        marginHorizontal: 10

    },

    dogPicsContainer: {
        flexDirection: "row",
        justifyContent: "center", 
        marginHorizontal:10,
        alignSelf:"center",
        alignItems:"center"
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
        fontSize: 16,
        color: "black",
        alignSelf: "flex-start",
        fontFamily: "Apple SD Gothic Neo",
        marginHorizontal: 15
    },
    
    dogPics:{
        width: dimensions.width-20,
        height: 400,
        alignSelf: "center",
        resizeMode:"cover",
        borderRadius: 10,
        paddingBottom:5,
        marginRight:15,
        marginLeft:3,
        justifyContent:"center"

    },

    view : { 
        width: dimensions.width/2, 
        height:30, 
        backgroundColor : "lightgreen", 
        alignItems : "center", 
        justifyContent : "center", 
        marginVertical:10
    }, 

    view2 : { 
        width:dimensions.width/2, 
        height:30, 
        backgroundColor : "#FF3131", 
        alignItems : "center", 
        justifyContent : "center", 
        marginVertical:10
    }, 

    viewContainer: {
        flexDirection: "row",
    },

    buttonText:{
        fontWeight: "bold",
        fontSize: 14,
        color: "black",
        fontFamily:"Apple SD Gothic Neo"
    },

    username:{
        fontSize: 14,
        color: "black",
        marginTop: 12,
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
                <Text style={{fontSize:12,color:"black",marginTop:1}}>Location or smth</Text>
            </View>
        </View>


        <View>
            
        <ScrollView horizontal={true} centerContent={true} pagingEnabled={true}>
            <View style={styles.dogPicsContainer}>
                    <Image source={require("./dogs.jpg")}style={styles.dogPics}/>
                    <Image source={require("./percy1.jpg")}style={styles.dogPics}/>
                    <Image source={require("./pfp.jpg")}style={styles.dogPics}/>
                    <Image source={require("./percy2.jpg")}style={styles.dogPics}/>
            </View>  
        </ScrollView>
            
    
            <View style={styles.viewContainer}>
                <TouchableHighlight
                    onPress={() => Alert.alert("ayyyy")}
                    underlayColor="transparent">
                        <View style={styles.view}>
                            <Text style={styles.buttonText}>Yes!</Text>
                        </View>
                </TouchableHighlight>
                <TouchableHighlight
                onPress={()=> Alert.alert("awwww")}
                underlayColor="transparent">
                    <View style={styles.view2}>
                        <Text style={styles.buttonText}>Pass...</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.headings}>Name:</Text>
                <Text style={{fontSize:18,fontFamily:"Apple SD Gothic Neo",color:"black", marginVertical:7}}>Dog Name</Text>
            </View>
            <Text style={styles.headings}>Bio:</Text>
            <Text style={styles.dogBio}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quaerat molestias quae enim aut ipsa expedita rem aspernatur quidem autem ad fugit labore, vitae, blanditiis inventore cupiditate eos. Eum, qui excepturi. Sapiente explicabo vitae deleniti alias quisquam, est, perspiciatis eum necessitatibus, asperiores voluptate hic! Aut dolor iusto tempora voluptatibus dignissimos.</Text>
            <View style={styles.container}></View>
        </View>
    
    
    </SafeAreaView>
    </ScrollView>
);

export default Home;
