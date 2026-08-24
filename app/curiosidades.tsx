import { Stack } from "expo-router";
import { MotiView } from 'moti';
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const listaCuriosidades = [
  { 
    id: 1, 
    numero: "#01",
    emoji: "🐺",
    pergunta: "O que significa 'Guarapuava'?", 
    resposta: "Vem do tupi-guarani: 'Guará' (lobo-guará) e 'Puava' (bravo ou barulho que ecoa). Significa 'Lobo Bravo'.", 
    corFundo: "#0a1324" 
  },
  { 
    id: 2, 
    numero: "#02",
    emoji: "🎼",
    pergunta: "Quem escreveu o hino?", 
    resposta: "A letra é de Gilda Todeschini e a melodia de Luiz Eulógio Zilli. Uma obra cívica clássica da nossa história.", 
    corFundo: "#081d1c" 
  },
  { 
    id: 3, 
    numero: "#03",
    emoji: "🌲",
    pergunta: "O 'Pinheiro Magistral'", 
    resposta: "A Araucária angustifólia é o símbolo vegetal maior da nossa terra, representando longevidade e força cívica.", 
    corFundo: "#14141c" 
  },
  { 
    id: 4, 
    numero: "#04",
    emoji: "🏔️",
    pergunta: "Capital do 3º Planalto", 
    resposta: "Situada a 1.100 metros de altitude média, é uma das cidades de maior altitude e clima mais frio do Paraná.", 
    corFundo: "#0b182b" 
  },
  { 
    id: 5, 
    numero: "#05",
    emoji: "📜",
    pergunta: "Partitura Original", 
    resposta: "O manuscrito original da partitura do hino está salvaguardado no Museu Histórico Visconde de Guarapuava.", 
    corFundo: "#1a1506" 
  },
  { 
    id: 6, 
    numero: "#06",
    emoji: "🌾",
    pergunta: "Capital Mundial da Cevada", 
    resposta: "Guarapuava abriga a maior maltaria da América Latina (Agrária), sendo polo global na produção de cevada e malte cervejeiro.", 
    corFundo: "#1c1404" 
  },
  { 
    id: 7, 
    numero: "#07",
    emoji: "🌊",
    pergunta: "O Salto São Francisco", 
    resposta: "Com 196 metros de queda livre contínua, é a maior queda d'água do Sul do Brasil, situada na região de Guarapuava.", 
    corFundo: "#061f2d" 
  },
  { 
    id: 8, 
    numero: "#08",
    emoji: "💧",
    pergunta: "A Lagoa das Lágrimas", 
    resposta: "Antigamente denominada 'Rocio', a Lagoa é o cartão postal do centro histórico e cenário de poemas e memórias.", 
    corFundo: "#0a1f1e" 
  },
  { 
    id: 9, 
    numero: "#09",
    emoji: "🐎",
    pergunta: "Polo do Tropeirismo", 
    resposta: "Pela posição estratégica no 3º Planalto, foi parada obrigatória de tropeiros e caravanas comerciais no século XIX.", 
    corFundo: "#1a120d" 
  },
  { 
    id: 10, 
    numero: "#10",
    emoji: "✨",
    pergunta: "A Menina Radiante", 
    resposta: "Apelido poético imortalizado nos versos do hino, exaltando o brilho do sol sobre os campos dourados da cidade.", 
    corFundo: "#1c0b2b" 
  }
];

export default function Curiosidades() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{ 
          title: "Curiosidades", 
          headerStyle: { backgroundColor: colors.background }, 
          headerTintColor: colors.text 
        }} 
      />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>💡 VOCÊ SABIA?</Text>
        </View>
        <Text style={styles.headerTitle}>Fatos e Conquistas</Text>
        <Text style={styles.headerSubtitle}>
          Descubra curiosidades marcantes da história, natureza e grandiosidade de Guarapuava.
        </Text>
      </View>

      {/* FEED DE CARDS NUMERADOS */}
      <View style={styles.list}>
        {listaCuriosidades.map((item, index) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, translateY: 15 }} 
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ 
              type: 'timing', 
              duration: 400, 
              delay: index * 60 
            }}
            style={[styles.card, { backgroundColor: item.corFundo }]}
          >
            <View style={styles.cardTopRow}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberBadgeText}>{item.numero}</Text>
              </View>

              <View style={styles.iconCircle}>
                <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
              </View>
            </View>

            <Text style={styles.cardQuestion}>{item.pergunta}</Text>
            <Text style={styles.cardAnswer}>{item.resposta}</Text>
          </MotiView>
        ))}
      </View>

      <Text style={styles.footer}>Fonte: Acervo Histórico Municipal & Secretaria de Turismo de Guarapuava</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 10,
  },
  badgeText: {
    color: colors.goldBright,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    color: colors.textMuted,
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  numberBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  numberBadgeText: {
    color: colors.goldChampagne,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardQuestion: {
    color: colors.goldBright,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  cardAnswer: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    textAlign: 'center',
    color: colors.textSubtle,
    fontSize: 11,
    marginTop: 24,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});