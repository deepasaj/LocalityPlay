import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export class VideoItem extends Component {
    render() {
        const item = this.props.item
        return (
            <View style={styles.container}>
                <Image source={{uri: item.snippet.thumbnails.medium.url}} style={styles.imagePreview}/>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} style={styles.heading}>{item.snippet.title}</Text>
                    <Text numberOfLines={2} style={styles.description}>{item.snippet.description}</Text>
                </View>
            </View>
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