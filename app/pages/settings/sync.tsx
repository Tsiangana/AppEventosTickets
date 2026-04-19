import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

export default function SyncSettings() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const [isSyncEnabled, setIsSyncEnabled] = useState(false);

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
                    Sincronização Cloud
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
                                Cópia de Segurança
                            </Text>
                            <Text className={`font-nunitoRegular text-[14px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Guardar dados na nuvem com segurança
                            </Text>
                        </View>
                        <Switch 
                            trackColor={{ false: '#767577', true: '#6366F180' }}
                            thumbColor={isSyncEnabled ? '#6366F1' : '#f4f3f4'}
                            onValueChange={() => setIsSyncEnabled(!isSyncEnabled)}
                            value={isSyncEnabled}
                        />
                    </View>

                    <View className={`h-[1px] w-full mb-6 ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />

                    <View className="mb-6">
                        <View className="flex-row items-center mb-3">
                            <View className="w-10 h-10 rounded-xl bg-[#6366F115] items-center justify-center">
                                <Icon name="cloud-done-outline" size={20} color="#6366F1" />
                            </View>
                            <Text className={`font-nunitoBold text-[15px] ml-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Porquê sincronizar?
                            </Text>
                        </View>
                        <Text className={`font-nunitoRegular text-[13px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            A sincronização protege-te contra a perda ou troca de telemóvel. Os teus dados são encriptados e podem ser recuperados em segundos num novo dispositivo.
                        </Text>
                    </View>

                    <View className="flex-row items-center p-4 rounded-2xl bg-[#6366F110]">
                        <Icon name="information-circle-outline" size={20} color="#6366F1" />
                        <Text className={`flex-1 ml-3 font-nunitoRegular text-[12px] ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
                            O Backup automático será realizado de 3 em 3 meses para garantir a integridade total.
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
