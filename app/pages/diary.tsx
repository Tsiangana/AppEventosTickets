import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const COLUMN_GAP = 12;
const PADDING = 20;
const CARD_WIDTH = (width - (PADDING * 2) - COLUMN_GAP) / 2;

const FOLDERS = [
  { id: '1', title: 'Daily Collection', count: 12, color: '#5836FF', icon: 'folder' },
  { id: '2', title: 'Learning File', count: 8, color: '#FFB347', icon: 'book' },
  { id: '3', title: 'Photos', count: 45, color: '#A5A6B2', icon: 'images' },
  { id: '4', title: 'Project Work', count: 5, color: '#3088f9', icon: 'briefcase' },
];

const MOCK_PAGES = [
  { id: '1', title: 'Design Sprint', date: '12 Fev', content: 'Exploração de cores e gradientes...', color: '#5836FF' },
  { id: '2', title: 'Meeting Notes', date: '11 Fev', content: 'Debate sobre novas funcionalidades...', color: '#FFB347' },
  { id: '3', title: 'Travel Plans', date: '09 Fev', content: 'Reservar hotéis para a conferência...', color: '#3088f9' },
  { id: '4', title: 'Code Refactor', date: '08 Fev', content: 'Otimizando os hooks do Reanimated...', color: '#27B993' },
  { id: '5', title: 'UI Research', date: '07 Fev', content: 'Moodboard para a próxima versão...', color: '#646cff' },
  { id: '6', title: 'Idea Draft', date: '05 Fev', content: 'Rascunho de como as pastas devem abrir...', color: '#ef4444' },
];

const WaveEffect = () => (
  <View className="absolute inset-0 overflow-hidden pointer-events-none">
    <View className="absolute w-40 h-40 rounded-full bg-white/10 -top-10 -right-10" />
    <View className="absolute w-32 h-32 rounded-full bg-white/5 -bottom-10 -left-10" />
  </View>
);

const FolderCard = ({ item, index, onOpen, isDark }: any) => {
  return (
    <Animated.View 
        entering={FadeInDown.delay(index * 100).springify()}
        style={{ width: CARD_WIDTH, height: 160 }}
        className="mb-5"
    >
      <TouchableOpacity 
        onPress={() => onOpen(item)}
        activeOpacity={0.9}
        className="flex-1"
      >
        {/* Aba da Pasta (Tab) */}
        <View 
            className="w-16 h-4 rounded-t-xl ml-3" 
            style={{ backgroundColor: item.color, opacity: 0.85 }} 
        />
        {/* Corpo da Pasta */}
        <View 
            className="flex-1 rounded-[24px] rounded-tl-none p-5 justify-between shadow-lg overflow-hidden"
            style={{ 
                backgroundColor: item.color,
                elevation: 10,
                shadowColor: item.color,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 15,
            }}
        >
            <WaveEffect />
            <View className="w-11 h-11 rounded-2xl items-center justify-center">
            </View>
            <View>
                <Text className="text-white font-nunitoBold text-[16px] mb-0.5">{item.title}</Text>
                <Text className="text-white/70 font-nunitoRegular text-[12px]">{item.count} páginas</Text>
            </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const PageCard = ({ item, index }: any) => {
    const router = useRouter();
    return (
        <Animated.View 
        entering={FadeInDown.delay(index * 100).springify()}
        style={{ width: CARD_WIDTH, height: 185 }} 
        className="mb-4"
        >
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => router.push("/pages/page")}
            className="flex-1 bg-white rounded-[16px] border border-slate-100 p-4"
            style={{
            // Sombra muito suave (Soft UI)
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: 2,
            }}
        >
            {/* Indicador de Categoria - A cor aparece apenas aqui como um detalhe */}
            <View className="flex-row justify-between items-start mb-28">
            <View className="w-1.5 h-6 rounded-full"/>
            <Icon name="ellipsis-horizontal" size={16} color="#9CA3AF" />
            </View>

            {/* Conteúdo Textual */}
            <Text className="text-slate-400 font-nunitoRegular text-[11px]">
            {item.date}
            </Text>
            <Text 
            className="text-slate-900 font-nunitoBold text-[16px] leading-tight mb-2" 
            numberOfLines={2}
            >
            {item.title}
            </Text>
        </TouchableOpacity>
        </Animated.View>
    );
};

export default function Diary() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const router = useRouter();
    const isExpanded = useSharedValue(0);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<any>(null);

    const toggleFolder = (folder: any = null) => {
        if (!isOpen) {
            setSelectedFolder(folder);
            setIsOpen(true);
            isExpanded.value = withSpring(1, { damping: 15 });
        } else {
            isExpanded.value = withTiming(0, { duration: 200 }, () => {
              // Finish closing animation if needed
            });
            setIsOpen(false);
            setSelectedFolder(null);
        }
    };

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
                    onPress={() => isOpen ? toggleFolder() : router.back()}
                    className={`w-11 h-11 items-center justify-center rounded-full ${isDark ? 'bg-white/10' : 'bg-white'}`}
                    style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 } : {}}
                >
                    <Icon name={isOpen ? "arrow-back" : "chevron-back"} size={24} color={isDark ? '#fff' : '#111827'} />
                </TouchableOpacity>

                <View 
                  className={`flex-1 ml-4 flex-row items-center px-4 h-11 rounded-[16px] ${isDark ? 'bg-white/10' : 'bg-white'}`}
                  style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 } : {}}
                >
                  <Icon name="search-outline" size={20} color="#9CA3AF" />
                  <TextInput 
                    placeholder={isOpen ? `Pesquisar em ${selectedFolder?.title}...` : "Pesquisar arquivos..."}
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 ml-2 font-nunitoRegular text-[15px]"
                    style={{ color: isDark ? '#FFF' : '#111827' }}
                  />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                <View className="px-5 mt-4">
                    <Text className={`font-nunitoBold text-[28px] ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                        {isOpen ? selectedFolder?.title : "Meus Arquivos"}
                    </Text>
                    <Text className="font-nunitoRegular text-[14px] text-[#9CA3AF]">
                        {isOpen ? `${MOCK_PAGES.length} páginas encontradas` : "Toque em uma pasta para ver as páginas"}
                    </Text>
                </View>

                <View className="px-5 mt-6">
                    {!isOpen ? (
                        <View className="flex-row flex-wrap justify-between">
                            {FOLDERS.map((folder, index) => (
                                <FolderCard 
                                    key={folder.id} 
                                    item={folder} 
                                    index={index}
                                    onOpen={toggleFolder} 
                                    isDark={isDark}
                                />
                            ))}
                        </View>
                    ) : (
                        <Animated.View entering={FadeIn} className="flex-row flex-wrap justify-between">
                            {MOCK_PAGES.map((page, index) => (
                                <PageCard 
                                    key={page.id} 
                                    item={page} 
                                    index={index} 
                                />
                            ))}
                        </Animated.View>
                    )}
                </View>
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute bottom-24 right-8 w-16 h-16 rounded-full overflow-hidden items-center justify-center"
              style={{
                elevation: 10,
                shadowColor: '#3088f9',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
              }}
              onPress={() => {/* Add functionality here */}}
            >
              <LinearGradient
                colors={['#646cff', '#61dafb']}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <Icon name="add" size={32} color="#FFFFFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}