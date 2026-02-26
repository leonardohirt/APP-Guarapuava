import { Stack } from "expo-router";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const marcosHistoricos = [
  {
    id: 1,
    titulo: "Catedral Nossa Senhora de Belém",
    descricao: "O marco zero da fé e da história guarapuavana. A arquitetura original preserva a essência da fundação da Freguesia.",
    imagemAntiga: require("../assets/images/historico/catedral_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/catedral_novo.jpg"),
    fontes: "A primeira universidade de Paraná / Rede Sul de Notícias",
    ano: "Século XX vs Hoje"
  },
  {
    id: 2,
    titulo: "Lagoa das Lágrimas",
    descricao: "Um dos pontos mais poéticos da cidade. De antigo reservatório e parada de tropeiros a centro de lazer e beleza.",
    imagemAntiga: require("../assets/images/historico/lagoa_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/lagoa_novo.jpg"),
    fontes: "Paraná Histórica / TripAdvisor",
    ano: "Memória vs Atualidade"
  },
  {
    id: 3,
    titulo: "Colégio Est. Francisco Carneiro Martins",
    descricao: "Um dos maiores símbolos da educação em nossa região. O prédio é um marco arquitetônico e cultural para gerações de estudantes.",
    imagemAntiga: require("../assets/images/historico/carneiro_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/carneiro_novo.jpg"),
    fontes: "Memória Urbana / Cultura News",
    ano: "Educação e Tradição"
  },
  {
    id: 4,
    titulo: "Museu Visconde de Guarapuava",
    descricao: "Casarão histórico que guarda a partitura original do hino e o acervo da nossa colonização.",
    imagemAntiga: require("../assets/images/historico/museu_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/museu_novo.jpg"),
    fontes: "Patrimônio Cultural / Guia das Artes",
    ano: "Preservação da Identidade"
  },

   {
    id: 5,
    titulo: "Parque do Lago ",
    descricao: "o Parque do Lago conta com uma paisagem encantadora e muitas atrações culturais.",
    imagemAntiga: require("../assets/images/historico/lago_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/lago_novo.jpg"),
    fontes: "Guarapuava Histórica / Paraná Central",
    ano: "Memória vs Atualidade"
  }
];

export default function FotosHistoricas() {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Ontem e Hoje",
          headerStyle: { backgroundColor: "#0b1f3a" },
          headerTintColor: "#fff" 
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Memória Viva</Text>
        <Text style={styles.headerSubtitle}>
          Compare a evolução de Guarapuava ao longo das décadas.
        </Text>
      </View>

      {marcosHistoricos.map((marco) => (
        <View key={marco.id} style={styles.card}>
          <Text style={styles.marcoTitle}>{marco.titulo}</Text>
          <Text style={styles.marcoAno}>{marco.ano}</Text>
          
          <View style={styles.imageContainer}>
             <View style={styles.imageWrapper}>
                <Image source={marco.imagemAntiga} style={styles.image} />
                <View style={styles.labelTag}>
                    <Text style={styles.labelText}>ANTIGA</Text>
                </View>
             </View>
             
             <View style={styles.imageWrapper}>
                <Image source={marco.imagemAtual} style={styles.image} />
                <View style={[styles.labelTag, {backgroundColor: '#FFD700'}]}>
                    <Text style={[styles.labelText, {color: '#0b1f3a'}]}>ATUAL</Text>
                </View>
             </View>
          </View>

          <Text style={styles.description}>{marco.descricao}</Text>
          <Text style={styles.fontText}>Fontes: {marco.fontes}</Text>
        </View>
      ))}
      
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1f3a" },
  header: { padding: 25, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFD700' },
  headerSubtitle: { color: '#fff', textAlign: 'center', marginTop: 8, opacity: 0.8 },
  card: { backgroundColor: '#1c2e4a', marginHorizontal: 15, marginBottom: 20, borderRadius: 15, padding: 15 },
  marcoTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  marcoAno: { color: '#FFD700', fontSize: 13, marginBottom: 15 },
  imageContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  imageWrapper: { width: (width - 75) / 2, height: 140, borderRadius: 8, overflow: 'hidden' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  labelTag: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.7)', padding: 3 },
  labelText: { color: '#fff', fontSize: 10, textAlign: 'center', fontWeight: 'bold' },
  description: { color: '#ccc', marginTop: 15, lineHeight: 20, fontSize: 14 },
  fontText: { color: '#666', fontSize: 10, marginTop: 10, fontStyle: 'italic' }
});