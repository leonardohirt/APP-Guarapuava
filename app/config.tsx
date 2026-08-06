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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{ 
          title: "Sobre & Configurações",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text 
        }} 
      />

      {/* HERO / LOGO DO APP */}
      <MotiView 
        from={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 800 }}
        style={styles.hero}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require("../assets/images/icon.png")} 
            style={styles.logo}
          />
        </View>
        <Text style={styles.appName}>Guará-App</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionBadgeText}>VERSÃO {version}</Text>
        </View>
        <Text style={styles.appSubtitle}>
          Aplicativo de valorização do hino, história, lendas e patrimônio cultural de Guarapuava - PR.
        </Text>
      </MotiView>

      {/* SEÇÃO DESENVOLVEDOR */}
      <MotiView 
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200, duration: 600 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>👨‍💻 DESENVOLVIMENTO</Text>
        <View style={styles.card}>
          <View style={styles.devRow}>
            <View style={styles.avatarBadge}>
              <Text style={{ fontSize: 24 }}>🌲</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Criado e desenvolvido por:</Text>
              <Text style={styles.devName}>{devName}</Text>
            </View>
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              activeOpacity={0.8}
              onPress={() => abrirLink('https://github.com/leonardohirt')}
            >
              <Text style={styles.primaryButtonText}>🌐 GitHub do Autor</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              activeOpacity={0.8}
              onPress={() => abrirLink('https://github.com/leonardohirt/APP-Guarapuava')}
            >
              <Text style={styles.secondaryButtonText}>📦 Código-Fonte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MotiView>

      {/* SEÇÃO AUTORIA DO HINO E CRÉDITOS */}
      <MotiView 
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 350, duration: 600 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>📜 CRÉDITOS & FONTES HISTÓRICAS</Text>
        <View style={styles.card}>
          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>✍️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Letra do Hino Municipal</Text>
              <Text style={styles.creditValue}>Gilda Boscardim Todeschini</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>🎵</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Melodia e Partitura Original</Text>
              <Text style={styles.creditValue}>Luiz Eulógio Zilli</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.creditItem}>
            <Text style={styles.creditIcon}>🏛️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.creditLabel}>Acervo & Pesquisa Histórica</Text>
              <Text style={styles.creditValue}>Museu Visconde de Guarapuava & Nivaldo Krüger</Text>
            </View>
          </View>
        </View>
      </MotiView>

      {/* RECURSOS TÉCNICOS */}
      <MotiView 
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500, duration: 600 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>⚡ RECURSOS DO APLICATIVO</Text>
        <View style={styles.card}>
          <Text style={styles.techText}>• Narração interativa em voz alta (`expo-speech`)</Text>
          <Text style={styles.techText}>• Resposta tátil ao toque (`expo-haptics`)</Text>
          <Text style={styles.techText}>• Salvamento local da melhor pontuação no Quiz</Text>
          <Text style={styles.techText}>• Comparativo interativo de fotos (Ontem & Hoje)</Text>
        </View>
      </MotiView>

      <Text style={styles.copy}>
        © 2026 Guará-App • Guarapuava - PR{"\n"}
        Todos os direitos reservados.
      </Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    paddingHorizontal: 20 
  },
  hero: { 
    alignItems: 'center', 
    marginVertical: 25 
  },
  logoContainer: {
    borderRadius: 22,
    padding: 3,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderWidth: 1,
    borderColor: colors.gold,
    marginBottom: 14,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  logo: { 
    width: 86, 
    height: 86, 
    borderRadius: 18 
  },
  appName: { 
    color: colors.gold, 
    fontSize: 28, 
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  versionBadge: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gold,
    marginTop: 8,
    marginBottom: 12,
  },
  versionBadgeText: { 
    color: colors.gold, 
    fontSize: 11, 
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  appSubtitle: { 
    color: colors.textMuted, 
    textAlign: 'center', 
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  section: { 
    marginBottom: 20 
  },
  sectionTitle: { 
    color: colors.gold, 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    letterSpacing: 1.2 
  },
  card: { 
    backgroundColor: 'rgba(255, 255, 255, 0.07)', 
    borderRadius: 18, 
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.22)',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  devRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  label: { 
    color: colors.textSubtle, 
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  devName: { 
    color: colors.text, 
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 2,
  },
  linksContainer: {
    gap: 10,
  },
  primaryButton: { 
    backgroundColor: colors.gold, 
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12, 
    alignItems: 'center',
  },
  primaryButtonText: { 
    color: colors.background, 
    fontWeight: 'bold', 
    fontSize: 14,
  },
  secondaryButton: { 
    backgroundColor: 'rgba(255, 215, 0, 0.12)', 
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  secondaryButtonText: { 
    color: colors.gold, 
    fontWeight: 'bold', 
    fontSize: 14,
  },
  creditItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  creditIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  creditLabel: {
    color: colors.textSubtle,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  creditValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    marginVertical: 12,
  },
  techText: { 
    color: colors.textMuted, 
    fontSize: 13, 
    lineHeight: 22,
  },
  copy: { 
    textAlign: 'center', 
    color: colors.textSubtle, 
    fontSize: 12, 
    marginTop: 20, 
    marginBottom: 10,
    lineHeight: 18,
  }
});