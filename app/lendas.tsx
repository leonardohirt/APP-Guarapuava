import { Stack } from "expo-router";
import { MotiView } from 'moti';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const listaLendas = [
  { 
    id: 1, 
    titulo: "Lagoa das Lágrimas", 
    autor: "Nivaldo Krüger",
    historia: "Atualmente, a Lagoa está situada em um espaço em que havia um vale profundo. Há muitos anos, os índios ‘Dorin’ se preparavam para um combate contra os inimigos, os ‘Votorão’.\n\nO cacique dos Dorin, jovem e valente, escondia nesse vale crianças, mulheres e anciãos. Contudo, ao se despedir da noiva, ele disse: “vou honrar a coragem de nossa gente, me espere aqui, voltarei para casarmos e termos muitos filhos”.\n\nDurante o combate os Dorin venceram, porém o cacique morreu como um guerreiro valente. Assim, a tribo retornou ao sertão da Serra da Esperança. Entretanto, a noiva ficou esperando o cacique que havia prometido voltar. Assim sendo, deprimida sobre uma laje, ela chorou desconsolada e fiel.\n\nPor fim, alguns invernos mais tarde, os Dorin encontraram nas fendas da laje duas vertentes de águas cristalinas. Assim nasceu a Lagoa das Lágrimas, um espelho d’água que sempre irá refletir essa história, como um símbolo de fidelidade da mulher pelo amor que nunca será esquecido.",
    cor: "#0f172a"
  },
  { 
    id: 2, 
    titulo: "Capela do Degolado", 
    autor: "Tradição Popular (via Lab Dicas)",
    historia: "Um dos marcos mais misteriosos de Guarapuava, a Capela do Degolado guarda a memória de um jovem soldado que, em tempos de conflito, teria desertado em busca de refúgio. Confundido injustamente com um criminoso após buscar comida em uma fazenda, o jovem foi capturado e teve um fim trágico nas proximidades da atual Rua General Carneiro.\n\nA lenda afirma que, por ter sido vítima de uma injustiça fatal, o soldado tornou-se um 'santo popular'. Com o passar das décadas, a pequena capela construída no local da sua morte tornou-se um ponto de intensa devoção.\n\nRelatos de milagres e fenômenos sobrenaturais — como o vulto do soldado zelando pela região e o curioso fato de imagens deixadas no local aparecerem sem a cabeça — mantêm viva a chama desta história que mistura fé, tragédia e o folclore guarapuavano.",
    cor: "#1e1e2f"
  },
  { 
    id: 3, 
    titulo: "A Serpente da Lagoa", 
    autor: "Tradição Oral",
    historia: "Durante o século XX, uma história curiosa começou a circular entre mães e professores para evitar que as crianças faltassem às aulas: a existência de uma serpente gigante que dormia entre a Catedral e a Lagoa das Lágrimas.\n\nA versão mais famosa dizia que o despertar da fera ocorreria com a inauguração da estação ferroviária; o apito do primeiro trem a enfureceria, fazendo-a destruir a cidade. Quando o trem chegou e nada aconteceu, a lenda se adaptou: diziam agora que, se a antiga Catedral fosse demolida para a construção de uma nova, o animal acordaria.\n\nCuriosamente, essa crença popular foi tão forte que ajudou a interromper planos de demolição da igreja na época. Assim, entre o medo e o respeito à tradição, a Catedral permaneceu de pé e Guarapuava seguiu salva da fúria da serpente, que — segundo contam os antigos — continua em seu sono profundo sob nossas águas.",
    cor: "#064e3b"
  }
];

export default function Lendas() {
  const mostrarDetalhes = (item: any) => {
    Alert.alert(
      item.titulo, 
      `${item.historia}\n\n— Relatado por: ${item.autor}`, 
      [{ text: "Concluir Leitura", style: "default" }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ 
        title: "Lendas e Contos", 
        headerStyle: { backgroundColor: "#020617" }, 
        headerTintColor: "#fff" 
      }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contos da Nossa Terra</Text>
        <Text style={styles.headerSubtitle}>Relatos que compõem o imaginário do nosso povo.</Text>
      </View>

      <View style={styles.list}>
        {listaLendas.map((item, index) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 200, type: 'timing', duration: 800 }}
          >
            <Pressable 
              style={[styles.card, { backgroundColor: item.cor }]}
              onPress={() => mostrarDetalhes(item)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.titulo.toUpperCase()}</Text>
                
                <Text style={styles.cardAuthor}>Por {item.autor}</Text>
                
                <Text style={styles.cardPreview} numberOfLines={2}>
                  {item.historia}
                </Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.cardReadMore}>Ler relato completo</Text>
              </View>
            </Pressable>
          </MotiView>
        ))}
      </View>
      
      <Text style={styles.footerText}>Fonte: Historiografia e Tradição Popular</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617" },
  header: { padding: 40, alignItems: 'flex-start' },
  headerTitle: { fontSize: 32, fontWeight: '300', color: '#f8fafc', letterSpacing: 1 },
  headerSubtitle: { color: '#94a3b8', marginTop: 8, fontSize: 14, lineHeight: 20 },
  list: { paddingHorizontal: 20 },
  card: { 
    padding: 24, 
    borderRadius: 8, 
    marginBottom: 20, 
    borderLeftWidth: 2,
    borderLeftColor: '#475569',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardContent: { flex: 1 },
  cardTitle: { color: '#f1f5f9', fontSize: 18, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  cardAuthor: { color: '#64748b', fontSize: 11, fontWeight: '700', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  cardPreview: { color: '#94a3b8', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: 'rgba(148, 163, 184, 0.1)', marginVertical: 15 },
  cardReadMore: { color: '#cbd5e1', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  footerText: { textAlign: 'center', color: '#475569', fontSize: 11, marginTop: 30, letterSpacing: 1 }
});