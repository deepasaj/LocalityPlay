// @flow
import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {VideoItem} from './VideoItem.js';

type Props = {
    latitude: number,
    longitude: number
}
type State = {
    videos: Array<mixed>
}

const searchRadius = '10km'
const maxResults = 10
const apiKey = 'AIzaSyBQgeVIDDY56KAX9hXVfdQSQiqaEwSw0HU'

export class VideoList extends Component<Props, State> {
    state = {
        videos: []
    };

    componentDidMount() {
        this.fetchLatestVideos()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props){
            this.fetchLatestVideos();
          }
    }

    fetchLatestVideos() {
        const locationCoords = `${this.props.latitude}%2C+${this.props.longitude}`
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&location=${locationCoords}&locationRadius=${searchRadius}&maxResults=${maxResults}&order=date&type=video%2Clist&key=${apiKey}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({videos: responseJson.items});
                })
                .catch((error) =>{
                    console.error(error);
                });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.videos}
                            renderItem = {({item}) => <VideoItem item={item}/>}
                            keyExtractor = {item => item.id.videoId}
                            ItemSeparatorComponent={this.renderSeparator}
                            />
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View style={styles.itemSeparator}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 0.4
    },
    itemSeparator: {
        height: 20,
        backgroundColor: 'lightgrey'
    }
  });
  