/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    View,
    Text,
    TouchableHighlight,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Player,
    Recorder,
    MediaStates
} from 'react-native-audio-toolkit';

let textContent = 'off';
type Props = {};
export default class App extends Component<Props> {
    constructor() {
        super();
        this.state = {
            textContent: 'off'
        };
    }

    recordAudio() {
        this.setState({
            textContent: 'on'
        });
        let recorderOptions = {
            quality: 'max'
        };
        let rec = new Recorder("filename.mp4").record();
        // Stop recording after approximately 3 seconds
        setTimeout(() => {
            rec.stop((err) => {
                // NOTE: In a real situation, handle possible errors here
                this.setState({
                    textContent: 'off'
                });
                // Play the file after recording has stopped
                new Player("filename.mp4")
                    .play()
                    .on('ended', () => {
                        // Enable button again after playback finishes

                    });
            });
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.recordAudio.bind(this)} underlayColor="white">
                    <View style={{
                        backgroundColor: '#339966',
                        width: 110,
                        height: 110,
                        borderRadius: 55,
                        alignItems: 'center',
                        padding: 5
                    }}>
                        <Icon style={{fontSize: 100}} name="microphone" color="#ffffff">
                        </Icon>
                    </View>
                </TouchableHighlight>
                <Text>{this.state.textContent}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:
        {
            flex: 1,
            justifyContent: 'center', // Used to set Text Component Vertically Center
            alignItems: 'center' // Used to set Text Component Horizontally Center
        },

    text:
        {
            fontSize: 35
        }
});
