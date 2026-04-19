import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotificationSettings() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <SafeAreaView 
            edges={['top']} 
            className="flex-1"
            style={{ backgroundColor: isDark ? '#121212' : '#F9FBFF' }}
        >
            {/* Header */}
            <View className="px-5 py-4 flex-row items-center justify-between">
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => router.back()}
                    className={`w-11 h-11 items-center justify-center rounded-full ${isDark ? 'bg-white/10' : 'bg-white'}`}
                    style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 } : {}}
                >
                    <Icon name="chevron-back" size={24} color={isDark ? '#fff' : '#111827'} />
                </TouchableOpacity>

                <Text className={`font-nunitoBold text-[18px] ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                    Notificações
                </Text>

                <View className="w-11" />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
            >
                <Animated.View 
                    entering={FadeInDown.springify()}
                    className={`p-6 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-white'}`}
                    style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 15 } : {}}
                >
                    <View className="flex-row items-center justify-between mb-6">
                        <View className="flex-1 mr-4">
                            <Text className={`font-nunitoBold text-[18px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Notificações Push
                            </Text>
                            <Text className={`font-nunitoRegular text-[14px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Receber alertas e lembretes diários
                            </Text>
                        </View>
                        <Switch 
                            trackColor={{ false: '#767577', true: '#3088f980' }}
                            thumbColor={isEnabled ? '#3088f9' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsEnabled(!isEnabled)}
                            value={isEnabled}
                        />
                    </View>

                    <View className={`h-[1px] w-full mb-6 ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />

                    <View className="flex-row items-start">
                        <View className="w-10 h-10 rounded-xl bg-[#3088f915] items-center justify-center">
                            <Icon name="bulb-outline" size={20} color="#3088f9" />
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className={`font-nunitoBold text-[15px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Porquê ativar?
                            </Text>
                            <Text className={`font-nunitoRegular text-[13px] mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Os lembretes ajudam-te a manter a consistência na escrita do teu diário, o que é fundamental para o teu bem-estar mental e organização pessoal.
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
