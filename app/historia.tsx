import { Stack } from "expo-router";
import { MotiView } from 'moti';
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const timelineEvents = [
  {
    year: "1770",
    title: "Descoberta dos Campos",
    description: "Descoberta dos campos gerais primitivos com cerca de 175.000 km², habitados por povos originários e batizados de Guarapuava ('Lobo Bravo').",
  },
  {
    year: "1810",
    date: "17 de Junho",
    title: "A Real Expedição & Fortim Atalaia",
    description: "Comandada por Diogo Pinto de Azevedo Portugal, a expedição estabelece o Fortim Atalaia para fixar o povoamento colonial.",
  },
  {
    year: "1819",
    date: "09 de Dezembro",
    title: "Freguesia de N. Sra. de Belém",
    description: "Instalação solene da Freguesia de Nossa Senhora de Belém, marco oficial do início da organização urbana.",
  },
  {
    year: "1871",
    date: "12 de Abril",
    title: "Elevação à Categoria de Cidade",
    description: "Guarapuava conquista o status oficial de cidade, consolidando-se como o polo econômico e cultural do 3º Planalto.",
  },
];

export default function Historia() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "História e Símbolos",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO IMAGE HEADER */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/lagoa.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageGradientOverlay}>
            <View style={styles.imageTag}>
              <Text style={styles.imageTagText}>PATRIMÔNIO & IDENTIDADE</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          
          {/* SEÇÃO 1: INTRODUÇÃO HISTÓRICA */}
          <MotiView 
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 500 }}
          >
            <Text style={styles.pageTitle}>A Formação da Nossa Terra</Text>
            
            <Text style={styles.leadParagraph}>
              O nome <Text style={styles.highlightBold}>Guarapuava</Text> origina-se da língua tupi-guarani: <Text style={styles.italicText}>guará</Text> (lobo-guará) e <Text style={styles.italicText}>puava</Text> (bravo ou barulho que ecoa), batizando as vastas campinas do coração do Paraná.
            </Text>
          </MotiView>

          {/* TIMELINE VISUAL */}
          <MotiView 
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 150, duration: 600 }}
            style={styles.timelineSection}
          >
            <Text style={styles.sectionHeaderTitle}>LINHA DO TEMPO HISTÓRICA</Text>

            {timelineEvents.map((item, index) => (
              <View key={index} style={styles.timelineNode}>
                <View style={styles.timelineTrack}>
                  <View style={styles.timelineDot} />
                  {index !== timelineEvents.length - 1 && <View style={styles.timelineLine} />}
                </View>

                <View style={styles.timelineContentCard}>
                  <View style={styles.yearPill}>
                    <Text style={styles.yearPillText}>{item.year}</Text>
                    {item.date && <Text style={styles.datePillText}> • {item.date}</Text>}
                  </View>
                  <Text style={styles.timelineItemTitle}>{item.title}</Text>
                  <Text style={styles.timelineItemDesc}>{item.description}</Text>
                </View>
              </View>
            ))}
          </MotiView>

          {/* SEÇÃO 2: O HINO E SEUS SÍMBOLOS */}
          <MotiView 
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 250, duration: 600 }}
          >
            <View style={styles.divider} />
            <Text style={styles.pageTitle}>Símbolos e Memória</Text>

            <Text style={styles.paragraph}>
              Oficialmente adotado como hino da cidade, seus versos eternizam a alma guarapuavana, seus pinheirais altivos, seus trigais dourados e o pioneirismo dos seus desbravadores.
            </Text>

            {/* GRID DE CARDS 2x2 */}
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoCardIcon}>✍️</Text>
                <Text style={styles.infoCardTitle}>Autoria</Text>
                <Text style={styles.infoCardText}>
                  <Text style={styles.boldText}>Letra:</Text> Gilda B. Todeschini{"\n"}
                  <Text style={styles.boldText}>Música:</Text> Luiz E. Zilli
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoCardIcon}>📜</Text>
                <Text style={styles.infoCardTitle}>Partitura</Text>
                <Text style={styles.infoCardText}>
                  Manuscrito histórico exposto no Museu Visconde.
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoCardIcon}>🏛️</Text>
                <Text style={styles.infoCardTitle}>Uso Oficial</Text>
                <Text style={styles.infoCardText}>
                  Executado com honras em solenidades cívicas.
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.infoCardIcon}>📍</Text>
                <Text style={styles.infoCardTitle}>Altitude</Text>
                <Text style={styles.infoCardText}>
                  1.100m de altitude no coração geográfico do PR.
                </Text>
              </View>
            </View>

            {/* QUOTE CARD EDITORIAL */}
            <View style={styles.quoteCard}>
              <Text style={styles.quoteIcon}>“</Text>
              <Text style={styles.quoteText}>
                Guarapuava é menina radiante, com o ouro dos trigais a se enfeitar! Teu vulto sem igual, pinheiro magistral, eu sempre hei de cantar com ardor!
              </Text>
              <Text style={styles.quoteAuthor}>— Versos do Hino Municipal</Text>
            </View>
          </MotiView>
          
          <View style={{ height: 40 }} />
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
  imageContainer: {
    width: "100%",
    height: 230,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 13, 24, 0.45)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  imageTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageTagText: {
    color: colors.textDark,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  leadParagraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: 20,
  },
  highlightBold: {
    color: colors.goldBright,
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
    color: colors.goldChampagne,
  },
  timelineSection: {
    marginBottom: 24,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  timelineNode: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  timelineTrack: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.gold,
    borderWidth: 2,
    borderColor: colors.background,
    marginTop: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    marginVertical: 4,
  },
  timelineContentCard: {
    flex: 1,
    backgroundColor: colors.cardGlass,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  yearPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  yearPillText: {
    color: colors.goldBright,
    fontWeight: '900',
    fontSize: 14,
  },
  datePillText: {
    color: colors.textSubtle,
    fontSize: 12,
    fontWeight: '600',
  },
  timelineItemTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  timelineItemDesc: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginVertical: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 12,
  },
  infoCard: {
    width: "48%",
    backgroundColor: colors.cardGlass,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  infoCardIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.goldBright,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  infoCardText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.text,
  },
  quoteCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginTop: 8,
  },
  quoteIcon: {
    fontSize: 32,
    color: colors.gold,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.goldChampagne,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gold,
    textAlign: 'right',
  },
});