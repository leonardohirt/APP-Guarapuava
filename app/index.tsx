import * as Haptics from "expo-haptics";
import { Link, Stack, useRouter } from 'expo-router';
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
              <Text style={{ fontSize: 20 }}>⚙️</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* SEÇÃO HERO */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>GUARAPUAVA - PR</Text>
          </View>
          <Text style={styles.title}>Guará-App{"\n"}Hino & Cultura</Text>
          <Text style={styles.subtitle}>
            Explore a história, o hino, as lendas e teste seus conhecimentos sobre a nossa terra.
          </Text>

          {/* BOTÕES DE AÇÃO PRINCIPAIS */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              activeOpacity={0.8}
              onPress={() => handleNavigate("/hino")}
            >
              <Text style={styles.primaryButtonText}>▶  OUVIR HINO</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quizButton} 
              activeOpacity={0.8}
              onPress={() => handleNavigate("/quiz")}
            >
              <Text style={styles.quizButtonText}>🏆 JOGAR QUIZ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.historyButton} 
              activeOpacity={0.8}
              onPress={() => handleNavigate("/historia")}
            >
              <Text style={styles.historyButtonText}>📜 HISTÓRIA E SÍMBOLOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEÇÃO DE NAVEGAÇÃO (CARDS) */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuLabel}>EXPLORE MAIS</Text>

          {/* 1. CARD LETRA */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => handleNavigate("/hino")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Letra do Hino</Text>
              <Text style={styles.cardText}>Acompanhe os versos de Gilda Todeschini.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 2. CARD FOTOS HISTÓRICAS */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => handleNavigate("/fotos")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Ontem e Hoje</Text>
              <Text style={styles.cardText}>Veja a evolução de Guarapuava através de fotos.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 3. CARD CURIOSIDADES */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => handleNavigate("/curiosidades")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Você Sabia?</Text>
              <Text style={styles.cardText}>Fatos fascinantes sobre nossa terra.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 4. CARD LENDAS */}
          <TouchableOpacity 
            style={[styles.card, { borderColor: 'rgba(155, 89, 182, 0.4)', borderWidth: 1 }]} 
            activeOpacity={0.7}
            onPress={() => handleNavigate("/lendas")}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: '#9b59b6' }]}>Mistérios e Lendas</Text>
              <Text style={styles.cardText}>As histórias que o povo conta através das gerações.</Text>
            </View>
            <Text style={[styles.cardArrow, { color: '#9b59b6' }]}>→</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Orgulho de ser Guarapuavano</Text>
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
    paddingTop: 40,
  },
  hero: {
    marginBottom: 40,
  },
  badge: {
    backgroundColor: colors.goldLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  badgeText: {
    color: colors.gold,
    fontSize: 12,
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
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 16,
    lineHeight: 24,
  },
  actionContainer: {
    marginTop: 30,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.background,
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1,
  },
  quizButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
  },
  quizButtonText: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  historyButton: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.cardGlass,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.gold,
  },
  cardText: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },
  cardArrow: {
    color: colors.gold,
    fontSize: 20,
    marginLeft: 10,
  },
  footerText: {
    textAlign: 'center',
    color: colors.textSubtle,
    fontSize: 12,
    marginTop: 30,
    marginBottom: 10,
    fontStyle: 'italic'
  }
});