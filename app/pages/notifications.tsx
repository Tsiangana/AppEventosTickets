import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        type: 'reminder',
        title: 'Hora do seu diário!',
        message: 'Que tal escrever sobre como foi o seu dia hoje?',
        time: '14:30',
        isRead: false,
        icon: 'time-outline',
        color: '#3088f9'
    },
    {
        id: '2',
        type: 'memory',
        title: 'Recordação de um ano atrás',
        message: 'Lembra-se da sua viagem? Veja o que escreveu na altura.',
        time: 'Ontem',
        isRead: true,
        icon: 'sparkles-outline',
        color: '#A855F7'
    },
    {
        id: '3',
        type: 'system',
        title: 'Nova funcionalidade!',
        message: 'Agora pode organizar as suas notas em pastas coloridas.',
        time: 'Ontem',
        isRead: true,
        icon: 'rocket-outline',
        color: '#22C55E'
    },
    {
        id: '4',
        type: 'reminder',
        title: 'Complete o seu streak',
        message: 'Faltam apenas 2 dias para atingir a sua meta semanal!',
        time: '2 dias atrás',
        isRead: true,
        icon: 'flame-outline',
        color: '#EF4444'
    }
];

const NotificationItem = ({ item, index, isDark }: any) => {
    return (
        <Animated.View 
            entering={FadeInDown.delay(index * 100).springify()}
            className="mb-3"
        >
            <TouchableOpacity 
                activeOpacity={0.7}
                className={`flex-row items-center p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white'}`}
                style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 } : {}}
            >
                {/* Icon Container */}
                <View 
                    className="w-12 h-12 rounded-xl items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                >
                    <Icon name={item.icon} size={24} color={item.color} />
                </View>

                {/* Text Content */}
                <View className="flex-1 ml-4 mr-2">
                    <View className="flex-row justify-between items-start">
                        <Text 
                            className={`font-nunitoBold text-[15px] ${isDark ? 'text-white' : 'text-slate-900'}`}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>
                        {!item.isRead && (
                            <View className="w-2 h-2 rounded-full bg-[#3088f9] mt-1.5" />
                        )}
                    </View>
                    <Text 
                        className={`font-nunitoRegular text-[13px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                        numberOfLines={2}
                    >
                        {item.message}
                    </Text>
                    <Text className="font-nunitoRegular text-[11px] text-slate-400 mt-2">
                        {item.time}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function Notifications() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const todayNotifications = MOCK_NOTIFICATIONS.filter(n => n.time.includes(':'));
    const earlierNotifications = MOCK_NOTIFICATIONS.filter(n => !n.time.includes(':'));

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

                <TouchableOpacity 
                    activeOpacity={0.7}
                    className={`w-11 h-11 items-center justify-center rounded-full ${isDark ? 'bg-white/10' : 'bg-white'}`}
                    style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 } : {}}
                >
                    <Icon name="checkmark-done" size={22} color={isDark ? '#9CA3AF' : '#64748B'} />
                </TouchableOpacity>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 }}
            >
                {/* Section Today */}
                {todayNotifications.length > 0 && (
                    <View className="mb-8">
                        <Text className={`font-nunitoBold text-[14px] mb-4 ${isDark ? 'text-slate-400' : 'text-slate-400'} uppercase tracing-widest`}>
                            Hoje
                        </Text>
                        {todayNotifications.map((n, i) => (
                            <NotificationItem key={n.id} item={n} index={i} isDark={isDark} />
                        ))}
                    </View>
                )}

                {/* Section Earlier */}
                {earlierNotifications.length > 0 && (
                    <View>
                        <Text className={`font-nunitoBold text-[14px] mb-4 ${isDark ? 'text-slate-400' : 'text-slate-400'} uppercase tracing-widest`}>
                            Anteriores
                        </Text>
                        {earlierNotifications.map((n, i) => (
                            <NotificationItem key={n.id} item={n} index={i + todayNotifications.length} isDark={isDark} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}