import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function EditorPage() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef(null);
    
    // Animação para o bottom do FAB
    const fabBottom = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            (e) => {
                Animated.spring(fabBottom, {
                    toValue: e.endCoordinates.height + 20,
                    useNativeDriver: false, // bottom não suporta native driver
                    friction: 8,
                    tension: 40
                }).start();
            }
        );
        const hideSubscription = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            () => {
                Animated.spring(fabBottom, {
                    toValue: 40,
                    useNativeDriver: false,
                    friction: 8,
                    tension: 40
                }).start();
            }
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const toggleMode = () => {
        if (!isEditing) {
            setTimeout(() => titleRef.current?.focus(), 100);
        }
        setIsEditing(!isEditing);
    };

    return (
        <SafeAreaView 
            edges={['top']}
            className="flex-1" 
            style={{ backgroundColor: isDark ? '#121212' : '#FDFCF9' }}
        >
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
            
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity 
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <Icon name="chevron-back" size={28} color={isDark ? '#FFF' : '#1a1a1a'} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}>
                    <Icon name="leaf-outline" size={24} color={isDark ? '#FFF' : '#1a1a1a'} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16} // Garante suavidade extrema
                    keyboardShouldPersistTaps="handled" // Melhora a interação com inputs
                    contentContainerStyle={{
                        paddingHorizontal: 32,
                        paddingTop: 8,
                        paddingBottom: 250 // Espaço generoso no fundo para o FAB
                    }}
                >
                    <TextInput
                        ref={titleRef}
                        multiline
                        scrollEnabled={false} // Desativa o scroll interno do input
                        editable={isEditing}
                        placeholder="Título da página..."
                        placeholderTextColor={isDark ? '#4B5563' : '#9CA3AF'}
                        value={title}
                        onChangeText={setTitle}
                        selectionColor="#3088f9"
                        className={`text-[28px] font-semibold leading-tight mb-8 ${isEditing ? (isDark ? 'text-white' : 'text-[#1a1a1a]') : (isDark ? 'text-white/90' : 'text-[#333]')}`}
                        style={{ textAlignVertical: 'top' }}
                    />

                    <TextInput
                        multiline
                        scrollEnabled={false} // Desativa o scroll interno do input (Crucial aqui!)
                        editable={isEditing}
                        placeholder="Seus pensamentos..."
                        placeholderTextColor={isDark ? '#4B5563' : '#9CA3AF'}
                        value={content}
                        onChangeText={setContent}
                        selectionColor="#3088f9"
                        selectTextOnFocus={!isEditing}
                        className={`text-[20px] leading-relaxed min-h-[400px] ${isEditing ? (isDark ? 'text-white/80' : 'text-[#4a4a4a]') : (isDark ? 'text-white/70' : 'text-[#666]')}`}
                        style={{ textAlignVertical: 'top' }}
                    />
                </ScrollView>

                {/* FAB com posição dinâmica e animada */}
                <Animated.View 
                    style={{ position: 'absolute', bottom: fabBottom, right: 32 }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={toggleMode}
                        className={`w-16 h-16 rounded-full items-center justify-center shadow-lg ${isEditing ? 'bg-[#3088f9]' : (isDark ? 'bg-white/10' : 'bg-white')}`}
                        style={{
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: isDark ? 0.3 : 0.1,
                            shadowRadius: 6,
                        }}
                    >
                        <Icon 
                            name={isEditing ? "checkmark" : "pencil"} 
                            size={26} 
                            color={isEditing ? "#FFFFFF" : "#3088f9"} 
                        />
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}