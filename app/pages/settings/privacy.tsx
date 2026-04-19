import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

export default function PrivacySettings() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const Section = ({ icon, title, content, index }: any) => (
        <Animated.View 
            entering={FadeInDown.delay(index * 150).springify()}
            className="mb-8"
        >
            <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 rounded-xl bg-[#22C55E15] items-center justify-center">
                    <Icon name={icon} size={20} color="#22C55E" />
                </View>
                <Text className={`font-nunitoBold text-[17px] ml-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                </Text>
            </View>
            <Text className={`font-nunitoRegular text-[14px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {content}
            </Text>
        </Animated.View>
    );

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
                    Privacidade & Segurança
                </Text>

                <View className="w-11" />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
            >
                <Section 
                    icon="shield-outline" 
                    title="Os teus dados são teus" 
                    content="Acreditamos que a tua privacidade é fundamental. Todas as entradas que escreves no teu diário são encriptadas e só tu tens acesso a elas."
                    index={0}
                />

                <Section 
                    icon="lock-closed-outline" 
                    title="Segurança Máxima" 
                    content="Utilizamos as mais recentes tecnologias de biometria e encriptação ponta-a-ponta para garantir que ninguém, além de ti, consegue abrir os teus arquivos."
                    index={1}
                />

                <Section 
                    icon="eye-off-outline" 
                    title="Nenhuma Recolha de Dados" 
                    content="O meu Diário não vende nem partilha as tuas informações com terceiros. Não recolhemos dados pessoais para fins de publicidade."
                    index={2}
                />

                <View className={`p-5 rounded-2xl ${isDark ? 'bg-[#22C55E15]' : 'bg-green-50'} border border-green-500/10`}>
                    <Text className={`font-nunitoBold text-[14px] ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                        Compromisso Tsiangana
                    </Text>
                    <Text className={`font-nunitoRegular text-[12px] mt-1 ${isDark ? 'text-green-400/80' : 'text-green-600'}`}>
                        O nosso objetivo é criar um espaço seguro para a tua mente. Podes escrever com total liberdade.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
