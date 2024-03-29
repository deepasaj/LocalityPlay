import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet, Platform} from 'react-native';
import { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export class VideoItem extends Component {
    playVideoInAndroid = () => {
        YouTubeStandaloneAndroid.playVideo({
            apiKey: 'AIzaSyBQgeVIDDY56KAX9hXVfdQSQiqaEwSw0HU', 
            videoId: this.props.item.id.videoId, 
            autoplay: true,             
            lightboxMode: true
          });
    }

    playVideoInIos = () => {
        YouTubeStandaloneIOS.playVideo(this.props.item.id.videoId)
    }

    playVideo = () => {
        Platform.select({
            ios: this.playVideoInIos,
            android: this.playVideoInAndroid
        })()
    }

    render() {
        const item = this.props.item
        return (
            <TouchableHighlight onPress={this.playVideo} underlayColor="white">
                <View style={styles.container}>
                    <Image source={{uri: item.snippet.thumbnails.medium.url}} style={styles.imagePreview}/>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={2} style={styles.heading}>{item.snippet.title}</Text>
                        <Text numberOfLines={2} style={styles.description}>{item.snippet.description}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 125,
        flexDirection: 'row',
        padding: 10
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
        flexWrap: 'wrap'
    },
    imagePreview: {
        width: 150
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    description: {
        marginTop: 10
    }
});