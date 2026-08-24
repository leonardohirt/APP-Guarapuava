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
              style={styles.settingsButton}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 18 }}>⚙️</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HERO SECTION */}
        <MotiView 
          from={{ opacity: 0, translateY: -16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 600, type: 'timing' }}
          style={styles.heroCard}
        >
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>GUARAPUAVA • TERRA DO LOBO BRAVO</Text>
          </View>
          
          <Text style={styles.heroTitle}>Guará-App</Text>
          <Text style={styles.heroSubtitleTag}>Hino, Memória & Tradição</Text>
          
          <Text style={styles.heroDescription}>
            Explore as origens, os monumentos, as lendas urbanas e teste seus conhecimentos sobre a nossa terra.
          </Text>

          {/* BOTÕES DE AÇÃO RÁPIDA */}
          <View style={styles.actionGroup}>
            <TouchableOpacity 
              style={styles.primaryActionButton} 
              activeOpacity={0.85}
              onPress={() => handleNavigate("/hino")}
            >
              <Text style={styles.primaryActionText}>▶  OUVIR O HINO</Text>
            </TouchableOpacity>

            <View style={styles.secondaryActionRow}>
              <TouchableOpacity 
                style={styles.secondaryActionButton} 
                activeOpacity={0.85}
                onPress={() => handleNavigate("/quiz")}
              >
                <Text style={styles.secondaryActionText}>🏆 JOGAR QUIZ</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.tertiaryActionButton} 
                activeOpacity={0.85}
                onPress={() => handleNavigate("/historia")}
              >
                <Text style={styles.tertiaryActionText}>📜 HISTÓRIA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </MotiView>

        {/* SEÇÃO EXPLORAR */}
        <MotiView 
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 150, duration: 600, type: 'timing' }}
          style={styles.exploreSection}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>EXPLORAR CONTEÚDO</Text>
            <View style={styles.sectionLine} />
          </View>

          {/* 1. CARD LETRA DO HINO */}
          <TouchableOpacity 
            style={styles.navCard} 
            activeOpacity={0.8}
            onPress={() => handleNavigate("/hino")}
          >
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>🎵</Text>
            </View>
            <View style={styles.navCardBody}>
              <Text style={styles.navCardTitle}>Letra do Hino</Text>
              <Text style={styles.navCardDesc}>Versos de Gilda Todeschini e melodia de Luiz Zilli.</Text>
            </View>
            <View style={styles.navArrowCircle}>
              <Text style={styles.navArrow}>→</Text>
            </View>
          </TouchableOpacity>

          {/* 2. CARD FOTOS HISTÓRICAS */}
          <TouchableOpacity 
            style={styles.navCard} 
            activeOpacity={0.8}
            onPress={() => handleNavigate("/fotos")}
          >
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>📸</Text>
            </View>
            <View style={styles.navCardBody}>
              <Text style={styles.navCardTitle}>Ontem e Hoje</Text>
              <Text style={styles.navCardDesc}>Compare a evolução histórica dos principais pontos.</Text>
            </View>
            <View style={styles.navArrowCircle}>
              <Text style={styles.navArrow}>→</Text>
            </View>
          </TouchableOpacity>

          {/* 3. CARD CURIOSIDADES */}
          <TouchableOpacity 
            style={styles.navCard} 
            activeOpacity={0.8}
            onPress={() => handleNavigate("/curiosidades")}
          >
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>💡</Text>
            </View>
            <View style={styles.navCardBody}>
              <Text style={styles.navCardTitle}>Você Sabia?</Text>
              <Text style={styles.navCardDesc}>10 fatos fascinantes sobre a Menina Radiante.</Text>
            </View>
            <View style={styles.navArrowCircle}>
              <Text style={styles.navArrow}>→</Text>
            </View>
          </TouchableOpacity>

          {/* 4. CARD LENDAS */}
          <TouchableOpacity 
            style={styles.navCard} 
            activeOpacity={0.8}
            onPress={() => handleNavigate("/lendas")}
          >
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>🐉</Text>
            </View>
            <View style={styles.navCardBody}>
              <Text style={styles.navCardTitle}>Mitos e Lendas</Text>
              <Text style={styles.navCardDesc}>Contos misteriosos e o imaginário popular.</Text>
            </View>
            <View style={styles.navArrowCircle}>
              <Text style={styles.navArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </MotiView>

        {/* FOOTER */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Guará-App • Orgulho de pertencer à nossa terra</Text>
        </View>
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
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  settingsButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  heroCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    marginBottom: 26,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.goldLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 14,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gold,
    marginRight: 8,
  },
  badgeText: {
    color: colors.goldBright,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  heroSubtitleTag: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gold,
    marginTop: 2,
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 21,
    marginBottom: 20,
  },
  actionGroup: {
    gap: 10,
  },
  primaryActionButton: {
    backgroundColor: colors.gold,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    color: colors.textDark,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  secondaryActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryActionButton: {
    flex: 1,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  secondaryActionText: {
    color: colors.goldBright,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  tertiaryActionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  tertiaryActionText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  exploreSection: {
    marginTop: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    color: colors.textSubtle,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
  },
  navCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  navIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(245, 158, 11, 0.09)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  navIcon: {
    fontSize: 20,
  },
  navCardBody: {
    flex: 1,
  },
  navCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  navCardDesc: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
  navArrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  navArrow: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textSubtle,
    fontSize: 11,
    fontStyle: 'italic',
  },
});