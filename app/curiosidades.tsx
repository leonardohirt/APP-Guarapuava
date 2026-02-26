import { Stack } from "expo-router";
import { MotiView } from 'moti'; // Importando a biblioteca de animação
import { ScrollView, StyleSheet, Text, View } from "react-native";

const listaCuriosidades = [
  { 
    id: 1, 
    pergunta: "O que significa 'Guarapuava'?", 
    resposta: "Vem do tupi-guarani: 'Guará' (lobo-guará) e 'Puava' (bravo ou barulho). Significa 'Lobo Bravo'.", 
    cor: "#1c2e4a" 
  },
  { 
    id: 2, 
    pergunta: "Quem escreveu o hino?", 
    resposta: "A letra é de Gilda Todeschini e a música de Bento Mossurunga. Uma obra prima da nossa cultura.", 
    cor: "#004d40" 
  },
  { 
    id: 3, 
    pergunta: "O 'Pinheiro Magistral'", 
    resposta: "A Araucária é o símbolo da nossa terra, representando a força e longevidade do nosso povo.", 
    cor: "#3e2723" 
  },
  { 
    id: 4, 
    pergunta: "Capital do 3º Planalto", 
    resposta: "Estamos a 1.100m de altitude, sendo uma das cidades mais altas e frias do Paraná.", 
    cor: "#2c3e50" 
  },
  { 
    id: 5, 
    pergunta: "Partitura Original", 
    resposta: "O manuscrito original da música está preservado no acervo do Museu Visconde de Guarapuava.", 
    cor: "#b8860b" 
  },
  { 
    id: 6, 
    pergunta: "Capital do Malte", 
    resposta: "Guarapuava abriga a maior maltaria da América Latina, sendo referência mundial na produção de cevada.", 
    cor: "#4a3b00" 
  },
  { 
    id: 7, 
    pergunta: "O Salto São Francisco", 
    resposta: "Com 196 metros de queda livre, é a maior queda d'água do Sul do Brasil e fica na nossa região.", 
    cor: "#005a7d" 
  },
  { 
    id: 8, 
    pergunta: "A Lagoa das Lágrimas", 
    resposta: "Antigamente chamada de 'Rocio', a Lagoa é o coração do centro da cidade e palco de muitas histórias.", 
    cor: "#1c3d3d" 
  },
  { 
    id: 9, 
    pergunta: "Entreposto Comercial", 
    resposta: "Pela nossa localização estratégica, fomos um ponto vital de parada para os tropeiros no século XIX.", 
    cor: "#5d4037" 
  },
  { 
    id: 10, 
    pergunta: "A Menina Radiante", 
    resposta: "Este apelido carinhoso vem de um dos versos do hino, exaltando a beleza e o brilho da nossa cidade.", 
    cor: "#6a1b9a" 
  }
];

export default function Curiosidades() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Curiosidades", headerStyle: { backgroundColor: "#0b1f3a" }, headerTintColor: "#fff" }} />
      
      <View style={styles.header}>
        <MotiView 
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1000 }}
        >
          <Text style={styles.headerTitle}>Você sabia?</Text>
        </MotiView>
        <Text style={styles.headerSubtitle}>Fatos fascinantes da nossa "Menina Radiante".</Text>
      </View>

      <View style={styles.list}>
        {listaCuriosidades.map((item, index) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, translateX: -50 }} // Começa invisível e um pouco à esquerda
            animate={{ opacity: 1, translateX: 0 }} // Termina na posição certa
            transition={{ 
              type: 'timing', 
              duration: 500, 
              delay: index * 200 // O "pulo do gato": cada card demora 200ms a mais que o anterior
            }}
            style={[styles.card, { backgroundColor: item.cor }]}
          >
            <View style={styles.iconBadge}><Text style={{ fontSize: 20 }}>💡</Text></View>
            <View style={styles.cardContent}>
              <Text style={styles.cardQuestion}>{item.pergunta}</Text>
              <Text style={styles.cardAnswer}>{item.resposta}</Text>
            </View>
          </MotiView>
        ))}
      </View>
      <Text style={styles.footer}>Fonte: Acervo Histórico Municipal</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1f3a" },
  header: { padding: 30, alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFD700' },
  headerSubtitle: { color: '#fff', textAlign: 'center', marginTop: 10, opacity: 0.8, fontSize: 14 },
  list: { padding: 20 },
  card: { flexDirection: 'row', padding: 20, borderRadius: 20, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#FFD700', elevation: 8 },
  iconBadge: { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardContent: { flex: 1 },
  cardQuestion: { color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cardAnswer: { color: '#fff', fontSize: 14, lineHeight: 22 },
  footer: { textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, fontStyle: 'italic' }
});