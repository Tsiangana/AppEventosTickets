import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

const USER_DATA = {
    name: "Alex Silva",
    email: "alex.silva@meudiario.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    streak: 12,
    totalNotes: 84,
    folders: 4
};

const StatBox = ({ label, value, icon, color, index, isDark }: any) => (
    <Animated.View 
        entering={FadeInDown.delay(200 + index * 100).springify()}
        className={`flex-1 items-center p-4 mx-1.5 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-white'}`}
        style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 } : {}}
    >
        <View 
            className="w-10 h-10 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: `${color}20` }}
        >
            <Icon name={icon} size={20} color={color} />
        </View>
        <Text className={`font-nunitoBold text-[18px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</Text>
        <Text className={`font-nunitoRegular text-[12px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</Text>
    </Animated.View>
);

const SettingItem = ({ icon, label, subLabel, color, isDark, index, onPress }: any) => (
    <Animated.View entering={FadeInRight.delay(400 + index * 100).springify()}>
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={onPress}
            className={`flex-row items-center p-4 mb-3 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'}`}
            style={!isDark ? { elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 5 } : {}}
        >
            <View 
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
            >
                <Icon name={icon} size={20} color={color} />
            </View>
            <View className="flex-1 ml-4">
                <Text className={`font-nunitoBold text-[15px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</Text>
                {subLabel && (
                    <Text className={`font-nunitoRegular text-[12px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subLabel}</Text>
                )}
            </View>
            <Icon name="chevron-forward" size={18} color={isDark ? '#4B5563' : '#CBD5E1'} />
        </TouchableOpacity>
    </Animated.View>
);

export default function Profile() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

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
                    <Icon name="chevron-back" size={22} color={isDark ? '#FFF' : '#111827'} />
                </TouchableOpacity>

                <Text className={`font-nunitoBold text-[18px] ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                    Perfil
                </Text>

                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => router.push('/pages/settings/account')}
                    className={`w-11 h-11 items-center justify-center rounded-full ${isDark ? 'bg-white/10' : 'bg-white'}`}
                    style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 } : {}}
                >
                    <Icon name="settings-outline" size={22} color={isDark ? '#FFF' : '#111827'} />
                </TouchableOpacity>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
            >
                {/* User Info Section */}
                <Animated.View 
                    entering={FadeInDown.springify()}
                    className="items-center mb-8"
                >
                    <View 
                        className="relative rounded-full"
                        style={!isDark ? { elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6 } : {}}
                    >
                        <Image 
                            source={{ uri: USER_DATA.avatar }}
                            className="w-28 h-28 rounded-full border-4 border-white"
                        />
                        <TouchableOpacity 
                            onPress={() => router.push('/pages/settings/account')}
                            activeOpacity={0.8}
                            className="absolute bottom-1 right-1 bg-[#3088f9] w-8 h-8 rounded-full items-center justify-center border-2 border-white"
                        >
                            <Icon name="camera" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text className={`font-nunitoBold text-[24px] mt-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {USER_DATA.name}
                    </Text>
                    <Text className="font-nunitoRegular text-[14px] text-slate-400">
                        {USER_DATA.email}
                    </Text>
                </Animated.View>

                {/* Stats Grid */}
                <View className="flex-row justify-between mb-8">
                    <StatBox label="Streak" value={USER_DATA.streak} icon="flame" color="#EF4444" index={0} isDark={isDark} />
                    <StatBox label="Notas" value={USER_DATA.totalNotes} icon="journal" color="#3088f9" index={1} isDark={isDark} />
                    <StatBox label="Pastas" value={USER_DATA.folders} icon="folder" color="#A855F7" index={2} isDark={isDark} />
                </View>

                {/* Settings Menu */}
                <View className="mb-6">
                    <Text className={`font-nunitoBold text-[14px] mb-4 ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase tracing-widest`}>
                        Preferências
                    </Text>
                    <SettingItem 
                        icon="notifications-outline" 
                        label="Notificações" 
                        subLabel="Lembretes diários e alertas" 
                        color="#3088f9" 
                        isDark={isDark} 
                        index={0} 
                        onPress={() => router.push('/pages/settings/notifications')}
                    />
                    <SettingItem 
                        icon="shield-checkmark-outline" 
                        label="Privacidade & Segurança" 
                        subLabel="Bloqueio por Biometria" 
                        color="#22C55E" 
                        isDark={isDark} 
                        index={1} 
                        onPress={() => router.push('/pages/settings/privacy')}
                    />
                    <SettingItem 
                        icon="cloud-upload-outline" 
                        label="Sincronização Cloud" 
                        subLabel="Segurança total dos dados" 
                        color="#6366F1" 
                        isDark={isDark} 
                        index={2} 
                        onPress={() => router.push('/pages/settings/sync')}
                    />
                </View>

                {/* Account Section */}
                <View className="mb-8">
                    <Text className={`font-nunitoBold text-[14px] mb-4 ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase tracing-widest`}>
                        Conta
                    </Text>
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={() => router.push('/pages/entrar/login')}
                        className={`flex-row items-center p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'}`}
                        style={!isDark ? { elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 5 } : {}}
                    >
                        <View className="w-10 h-10 rounded-xl items-center justify-center bg-red-500/10">
                            <Icon name="log-out-outline" size={20} color="#EF4444" />
                        </View>
                        <Text className="flex-1 ml-4 font-nunitoBold text-[15px] text-[#EF4444]">Terminar Sessão</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-center font-nunitoRegular text-[12px] text-slate-400/50 mb-4">
                    Versão 1.0.1 • Tsiangana Zau
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}