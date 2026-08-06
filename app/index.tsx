import * as Haptics from "expo-haptics";
import { Stack, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';

export default function Home() {
  const router = useRouter(); 

  const handleNavigate = (path: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Guará-App",
          headerShown: true, 
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => handleNavigate("/config")} 
              style={{ marginRight: 15 }}
            >
              <Text style={{ fontSize: 22 }}>⚙️</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* SEÇÃO HERO COM ANIMAÇÃO */}
        <MotiView 
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 700, type: 'timing' }}
          style={styles.hero}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>GUARAPUAVA - PR 🌲</Text>
          </View>
          <Text style={styles.title}>Guará-App{"\n"}Hino & Cultura</Text>
          <Text style={styles.subtitle}>
            Explore a história, o hino, as lendas e teste seus conhecimentos sobre a Terra do Lobo Bravo.
          </Text>

          {/* BOTÕES DE AÇÃO PRINCIPAIS */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              activeOpacity={0.85}
              onPress={() => handleNavigate("/hino")}
            >
              <Text style={styles.primaryButtonText}>▶  OUVIR HINO</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quizButton} 
              activeOpacity={0.85}
              onPress={() => handleNavigate("/quiz")}
            >
              <Text style={styles.quizButtonText}>🏆 JOGAR QUIZ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.historyButton} 
              activeOpacity={0.85}
              onPress={() => handleNavigate("/historia")}
            >
              <Text style={styles.historyButtonText}>📜 HISTÓRIA E SÍMBOLOS</Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* SEÇÃO DE NAVEGAÇÃO (CARDS COM GLASSMORPHISM) */}
        <MotiView 
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, duration: 700, type: 'timing' }}
          style={styles.menuContainer}
        >
          <Text style={styles.menuLabel}>EXPLORE MAIS</Text>

          {/* 1. CARD LETRA DO HINO */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.75}
            onPress={() => handleNavigate("/hino")}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🎵</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Letra do Hino</Text>
              <Text style={styles.cardText}>Acompanhe os versos de Gilda Todeschini.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 2. CARD FOTOS HISTÓRICAS */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.75}
            onPress={() => handleNavigate("/fotos")}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📸</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Ontem e Hoje</Text>
              <Text style={styles.cardText}>Veja a evolução de Guarapuava através de fotos.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 3. CARD CURIOSIDADES */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.75}
            onPress={() => handleNavigate("/curiosidades")}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>💡</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Você Sabia?</Text>
              <Text style={styles.cardText}>Fatos fascinantes sobre nossa terra.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 4. CARD LENDAS */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.75}
            onPress={() => handleNavigate("/lendas")}
          >
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🐉</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Mistérios e Lendas</Text>
              <Text style={styles.cardText}>As histórias que o povo conta através das gerações.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>
        </MotiView>

        <Text style={styles.footerText}>Orgulho de ser Guarapuavano • 2026</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 20,
  },
  hero: {
    marginBottom: 35,
  },
  badge: {
    backgroundColor: colors.goldLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gold,
    marginBottom: 16,
  },
  badgeText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 14,
    lineHeight: 23,
  },
  actionContainer: {
    marginTop: 26,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: colors.background,
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1,
  },
  quizButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.gold,
  },
  quizButtonText: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  historyButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuLabel: {
    color: colors.textSubtle,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gold,
  },
  cardText: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  cardArrow: {
    color: colors.gold,
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: colors.textSubtle,
    fontSize: 11,
    marginTop: 30,
    marginBottom: 10,
    fontStyle: 'italic'
  }
});