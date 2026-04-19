import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const LEGAL_CONTENT = [
    {
        title: "1. Acceptance of Terms",
        content: "By accessing and using this Diary Application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application. We reserve the right to modify these terms at any time."
    },
    {
        title: "2. Privacy Policy",
        content: "Your privacy is important to us. We do not sell or share your personal diary data with third parties. All your entries are stored locally on your device or in your private cloud backup if enabled. We collect minimal technical data for app performance monitoring."
    },
    {
        title: "3. User Responsibilities",
        content: "You are responsible for maintaining the confidentiality of your account credentials. Any content you write in your diary is your own responsibility. We do not monitor or censor your private entries."
    },
    {
        title: "4. Data Storage",
        content: "Please be aware that if you delete the application without a backup, your local data may be permanently lost. We recommend periodic backups through the application's sync features."
    },
    {
        title: "5. Intellectual Property",
        content: "The application design, code, and original graphics are the property of the developers. Your diary entries and personal content remain your exclusive property."
    }
];

export default function Legal() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    return (
        <SafeAreaView 
            className="flex-1"
            style={{ backgroundColor: isDark ? '#121212' : '#F9FBFF' }}
        >
            {/* Header */}
            <View className="px-5 py-4 flex-row items-center border-b" style={{ borderBottomColor: isDark ? '#262626' : '#F1F5F9' }}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center rounded-full"
                    activeOpacity={0.7}
                >
                    <Icon name="chevron-back" size={24} color={isDark ? '#FFF' : '#111827'} />
                </TouchableOpacity>
                <Text className={`flex-1 text-center font-nunitoBold text-[18px] mr-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Terms & Privacy
                </Text>
            </View>

            <ScrollView 
                className="flex-1 px-6 pt-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <View className="mb-8">
                    <Text className={`font-nunitoBold text-[28px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Legal Information
                    </Text>
                    <Text className="font-nunitoRegular text-[14px] text-slate-500 mt-2">
                        Last updated: February 10, 2026
                    </Text>
                </View>

                {LEGAL_CONTENT.map((section, index) => (
                    <View key={index} className="mb-8">
                        <Text className={`font-nunitoBold text-[18px] mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {section.title}
                        </Text>
                        <Text className={`font-nunitoRegular text-[15px] leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            {section.content}
                        </Text>
                    </View>
                ))}

                <View className={`mt-4 p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <Text className={`font-nunitoRegular text-center text-[13px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        If you have any questions regarding these terms, please contact us through user support in the settings page.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
