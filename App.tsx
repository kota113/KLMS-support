import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView, WebViewNavigation} from 'react-native-webview';
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import CookieManager from '@react-native-cookies/cookies';

const WEBVIEW_URL = 'https://lms.keio.jp'; // Replace with the URL of the target website

const Screen = () => {
    const insets = useSafeAreaInsets();
    const webViewRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCookies = async () => {
            const cookies = await AsyncStorage.getItem('cookies');
            if (cookies) {
                const parsedCookies = JSON.parse(cookies);
                for (const [key, value] of Object.entries(parsedCookies)) {
                    await CookieManager.set(WEBVIEW_URL, { name: key, value: value as string });
                }
            }
        };
        loadCookies().then(() => console.log("Cookies loaded"));
    }, []);

    const handleNavigationStateChange = async (_navState: WebViewNavigation) => {
        const cookies = await CookieManager.get(WEBVIEW_URL);
        await AsyncStorage.setItem('cookies', JSON.stringify(cookies));
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
                style={{ marginTop: insets.top, marginBottom: insets.bottom }}
                ref={webViewRef}
                source={{ uri: WEBVIEW_URL }}
                onLoadEnd={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
                onNavigationStateChange={handleNavigationStateChange}
            />
            {loading && (
                <View style={{ position: 'absolute', top: insets.top, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>読み込み中...</Text>
                </View>
            )}
        </View>
    );
};


// noinspection JSUnusedGlobalSymbols
export default () => (
    <SafeAreaProvider>
        <StatusBar style="auto" />
        <Screen />
    </SafeAreaProvider>
);
