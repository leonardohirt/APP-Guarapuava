import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import * as Speech from "expo-speech";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/colors";

interface LendaItem {
  id: number;
  titulo: string;
  autor: string;
  tempoLeitura: string;
  historia: string;
  tag: string;
  corFundo: string;
}

const listaLendas: LendaItem[] = [
  { 
    id: 1, 
    titulo: "Lagoa das Lágrimas", 
    autor: "Nivaldo Krüger",
    tempoLeitura: "2 min",
    tag: "AMOR & TRAGÉDIA",
    historia: "Atualmente, a Lagoa está situada em um espaço em que havia um vale profundo. Há muitos anos, os índios ‘Dorin’ se preparavam para um combate contra os inimigos, os ‘Votorão’.\n\nO cacique dos Dorin, jovem e valente, escondia nesse vale crianças, mulheres e anciãos. Contudo, ao se despedir da noiva, ele disse: “vou honrar a coragem de nossa gente, me espere aqui, voltarei para casarmos e termos muitos filhos”.\n\nDurante o combate os Dorin venceram, porém o cacique morreu como um guerreiro valente. Assim, a tribo retornou ao sertão da Serra da Esperança. Entretanto, a noiva ficou esperando o cacique que havia prometido voltar. Assim sendo, deprimida sobre uma laje, ela chorou desconsolada e fiel.\n\nPor fim, alguns invernos mais tarde, os Dorin encontraram nas fendas da laje duas vertentes de águas cristalinas. Assim nasceu a Lagoa das Lágrimas, um espelho d’água que sempre irá refletir essa história, como um símbolo de fidelidade da mulher pelo amor que nunca será esquecido.",
    corFundo: "#0e1a2f"
  },
  { 
    id: 2, 
    titulo: "Capela do Degolado", 
    autor: "Tradição Popular (via Lab Dicas)",
    tempoLeitura: "2 min",
    tag: "MISTÉRIO & DEVOÇÃO",
    historia: "Um dos marcos mais misteriosos de Guarapuava, a Capela do Degolado guarda a memória de um jovem soldado que, em tempos de conflito, teria desertado em busca de refúgio. Confundido injustamente com um criminoso após buscar comida em uma fazenda, o jovem foi capturado e teve um fim trágico nas proximidades da atual Rua General Carneiro.\n\nA lenda afirma que, por ter sido vítima de uma injustiça fatal, o soldado tornou-se um 'santo popular'. Com o passar das décadas, a pequena capela construída no local da sua morte tornou-se um ponto de intensa devoção.\n\nRelatos de milagres e fenômenos sobrenaturais — como o vulto do soldado zelando pela região e o curioso fato de imagens deixadas no local aparecerem sem a cabeça — mantêm viva a chama desta história que mistura fé, tragédia e o folclore guarapuavano.",
    corFundo: "#1a162b"
  },
  { 
    id: 3, 
    titulo: "A Serpente da Lagoa", 
    autor: "Tradição Oral",
    tempoLeitura: "3 min",
    tag: "FOLCLORE URBANO",
    historia: "Durante o século XX, uma história curiosa começou a circular entre mães e professores para evitar que as crianças faltassem às aulas: a existência de uma serpente gigante que dormia entre a Catedral e a Lagoa das Lágrimas.\n\nA versão mais famosa dizia que o despertar da fera ocorreria com a inauguração da estação ferroviária; o apito do primeiro trem a enfureceria, fazendo-a destruir a cidade. Quando o trem chegou e nada aconteceu, a lenda se adaptou: diziam agora que, se a antiga Catedral fosse demolida para a construção de uma nova, o animal acordaria.\n\nCuriosamente, essa crença popular foi tão forte que ajudou a interromper planos de demolição da igreja na época. Assim, entre o medo e o respeito à tradição, a Catedral permaneceu de pé e Guarapuava seguiu salva da fúria da serpente, que — segundo contam os antigos — continua em seu sono profundo sob nossas águas.",
    corFundo: "#09241b"
  }
];

export default function Lendas() {
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [lendaSelecionada, setLendaSelecionada] = useState<LendaItem | null>(null);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const toggleSpeech = (item: LendaItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (speakingId === item.id) {
      Speech.stop();
      setSpeakingId(null);
    } else {
      Speech.stop();
      setSpeakingId(item.id);
      Speech.speak(`${item.titulo}. Por ${item.autor}. ${item.historia}`, {
        language: "pt-BR",
        rate: 0.95,
        onDone: () => setSpeakingId(null),
        onStopped: () => setSpeakingId(null),
        onError: () => setSpeakingId(null),
      });
    }
  };

  const abrirLeitura = (item: LendaItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLendaSelecionada(item);
  };

  const fecharLeitura = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (speakingId) {
      Speech.stop();
      setSpeakingId(null);
    }
    setLendaSelecionada(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ 
        title: "Mitos e Lendas", 
        headerStyle: { backgroundColor: colors.background }, 
        headerTintColor: colors.text 
      }} />
      
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>FOLCLORE & IMAGINÁRIO</Text>
        </View>
        <Text style={styles.headerTitle}>Contos da Nossa Terra</Text>
        <Text style={styles.headerSubtitle}>
          Histórias transmitidas de geração em geração pelo imaginário popular.
        </Text>
      </View>

      {/* LISTA DE CARDS DE LENDAS */}
      <View style={styles.list}>
        {listaLendas.map((item, index) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 120, type: 'timing', duration: 500 }}
          >
            <Pressable 
              style={[styles.card, { backgroundColor: item.corFundo }]}
              onPress={() => abrirLeitura(item)}
            >
              <View style={styles.cardHeaderRow}>
                <View style={styles.tagPill}>
                  <Text style={styles.tagPillText}>{item.tag}</Text>
                </View>

                {/* BOTÃO OUVIR NO CARD */}
                <TouchableOpacity 
                  style={styles.speechPill}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleSpeech(item);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.speechPillText}>
                    {speakingId === item.id ? "⏹ PARAR" : "🔊 OUVIR"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardAuthor}>Por {item.autor} • {item.tempoLeitura} leitura</Text>
              
              <Text style={styles.cardPreview} numberOfLines={3}>
                {item.historia}
              </Text>
              
              <View style={styles.divider} />
              
              <View style={styles.cardFooterRow}>
                <Text style={styles.cardReadMore}>ABRIR HISTÓRIA COMPLETA</Text>
                <View style={styles.footerArrowContainer}>
                  <Text style={styles.footerArrow}>→</Text>
                </View>
              </View>
            </Pressable>
          </MotiView>
        ))}
      </View>
      
      <Text style={styles.footerText}>Fonte: Historiografia e Tradição Popular de Guarapuava</Text>
      <View style={{ height: 40 }} />

      {/* MODAL LEITOR EM TELA CHEIA */}
      <Modal
        visible={!!lendaSelecionada}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharLeitura}
      >
        <View style={styles.modalOverlay}>
          {lendaSelecionada && (
            <MotiView 
              from={{ opacity: 0, translateY: 40 }}
              animate={{ opacity: 1, translateY: 0 }}
              style={styles.modalContent}
            >
              {/* BARRA SUPERIOR DO LEITOR */}
              <View style={styles.modalToolbar}>
                <TouchableOpacity onPress={fecharLeitura} style={styles.modalCloseButton} activeOpacity={0.7}>
                  <Text style={styles.modalCloseButtonText}>← Fechar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.modalSpeechButton}
                  onPress={() => toggleSpeech(lendaSelecionada)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalSpeechButtonText}>
                    {speakingId === lendaSelecionada.id ? "⏹ PARAR VOZ" : "🔊 OUVIR EM VOZ ALTA"}
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.readerScroll}>
                <View style={styles.modalHeaderPill}>
                  <Text style={styles.modalHeaderPillText}>{lendaSelecionada.tag}</Text>
                </View>

                <Text style={styles.modalTitle}>{lendaSelecionada.titulo}</Text>
                
                <View style={styles.authorRow}>
                  <Text style={styles.authorLabel}>✍️ Relatado por:</Text>
                  <Text style={styles.authorName}>{lendaSelecionada.autor}</Text>
                </View>

                <View style={styles.modalDivider} />

                {/* PARÁGRAFOS FORMATADOS */}
                {lendaSelecionada.historia.split("\n\n").map((paragrafo, idx) => (
                  <Text key={idx} style={styles.modalParagraph}>
                    {paragrafo}
                  </Text>
                ))}

                <TouchableOpacity style={styles.closeModalBottomButton} onPress={fecharLeitura} activeOpacity={0.85}>
                  <Text style={styles.closeModalBottomButtonText}>CONCLUIR LEITURA ✕</Text>
                </TouchableOpacity>
              </ScrollView>
            </MotiView>
          )}
        </View>
      </Modal>
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
  headerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 10,
  },
  headerBadgeText: {
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
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagPillText: {
    color: colors.goldChampagne,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  speechPill: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  speechPillText: {
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardAuthor: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
  cardPreview: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginVertical: 14,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardReadMore: {
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  footerArrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.goldLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerArrow: {
    color: colors.goldBright,
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: colors.textSubtle,
    fontSize: 11,
    marginTop: 20,
    fontStyle: 'italic',
  },

  // MODAL LEITOR EM TELA CHEIA
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 8, 16, 0.95)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.backgroundElevated,
    marginTop: 40,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderColor: colors.cardBorder,
  },
  modalToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalCloseButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.cardGlass,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  modalCloseButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  modalSpeechButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalSpeechButtonText: {
    color: colors.textDark,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  readerScroll: {
    paddingBottom: 40,
  },
  modalHeaderPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 10,
  },
  modalHeaderPillText: {
    color: colors.goldBright,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 32,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  authorLabel: {
    color: colors.textSubtle,
    fontSize: 12,
  },
  authorName: {
    color: colors.goldChampagne,
    fontSize: 12,
    fontWeight: '700',
  },
  modalDivider: {
    height: 1,
    backgroundColor: colors.cardBorderSubtle,
    marginBottom: 18,
  },
  modalParagraph: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 16,
  },
  closeModalBottomButton: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: colors.gold,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  closeModalBottomButtonText: {
    color: colors.goldBright,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
});