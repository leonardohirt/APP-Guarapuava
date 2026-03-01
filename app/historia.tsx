import { Stack } from "expo-router";
import { MotiView } from 'moti';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Historia() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "História e Símbolos",
          headerStyle: { backgroundColor: "#0b1f3a" },
          headerTintColor: "#fff",
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGEM DE DESTAQUE COM OVERLAY */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/lagoa.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageTag}>PATRIMÔNIO CULTURAL</Text>
          </View>
        </View>

        <View style={styles.content}>
          
          {/* --- NOVA SEÇÃO: HISTÓRIA OFICIAL --- */}
          <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 600 }}
          >
            <Text style={styles.title}>A Origem de Guarapuava</Text>
            
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Guarapuava</Text> (do tupi-guarani: <Text style={{ fontStyle: 'italic' }}>guará</Text> lobo e <Text style={{ fontStyle: 'italic' }}>puava</Text>: bravo) foi o nome dado aos campos gerais descobertos em 1770, com área primitiva de 175.000 km².
            </Text>

            <View style={styles.historyCard}>
              <View style={styles.accentBar} />
              <Text style={styles.historyTitle}>A Real Expedição</Text>
              <Text style={styles.infoText}>
                O povoamento foi resultado de um processo iniciado no século XVIII pela <Text style={styles.bold}>Real Expedição de Conquista</Text>, comandada por Diogo Pinto de Azevedo Portugal, que chegou à região em <Text style={styles.bold}>17 de junho de 1810</Text>.
              </Text>
              <Text style={[styles.infoText, { marginTop: 10 }]}>
                Nesta época, foi construído o <Text style={styles.bold}>Fortim Atalaia</Text>, que protegeu os povoadores dos ataques das tribos Camés, Votorões e Dorins.
              </Text>
            </View>

            <Text style={styles.paragraph}>
              Oficialmente, a cidade surgiu com a instalação da Freguesia de Nossa Senhora de Belém, em <Text style={styles.bold}>9 de dezembro de 1819</Text>. Elevou-se à categoria de cidade em <Text style={styles.bold}>12 de abril de 1871</Text>.
            </Text>
            
            <View style={styles.divider} />
          </MotiView>

          {/* --- SEÇÃO ORIGINAL: SÍMBOLOS E HINO --- */}
          <MotiView 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 600, delay: 200 }}
          >
            <Text style={styles.title}>O Hino e seu Significado</Text>

            <Text style={styles.paragraph}>
              O Hino de Guarapuava, oficialmente adotado como hino municipal,
              celebra poeticamente a natureza exuberante e o desenvolvimento
              da cidade. A imagem do sol surgindo brilhante simboliza
              um novo começo e um futuro promissor para todos os cidadãos.
            </Text>

            {/* GRID DE INFORMAÇÕES */}
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <View style={styles.accentBar} />
                <Text style={styles.infoTitle}>Compositores</Text>
                <Text style={styles.infoText}>
                  <Text style={styles.bold}>Letra:</Text> Gilda Boscardim Todeschini{"\n"}
                  <Text style={styles.bold}>Música:</Text> Luiz Eulógio Zilli
                </Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.accentBar} />
                <Text style={styles.infoTitle}>Partitura Original</Text>
                <Text style={styles.infoText}>
                  Exposta com honras no Museu Visconde de Guarapuava.
                </Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.accentBar} />
                <Text style={styles.infoTitle}>Uso Oficial</Text>
                <Text style={styles.infoText}>
                  Executado em todas as cerimônias oficiais e eventos cívicos.
                </Text>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.accentBar} />
                <Text style={styles.infoTitle}>Localização</Text>
                <Text style={styles.infoText}>
                  Região centro-sul do Paraná, o coração geográfico do estado.
                </Text>
              </View>
            </View>

            <View style={styles.quoteCard}>
              <Text style={styles.paragraphHighlight}>
                "Elementos como os campos verdejantes, os trigais dourados
                e o vaqueiro simbolizam a tradição e a força da identidade local."
              </Text>
            </View>

            <Text style={styles.paragraph}>
              A cidade é retratada como "menina radiante" e "pérola do Oeste",
              expressões que reforçam o profundo sentimento de orgulho e 
              pertencimento do povo guarapuavano através das gerações.
            </Text>
          </MotiView>
          
          {/* ESPAÇO FINAL */}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1f3a",
  },
  imageContainer: {
    width: "100%",
    height: 220,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 20,
    left: 24,
  },
  imageTag: {
    backgroundColor: "#FFD700",
    color: "#0b1f3a",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 24,
  },
  paragraphHighlight: {
    fontSize: 16,
    lineHeight: 26,
    color: "#FFD700",
    fontStyle: "italic",
    textAlign: "center",
  },
  quoteCard: {
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    padding: 20,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
    marginBottom: 24,
  },
  historyCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 20,
    borderRadius: 14,
    marginBottom: 24,
    position: "relative",
    overflow: "hidden",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    marginVertical: 10,
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoCard: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#FFD700",
    opacity: 0.8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#fff",
  },
  bold: {
    fontWeight: "bold",
    color: "#FFD700",
  },
});