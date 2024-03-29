// @flow
import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {VideoItem} from './VideoItem.js';

type Props = {
    latitude: number,
    longitude: number
}
type State = {
    videos: Array<mixed>,
    pageToken: string,
    loadingMore: boolean,
    refreshing: boolean
}

const searchRadius = '10km'
const maxResults = 3
const apiKey = 'AIzaSyDPXbRYJR8-DfTa1U7P1pWxL_TqKh7yobY'

export class VideoList extends Component<Props, State> {
    state = {
        videos: [],
        pageToken: '',
        loadingMore: false,
        refreshing: false
    };

    componentDidMount() {
        this.fetchLatestVideos()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props){
            this.setState({
                videos: [],
                pageToken: '',
                loadingMore: false,
                refreshing: false
            })
            this.fetchLatestVideos();
          }
    }

    fetchLatestVideos() {
        const locationCoords = `${this.props.latitude}%2C+${this.props.longitude}`
        const baseUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${locationCoords}&locationRadius=${searchRadius}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
        const fetchUrl = this.state.pageToken === '' ? baseUrl : `${baseUrl}&pageToken=${this.state.pageToken}`
        return fetch(fetchUrl)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({videos: [...this.state.videos, ...responseJson.items], pageToken: responseJson.nextPageToken, loadingMore: false, refreshing: false});
                })
                .catch((error) =>{
                    console.error(error);
                });
    }

    handleLoadMore = () => {
        this.setState(
            (prevState) => ({
                loadingMore: true
            }),
            () => {
              this.fetchLatestVideos();
            }
          );
    }

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true,
                pageToken: ''
            },
            () => {
              this.fetchLatestVideos();
            }
          );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.videos}
                            renderItem = {({item}) => <VideoItem item={item}/>}
                            keyExtractor = {item => item.id.videoId}
                            ItemSeparatorComponent={this.renderSeparator}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={0.5}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.refreshing}
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
  