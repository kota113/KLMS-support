import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

const WEBVIEW_URL = 'https://lms.keio.jp'; // Replace with the URL of the target website

const Screen = () => {
    const insets = useSafeAreaInsets();
    const webViewRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCookies = async () => {
            const cookies = await AsyncStorage.getItem('cookies');
            if (cookies && webViewRef.current) {
                webViewRef.current.injectJavaScript(`
          document.cookie = '${cookies}';
        `);
            }
        };
        loadCookies().then(r => console.log("Cookies loaded"));
    }, []);

    const handleMessage = async (event) => {
        const {data} = event.nativeEvent;
        if (data.startsWith('cookies:')) {
            const cookies = data.replace('cookies:', '');
            await AsyncStorage.setItem('cookies', cookies);
        }
    };

    const handleNavigationStateChange = (navState) => {
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
        window.ReactNativeWebView.postMessage('cookies:' + document.cookie);
      `);
        }
    };

    return (
        <View style={{flex: 1}}>
            <WebView
                style={{marginTop: insets.top, marginBottom: insets.bottom}}
                ref={webViewRef}
                source={{uri: WEBVIEW_URL}}
                onLoadEnd={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
                onNavigationStateChange={handleNavigationStateChange}
                onMessage={handleMessage}
                injectedJavaScript={`
                  window.ReactNativeWebView.postMessage('cookies:' + document.cookie);
                `}
            />
            {loading && (
                <View style={{position: 'absolute', top: insets.top, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>読み込み中...</Text>
                </View>
            )}
        </View>
    );
};

// export default Screen;

// noinspection JSUnusedGlobalSymbols
export default () => (
    <SafeAreaProvider>
        <StatusBar style="auto"/>
        <Screen/>
    </SafeAreaProvider>
);
