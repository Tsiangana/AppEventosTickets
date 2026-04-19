import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView 
            className="flex-1"
            style={{ backgroundColor: isDark ? '#121212' : '#F9FBFF' }}
        >
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 30, paddingBottom: 40 }}
                >
                    {/* Back Button */}
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="mt-8"
                    >
                        <Icon name="chevron-back" size={28} color={isDark ? '#FFF' : '#1a1a1a'} />
                    </TouchableOpacity>
                    {/* Welcome Header */}
                    <View className="mt-8 mb-12">
                        <Text className={`font-nunitoBold text-[34px] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Bem-vindo de volta
                        </Text>
                        <Text className={`font-nunitoRegular text-[16px] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Sentimos a sua falta. Vamos escrever?
                        </Text>
                    </View>

                    {/* Form Fields */}
                    <View>
                        <View className="mb-5">
                            <Text className={`font-nunitoBold text-[14px] mb-2 ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Email
                            </Text>
                            <View 
                                className={`flex-row items-center px-4 h-14 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100'}`}
                                style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 } : {}}
                            >
                                <Icon name="mail-outline" size={20} color={isDark ? '#4B5563' : '#94A3B8'} />
                                <TextInput 
                                    value={email}
                                    onChangeText={setEmail}
                                    className={`flex-1 ml-3 font-nunitoRegular text-[16px] ${isDark ? 'text-white' : 'text-slate-900'}`}
                                    placeholder="exemplo@email.com"
                                    placeholderTextColor={isDark ? '#4B5563' : '#94A3B8'}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View className="mb-2">
                            <Text className={`font-nunitoBold text-[14px] mb-2 ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Palavra-passe
                            </Text>
                            <View 
                                className={`flex-row items-center px-4 h-14 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-100'}`}
                                style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 } : {}}
                            >
                                <Icon name="lock-closed-outline" size={20} color={isDark ? '#4B5563' : '#94A3B8'} />
                                <TextInput 
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    className={`flex-1 ml-3 font-nunitoRegular text-[16px] ${isDark ? 'text-white' : 'text-slate-900'}`}
                                    placeholder="••••••••"
                                    placeholderTextColor={isDark ? '#4B5563' : '#94A3B8'}
                                />
                                <TouchableOpacity>
                                    <Icon name="eye-outline" size={20} color={isDark ? '#4B5563' : '#94A3B8'} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity className="items-end py-3 mb-6">
                            <Text className="font-nunitoBold text-[#3088f9] text-[14px]">Esqueceu a senha?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity 
                            activeOpacity={0.8}
                            className="h-15 rounded-2xl overflow-hidden items-center justify-center"
                            onPress={() => router.replace('/')}
                        >
                            <LinearGradient
                                colors={['#646cff', '#61dafb']}
                                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                            <View className="flex-row items-center p-4">
                                <Text className="font-nunitoBold text-white text-[17px] mr-2">Entrar</Text>
                                <Icon name="arrow-forward" size={20} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View className="mt-auto items-center pt-10">
                        <View className="flex-row">
                            <Text className={`font-nunitoRegular ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Não tem uma conta?</Text>
                            <TouchableOpacity onPress={() => router.push('/pages/entrar/signup')}>
                                <Text className="font-nunitoBold text-[#3088f9] ml-1">Criar agora</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-center font-nunitoRegular text-[12px] text-slate-400/80 leading-relaxed mt-6">
                            Ao entrar, você concorda com os nossos{"\n"}
                            <Text onPress={() => router.push('/pages/info/legal')} className="text-[#3088f9] underline">Termos de Serviço</Text> e <Text onPress={() => router.push('/pages/info/legal')} className="text-[#3088f9] underline">Política de Privacidade</Text>.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}