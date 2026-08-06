import { Stack } from "expo-router";
import { MotiView } from 'moti';
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const listaCuriosidades = [
  { 
    id: 1, 
    emoji: "🐺",
    pergunta: "O que significa 'Guarapuava'?", 
    resposta: "Vem do tupi-guarani: 'Guará' (lobo-guará) e 'Puava' (bravo ou barulho). Significa 'Lobo Bravo'.", 
    cor: "#0f172a" 
  },
  { 
    id: 2, 
    emoji: "🎼",
    pergunta: "Quem escreveu o hino?", 
    resposta: "A letra é de Gilda Todeschini e a música de Luiz Eulógio Zilli. Uma obra-prima da nossa cultura.", 
    cor: "#042f2e" 
  },
  { 
    id: 3, 
    emoji: "🌲",
    pergunta: "O 'Pinheiro Magistral'", 
    resposta: "A Araucária é o símbolo da nossa terra, representando a força e longevidade do nosso povo.", 
    cor: "#1c1917" 
  },
  { 
    id: 4, 
    emoji: "🏔️",
    pergunta: "Capital do 3º Planalto", 
    resposta: "Estamos a 1.100m de altitude, sendo uma das cidades mais altas e frias do Paraná.", 
    cor: "#0f2b46" 
  },
  { 
    id: 5, 
    emoji: "📜",
    pergunta: "Partitura Original", 
    resposta: "O manuscrito original da música está preservado no acervo do Museu Visconde de Guarapuava.", 
    cor: "#3b2d03" 
  },
  { 
    id: 6, 
    emoji: "🌾",
    pergunta: "Capital do Malte", 
    resposta: "Guarapuava abriga a maior maltaria da América Latina, sendo referência mundial na produção de cevada.", 
    cor: "#3a2800" 
  },
  { 
    id: 7, 
    emoji: "🌊",
    pergunta: "O Salto São Francisco", 
    resposta: "Com 196 metros de queda livre, é a maior queda d'água do Sul do Brasil e fica na nossa região.", 
    cor: "#034e6b" 
  },
  { 
    id: 8, 
    emoji: "💧",
    pergunta: "A Lagoa das Lágrimas", 
    resposta: "Antigamente chamada de 'Rocio', a Lagoa é o coração do centro da cidade e palco de muitas histórias.", 
    cor: "#0f3737" 
  },
  { 
    id: 9, 
    emoji: "🐎",
    pergunta: "Entreposto Comercial", 
    resposta: "Pela nossa localização estratégica, fomos um ponto vital de parada para os tropeiros no século XIX.", 
    cor: "#3d271d" 
  },
  { 
    id: 10, 
    emoji: "✨",
    pergunta: "A Menina Radiante", 
    resposta: "Este apelido carinhoso vem de um dos versos do hino, exaltando a beleza e o brilho da nossa cidade.", 
    cor: "#3b0764" 
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
      
      <View style={styles.header}>
        <MotiView 
          from={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 800 }}
        >
          <Text style={styles.headerTitle}>Você sabia?</Text>
        </MotiView>
        <Text style={styles.headerSubtitle}>Fatos fascinantes sobre a nossa "Menina Radiante".</Text>
      </View>

      <View style={styles.list}>
        {listaCuriosidades.map((item, index) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, translateY: 15 }} 
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ 
              type: 'timing', 
              duration: 400, 
              delay: index * 90 
            }}
            style={[styles.card, { backgroundColor: item.cor }]}
          >
            <View style={styles.iconBadge}>
              <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardQuestion}>{item.pergunta}</Text>
              <Text style={styles.cardAnswer}>{item.resposta}</Text>
            </View>
          </MotiView>
        ))}
      </View>
      <Text style={styles.footer}>Fonte: Acervo Histórico Municipal de Guarapuava</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 24, alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: colors.gold, letterSpacing: 1 },
  headerSubtitle: { color: colors.textMuted, textAlign: 'center', marginTop: 8, fontSize: 14, lineHeight: 20 },
  list: { paddingHorizontal: 20 },
  card: { 
    flexDirection: 'row', 
    padding: 18, 
    borderRadius: 18, 
    marginBottom: 14, 
    borderLeftWidth: 4, 
    borderLeftColor: colors.gold, 
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.22)',
    elevation: 4,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  iconBadge: { 
    width: 44, 
    height: 44, 
    backgroundColor: 'rgba(255, 215, 0, 0.15)', 
    borderRadius: 22, 
    borderWidth: 1,
    borderColor: colors.gold,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 14 
  },
  cardContent: { flex: 1 },
  cardQuestion: { color: colors.gold, fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  cardAnswer: { color: colors.text, fontSize: 14, lineHeight: 21 },
  footer: { textAlign: 'center', color: colors.textSubtle, fontSize: 11, marginTop: 20, letterSpacing: 0.5 }
});