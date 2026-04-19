import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const GAP = 12;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - GAP) / 2;

const MOCK_DATA = [
  { id: '1', title: 'Notas', pages: '27 páginas', icon: 'journal', color: '#3088f9', color1: '#4DA1FF', color2: '#3088f9'},
  { id: '2', title: 'Ideias', pages: '2 páginas', icon: 'bulb', color: '#27B993', color1: '#4ade80', color2: '#27B993'},
  { id: '3', title: 'Viagem', pages: '5 páginas', icon: 'airplane', color: '#f59e0b', color1: '#fbbf24', color2: '#f59e0b'},
  { id: '4', title: 'Trabalho', pages: '1 páginas', icon: 'briefcase', color: '#8b5cf6', color1: '#a78bfa', color2: '#8b5cf6'},
  { id: '5', title: 'Saúde', pages: 'sem páginas', icon: 'heart', color: '#ef4444', color1: '#f87171', color2: '#ef4444'},
  { id: '6', title: 'Dinheiro', pages: '6 páginas', icon: 'wallet', color: '#10b981', color1: '#34d399', color2: '#10b981'},
  { id: '7', title: 'Música', pages: '100 páginas', icon: 'musical-notes', color: '#ec4899', color1: '#f472b6', color2: '#db2777'},
  { id: '8', title: 'Default', pages: '3 páginas', icon: 'heart', iconBgColor: '#f63b3bff' },
];

const Header = ({ isDark, router, userAvatar }: { isDark: boolean; router: any; userAvatar: string }) => (
  <View className='flex-row items-center justify-between mb-6'>
    <Text 
      style={{ color: isDark ? '#fff' : '#111827' }}
      className="font-nunitoBold text-[32px] tracking-tight">
        Diários
    </Text>

    <View className="flex-row items-center space-x-3 gap-3">
      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => router.push("/pages/notifications")}
        className={`w-11 h-11 items-center justify-center rounded-full ${isDark ? 'bg-white/10' : 'bg-white'}`}
        style={!isDark ? { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 } : {}}
      >
        <Icon 
          name="notifications-outline" 
          size={24} 
          color={isDark ? '#fff' : '#111827'} 
        />
        <View className={`absolute top-2.5 right-2.5 w-3 h-3 bg-red-500 rounded-full border-2 ${isDark ? 'border-[#121212]' : 'border-white'}`} />
      </TouchableOpacity>

      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => router.push("/pages/profile")}
        className="w-12 h-12 rounded-full overflow-hidden"
      >
        <Image
          source={userAvatar}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={200}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const CardItem = ({ item, isDark }: { item: any; isDark: boolean }) => {
  const hasColor = !!item.color;
  const router = useRouter();

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      className="mb-4 rounded-[22px] overflow-hidden" // overflow-hidden é essencial!
      onPress={() => router.push("/pages/diary")}
      style={{ 
        width: CARD_WIDTH,
        height: 200,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0 : 0.15,
        shadowRadius: 12,
      }}
    >
      <LinearGradient
        colors={hasColor ? [item.color1, item.color2,] : (isDark ? ['#1F2937', '#111827'] : ['#FFFFFF', '#F3F4F6'])}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View 
        className="absolute w-[300px] h-[300px] rounded-full bg-white/10" 
        style={{ top: -100, right: -50 }} 
      />
      <View 
        className="absolute w-[250px] h-[250px] rounded-full bg-white/5" 
        style={{ bottom: -80, left: -40 }} 
      />

      <View className="flex-1 p-4 justify-between">
        <View className="w-11 h-11 rounded-[12px] items-center justify-center">
          <Icon 
            name={item.icon} 
            size={26} 
            style={{ color: hasColor ? '#FFFFFF' : (isDark ? '#F3F4F6' : '#111827') }}
          />
        </View>
        
        <View>
          <Text 
            className="font-nunitoBold text-[18px] mb-1"
            style={{ color: hasColor ? '#FFFFFF' : (isDark ? '#F3F4F6' : '#111827') }}
          >
            {item.title}
          </Text>
          <Text 
            className="font-nunitoRegular text-[12px]"
            style={{ color: hasColor ? '#FFFFFF' : (isDark ? '#F3F4F6' : '#111827') }}
          >
            {item.pages}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Cards() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const userAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop";

  return (
    <View className="flex-1">
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: HORIZONTAL_PADDING }}
        ListHeaderComponent={<View style={{ paddingHorizontal: HORIZONTAL_PADDING }}><Header isDark={isDark} router={router} userAvatar={userAvatar} /></View>}
        renderItem={({ item }) => <CardItem item={item} isDark={isDark} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        className="absolute bottom-16 right-12 w-16 h-16 rounded-full overflow-hidden items-center justify-center"
        style={{
          elevation: 8,
          shadowColor: '#3088f9',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
        onPress={() => {/* Add functionality here */}}
      >
        <LinearGradient
          colors={['#646cffaa', '#61dafbaa']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Icon name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
}