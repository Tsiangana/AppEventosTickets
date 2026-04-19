import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

export default function AccountSettings() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const [name, setName] = useState("Alex Silva");
    const [email, setEmail] = useState("alex.silva@meudiario.com");
    const [password, setPassword] = useState("********");

    const InputField = ({ label, value, onChange, icon, index, isPassword = false }: any) => (
        <Animated.View 
            entering={FadeInDown.delay(100 * index).springify()}
            className="mb-6"
        >
            <Text className={`font-nunitoBold text-[14px] mb-2 ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {label}
            </Text>
            <View 
                className={`flex-row items-center px-4 h-14 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100'}`}
                style={!isDark ? { elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 5 } : {}}
            >
                <Icon name={icon} size={20} color={isDark ? '#4B5563' : '#94A3B8'} />
                <TextInput 
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isPassword}
                    className={`flex-1 ml-3 font-nunitoRegular text-[16px] ${isDark ? 'text-white' : 'text-slate-900'}`}
                    placeholderTextColor={isDark ? '#4B5563' : '#94A3B8'}
                />
            </View>
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
                    Editar Perfil
                </Text>

                <View className="w-11" />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
            >
                <View className="mb-2">
                    <InputField label="Nome Completo" value={name} onChange={setName} icon="person-outline" index={0} />
                    <InputField label="Endereço de Email" value={email} onChange={setEmail} icon="mail-outline" index={1} />
                    <InputField label="Nova Palavra-passe" value={password} onChange={setPassword} icon="lock-closed-outline" index={2} isPassword={true} />
                </View>

                <Animated.View entering={FadeInDown.delay(400).springify()}>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        className="h-14 rounded-2xl overflow-hidden items-center justify-center mt-4"
                        onPress={() => router.back()}
                    >
                        <LinearGradient
                            colors={['#646cff', '#61dafb']}
                            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                        <Text className="font-nunitoBold text-white text-[16px]">Guardar Alterações</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        className="items-center py-4 mt-2"
                        onPress={() => router.back()}
                    >
                        <Text className="font-nunitoRegular text-slate-400 text-[14px]">Cancelar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}
