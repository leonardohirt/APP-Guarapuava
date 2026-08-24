import { Stack } from "expo-router";
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Image } from "expo-image";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

const marcosHistoricos = [
  {
    id: 1,
    titulo: "Catedral Nossa Senhora de Belém",
    descricao: "O marco zero da fé e da fundação urbana de Guarapuava. A fachada colonial preserva a memória da Freguesia de 1819.",
    imagemAntiga: require("../assets/images/historico/catedral_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/catedral_novo.jpg"),
    fontes: "A Primeira Universidade do Paraná / Acervo Municipal",
    ano: "Século XX vs Atualidade"
  },
  {
    id: 2,
    titulo: "Lagoa das Lágrimas",
    descricao: "De antigo reservatório hídrico e parada de tropeiros (o antigo 'Rocio') ao principal cartão postal de convivência no centro.",
    imagemAntiga: require("../assets/images/historico/lagoa_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/lagoa_novo.jpg"),
    fontes: "Paraná Histórica / Secretaria de Turismo",
    ano: "Memória vs Hoje"
  },
  {
    id: 3,
    titulo: "Colégio Est. Francisco Carneiro Martins",
    descricao: "Um dos maiores templos da educação no 3º Planalto, abrigando gerações de cidadãos em sua imponente estrutura arquitetônica.",
    imagemAntiga: require("../assets/images/historico/carneiro_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/carneiro_novo.jpg"),
    fontes: "Memória Urbana de Guarapuava",
    ano: "Educação & Tradição"
  },
  {
    id: 4,
    titulo: "Museu Visconde de Guarapuava",
    descricao: "Casarão histórico tombado pelo patrimônio que guarda a partitura original do hino e o acervo pioneiro da colonização.",
    imagemAntiga: require("../assets/images/historico/museu_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/museu_novo.jpg"),
    fontes: "Patrimônio Cultural do Paraná",
    ano: "Preservação da Identidade"
  },
  {
    id: 5,
    titulo: "Parque do Lago",
    descricao: "Área de preservação e lazer que se transformou em um dos cenários mais emblemáticos e belos do município.",
    imagemAntiga: require("../assets/images/historico/lago_antigo.jpg"),
    imagemAtual: require("../assets/images/historico/lago_novo.jpg"),
    fontes: "Guarapuava Histórica / Fotografia Contemporânea",
    ano: "Evolução Urbana"
  }
];

export default function FotosHistoricas() {
  const [imgSelecionada, setImgSelecionada] = useState<{ src: any; titulo: string; legenda: string } | null>(null);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Ontem e Hoje",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text 
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>📸 EVOLUÇÃO URBANA</Text>
          </View>
          <Text style={styles.headerTitle}>Memória Visual</Text>
          <Text style={styles.headerSubtitle}>
            Toque nas fotos para ampliar e comparar as transformações arquitetônicas de Guarapuava.
          </Text>
        </View>

        {/* LISTA DE CARDS DE COMPARATIVO */}
        {marcosHistoricos.map((marco, index) => (
          <MotiView
            key={marco.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100, duration: 500 }}
            style={styles.card}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.marcoTitle}>{marco.titulo}</Text>
              <View style={styles.eraPill}>
                <Text style={styles.eraPillText}>{marco.ano}</Text>
              </View>
            </View>

            <Text style={styles.marcoDescricao}>{marco.descricao}</Text>
            
            {/* COMPARATIVO LADO A LADO */}
            <View style={styles.imageGridRow}>
              {/* LADO ANTIGO */}
              <Pressable 
                style={styles.imageWrapper}
                onPress={() => setImgSelecionada({ src: marco.imagemAntiga, titulo: marco.titulo, legenda: "Registro Histórico Antigo" })}
              >
                <Image 
                  source={marco.imagemAntiga} 
                  style={styles.imageThumb} 
                  contentFit="cover" 
                  transition={200}
                />
                <View style={[styles.labelTag, styles.tagAntiga]}>
                  <Text style={styles.labelText}>ANTIGA</Text>
                </View>
              </Pressable>

              {/* LADO ATUAL */}
              <Pressable 
                style={styles.imageWrapper}
                onPress={() => setImgSelecionada({ src: marco.imagemAtual, titulo: marco.titulo, legenda: "Registro Atual" })}
              >
                <Image 
                  source={marco.imagemAtual} 
                  style={styles.imageThumb} 
                  contentFit="cover" 
                  transition={200}
                />
                <View style={[styles.labelTag, styles.tagAtual]}>
                  <Text style={styles.labelText}>ATUAL</Text>
                </View>
              </Pressable>
            </View>

            <Text style={styles.fontesText}>Fonte: {marco.fontes}</Text>
          </MotiView>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* MODAL DE ZOOM / LIGHTBOX */}
      <Modal
        visible={!!imgSelecionada}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImgSelecionada(null)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity 
            style={styles.modalCloseCircle}
            onPress={() => setImgSelecionada(null)}
            activeOpacity={0.8}
          >
            <Text style={styles.modalCloseIcon}>✕</Text>
          </TouchableOpacity>

          {imgSelecionada && (
            <View style={styles.lightboxContent}>
              <Image 
                source={imgSelecionada.src} 
                style={styles.lightboxImage} 
                contentFit="contain" 
                transition={200}
              />
              <View style={styles.lightboxCaptionBox}>
                <Text style={styles.lightboxTitle}>{imgSelecionada.titulo}</Text>
                <Text style={styles.lightboxSubtitle}>{imgSelecionada.legenda}</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 4,
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
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  marcoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  eraPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  eraPillText: {
    color: colors.goldChampagne,
    fontSize: 10,
    fontWeight: '700',
  },
  marcoDescricao: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
    marginBottom: 14,
  },
  imageGridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  imageWrapper: {
    flex: 1,
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  imageThumb: {
    width: '100%',
    height: '100%',
  },
  labelTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagAntiga: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  tagAtual: {
    backgroundColor: 'rgba(16, 185, 129, 0.85)',
  },
  labelText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  fontesText: {
    fontSize: 11,
    color: colors.textSubtle,
    fontStyle: 'italic',
  },

  // MODAL LIGHTBOX
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(4, 8, 16, 0.96)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCloseCircle: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalCloseIcon: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightboxContent: {
    width: '100%',
    alignItems: 'center',
  },
  lightboxImage: {
    width: width - 30,
    height: width - 30,
    borderRadius: 16,
    marginBottom: 16,
  },
  lightboxCaptionBox: {
    backgroundColor: colors.cardGlass,
    padding: 16,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  lightboxTitle: {
    color: colors.goldBright,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  lightboxSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
});