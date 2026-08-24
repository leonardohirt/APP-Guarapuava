import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { MotiView } from "moti";
import React from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/colors";

export default function Config() {
  const version = "1.2.0"; 
  const devName = "Leonardo Hirt Moraes"; 

  const abrirLink = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen 
        options={{ 
          title: "Sobre o Aplicativo", 
          headerStyle: { backgroundColor: colors.background }, 
          headerTintColor: colors.text 
        }} 
      />

      {/* HERO / APP IDENTITY */}
      <MotiView 
        from={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 700 }}
        style={styles.heroCard}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require("../assets/images/icon.png")} 
            style={styles.logo}
          />
        </View>
        <Text style={styles.appName}>Guará-App</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionBadgeText}>VERSÃO {version} • PRODUÇÃO</Text>
        </View>
        <Text style={styles.appSubtitle}>
          Plataforma de preservação e difusão do hino, história oficial, lendas e patrimônio de Guarapuava - PR.
        </Text>
      </MotiView>

      {/* SEÇÃO DESENVOLVEDOR */}
      <MotiView 
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 150, duration: 500 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>DESENVOLVIMENTO</Text>
        <View style={styles.card}>
          <View style={styles.devRow}>
            <View style={styles.avatarBadge}>
              <Text style={{ fontSize: 22 }}>🌲</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.devLabel}>Criado e desenvolvido por:</Text>
              <Text style={styles.devName}>{devName}</Text>
            </View>
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              activeOpacity={0.85}
              onPress={() => abrirLink('https://github.com/leonardohirt')}
            >
              <Text style={styles.primaryButtonText}>🌐 Perfil no GitHub</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              activeOpacity={0.85}
              onPress={() => abrirLink('https://github.com/leonardohirt/APP-Guarapuava')}
            >
              <Text style={styles.secondaryButtonText}>📦 Repositório do Projeto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MotiView>

      {/* SEÇÃO AUTORIA DO HINO E CRÉDITOS */}
      <MotiView 
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 250, duration: 500 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>CRÉDITOS HISTÓRICOS & AUTORIA</Text>
        <View style={styles.card}>
          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>✍️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Letra do Hino Municipal</Text>
              <Text style={styles.creditValue}>Gilda Boscardim Todeschini</Text>
            </View>
          </View>

          <View style={styles.creditDivider} />

          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>🎼</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Música do Hino Municipal</Text>
              <Text style={styles.creditValue}>Luiz Eulógio Zilli</Text>
            </View>
          </View>

          <View style={styles.creditDivider} />

          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>🏛️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Acervo e Partitura Histórica</Text>
              <Text style={styles.creditValue}>Museu Municipal Visconde de Guarapuava</Text>
            </View>
          </View>

          <View style={styles.creditDivider} />

          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>📖</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Pesquisa & Biografias Históricas</Text>
              <Text style={styles.creditValue}>ALAC (Academia de Letras, Artes e Ciências)</Text>
            </View>
          </View>
        </View>
      </MotiView>

      {/* SEÇÃO CARACTERÍSTICAS TÉCNICAS */}
      <MotiView 
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 350, duration: 500 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>ESPECIFICAÇÕES DO SISTEMA</Text>
        <View style={styles.card}>
          <View style={styles.featureRow}>
            <Text style={styles.featureBullet}>⚡</Text>
            <Text style={styles.featureText}>100% Autônomo e Funcional Offline</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureBullet}>🔊</Text>
            <Text style={styles.featureText}>Síntese de Voz Nativa em Português (Expo Speech)</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureBullet}>📳</Text>
            <Text style={styles.featureText}>Respostas Táteis com Haptic Feedback</Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureBullet}>💾</Text>
            <Text style={styles.featureText}>Salvamento de Recorde Local (AsyncStorage)</Text>
          </View>
        </View>
      </MotiView>

      <Text style={styles.footer}>Guará-App • Guarapuava - Paraná • 2026</Text>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 18,
  },
  heroCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    marginBottom: 22,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 16,
  },
  appName: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  versionBadge: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginTop: 6,
    marginBottom: 12,
  },
  versionBadgeText: {
    color: colors.goldBright,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 19,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  devRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatarBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  devLabel: {
    fontSize: 11,
    color: colors.textSubtle,
    fontWeight: '600',
  },
  devName: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    marginTop: 2,
  },
  linksContainer: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: colors.gold,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  primaryButtonText: {
    color: colors.textDark,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
  },
  creditItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  creditIcon: {
    fontSize: 20,
  },
  creditLabel: {
    fontSize: 11,
    color: colors.textSubtle,
  },
  creditValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.goldChampagne,
    marginTop: 2,
  },
  creditDivider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginVertical: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  featureBullet: {
    fontSize: 16,
  },
  featureText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    color: colors.textSubtle,
    fontSize: 11,
    marginTop: 10,
    fontStyle: 'italic',
  },
});