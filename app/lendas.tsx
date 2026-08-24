import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
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
  audioFile: any;
}

const listaLendas: LendaItem[] = [
  { 
    id: 1, 
    titulo: "Lagoa das Lágrimas", 
    autor: "Nivaldo Krüger",
    tempoLeitura: "2 min",
    tag: "AMOR & TRAGÉDIA",
    audioFile: require("../assets/audio/lendas/lenda_lagoa.mp3"),
    historia: "Atualmente, a Lagoa está situada em um espaço em que havia um vale profundo. Há muitos anos, os índios ‘Dorin’ se preparavam para um combate contra os inimigos, os ‘Votorão’.\n\nO cacique dos Dorin, jovem e valente, escondia nesse vale crianças, mulheres e anciãos. Contudo, ao se despedir da noiva, ele disse: “vou honrar a coragem de nossa gente, me espere aqui, voltarei para casarmos e termos muitos filhos”.\n\nDurante o combate os Dorin venceram, porém o cacique morreu como um guerreiro valente. Assim, a tribo retornou ao sertão da Serra da Esperança. Entretanto, a noiva ficou esperando o cacique que havia prometido voltar. Assim sendo, deprimida sobre uma laje, ela chorou desconsolada e fiel.\n\nPor fim, alguns invernos mais tarde, os Dorin encontraram nas fendas da laje duas vertentes de águas cristalinas. Assim nasceu a Lagoa das Lágrimas, um espelho d’água que sempre irá refletir essa história, como um símbolo de fidelidade da mulher pelo amor que nunca será esquecido.",
    corFundo: "#0e1a2f"
  },
  { 
    id: 2, 
    titulo: "Capela do Degolado", 
    autor: "Tradição Popular (via Lab Dicas)",
    tempoLeitura: "2 min",
    tag: "MISTÉRIO & DEVOÇÃO",
    audioFile: require("../assets/audio/lendas/lenda_degolado.mp3"),
    historia: "Um dos marcos mais misteriosos de Guarapuava, a Capela do Degolado guarda a memória de um jovem soldado que, em tempos de conflito, teria desertado em busca de refúgio. Confundido injustamente com um criminoso após buscar comida em uma fazenda, o jovem foi capturado e teve um fim trágico nas proximidades da atual Rua General Carneiro.\n\nA lenda afirma que, por ter sido vítima de uma injustiça fatal, o soldado tornou-se um 'santo popular'. Com o passar das décadas, a pequena capela construída no local da sua morte tornou-se um ponto de intensa devoção.\n\nRelatos de milagres e fenômenos sobrenaturais — como o vulto do soldado zelando pela região e o curioso fato de imagens deixadas no local aparecerem sem a cabeça — mantêm viva a chama desta história que mistura fé, tragédia e o folclore guarapuavano.",
    corFundo: "#1a162b"
  },
  { 
    id: 3, 
    titulo: "A Serpente da Lagoa", 
    autor: "Tradição Oral",
    tempoLeitura: "3 min",
    tag: "FOLCLORE URBANO",
    audioFile: require("../assets/audio/lendas/lenda_serpente.mp3"),
    historia: "Durante o século XX, uma história curiosa começou a circular entre mães e professores para evitar que as crianças faltassem às aulas: a existência de uma serpente gigante que dormia entre a Catedral e a Lagoa das Lágrimas.\n\nA versão mais famosa dizia que o despertar da fera ocorreria com a inauguração da estação ferroviária; o apito do primeiro trem a enfureceria, fazendo-a destruir a cidade. Quando o trem chegou e nada aconteceu, a lenda se adaptou: diziam agora que, se a antiga Catedral fosse demolida para a construção de uma nova, o animal acordaria.\n\nCuriosamente, essa crença popular foi tão forte que ajudou a interromper planos de demolição da igreja na época. Assim, entre o medo e o respeito à tradição, a Catedral permaneceu de pé e Guarapuava seguiu salva da fúria da serpente, que — segundo contam os antigos — continua em seu sono profundo sob nossas águas.",
    corFundo: "#09241b"
  },
  { 
    id: 4, 
    titulo: "Belmiro de Miranda: O Construtor da Liberdade", 
    autor: "ALAC (Acad. de Letras, Artes e Ciências)",
    tempoLeitura: "4 min",
    tag: "HERÓI & ABOLICIONISTA",
    audioFile: require("../assets/audio/lendas/lenda_belmiro.mp3"),
    historia: "Abolicionista e construtor histórico de Guarapuava, Belmiro de Miranda nasceu em Alagoas em 1825, filho da escrava Lucinda, comprada na costa leste da África.\n\nDe profissão mestre de obras e exímio em taipa de pilão, foi trazido a Guarapuava pelo bandeirante Pedro de Siqueira Côrtes para erguer o primeiro palacete da cidade, no pátio da Matriz. Homem de constituição robusta e extraordinária inteligência para os serviços de pedreiro e carpinteiro, Belmiro obteve a rara permissão de trabalhar para terceiros aos domingos, dias santificados e em noites enluaradas, das 22h às 24h.\n\nCom trabalho árduo e o fruto do seu suor, acumulou o dinheiro necessário para comprar a própria alforria. Em 1880, conseguiu recursos para libertar também sua futura esposa, Ezidia Efigênia. Ao lado de Ezidia, exímia cozinheira, passou a investir cada centavo na libertação de antigos companheiros, conquistando a alforria de mais de 50 escravizados em Guarapuava e orientando-os na vida em liberdade.\n\nMesmo sem saber ler ou escrever, Belmiro mantinha contínua correspondência com o líder abolicionista nacional José do Patrocínio através de amigos. Decorava palavra por palavra das cartas recebidas para discursar ao povo nas senzalas e em praça pública, mantendo acesa a chama da liberdade.\n\nEm 13 de maio de 1888, recebeu por telégrafo a sonhada notícia da Abolição da Escravatura no Brasil e organizou grandes festejos cívicos ao lado do Visconde de Guarapuava. Posteriormente, fundou o pioneiro Hotel do Comércio e criou o 'Caixão da Misericórdia' para garantir sepultamento digno e gratuito aos indigentes.\n\nBelmiro de Miranda faleceu em 1910, deixando o legado eterno de um homem que deixou de ser cativo de um senhor para tornar-se cativo do ideal de servir à humanidade.",
    corFundo: "#1c1206"
  }
];

function formatMillis(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function Lendas() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lendaSelecionada, setLendaSelecionada] = useState<LendaItem | null>(null);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  async function toggleAudio(item: LendaItem) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Se já está tocando a mesma lenda
    if (playingId === item.id && soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    // Se for uma lenda diferente, para e descarrega a anterior
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        item.audioFile,
        { shouldPlay: true }
      );
      soundRef.current = newSound;
      setPlayingId(item.id);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis);
        if (status.durationMillis) {
          setDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
          setPosition(0);
        }
      });
    } catch (err) {
      console.log("Erro ao carregar áudio:", err);
    }
  }

  async function pararAudio() {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setPlayingId(null);
    setIsPlaying(false);
    setPosition(0);
    setDuration(0);
  }

  const abrirLeitura = (item: LendaItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLendaSelecionada(item);
  };

  const fecharLeitura = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
          <Text style={styles.headerBadgeText}>FOLCLORE & HISTÓRIAS DA TERRA</Text>
        </View>
        <Text style={styles.headerTitle}>Contos e Memórias</Text>
        <Text style={styles.headerSubtitle}>
          Histórias com narração profissional em alta definição e leitor imersivo.
        </Text>
      </View>

      {/* LISTA DE CARDS DE LENDAS */}
      <View style={styles.list}>
        {listaLendas.map((item, index) => {
          const isItemActive = playingId === item.id;
          const progressPercent = (isItemActive && duration > 0) ? (position / duration) * 100 : 0;

          return (
            <MotiView 
              key={item.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100, type: 'timing', duration: 450 }}
            >
              <Pressable 
                style={[
                  styles.card, 
                  { backgroundColor: item.corFundo },
                  isItemActive && isPlaying && styles.cardActivePlaying
                ]}
                onPress={() => abrirLeitura(item)}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.tagPill}>
                    <Text style={styles.tagPillText}>{item.tag}</Text>
                  </View>

                  {/* BOTÃO TOCAR ÁUDIO */}
                  <TouchableOpacity 
                    style={[styles.audioPill, isItemActive && isPlaying && styles.audioPillActive]}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleAudio(item);
                    }}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.audioPillText, isItemActive && isPlaying && styles.audioPillTextActive]}>
                      {isItemActive && isPlaying ? "⏸ PAUSAR ÁUDIO" : "🎙️ OUVIR NARRAÇÃO"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardAuthor}>Por {item.autor} • {item.tempoLeitura} leitura</Text>
                
                <Text style={styles.cardPreview} numberOfLines={3}>
                  {item.historia}
                </Text>

                {/* BARRA DE PROGRESSO DO ÁUDIO SE ATIVO */}
                {isItemActive && (
                  <View style={styles.cardAudioProgressWrapper}>
                    <View style={styles.progressBarBackground}>
                      <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                    </View>
                    <View style={styles.timeRow}>
                      <Text style={styles.timeText}>{formatMillis(position)}</Text>
                      <Text style={styles.timeText}>{formatMillis(duration)}</Text>
                    </View>
                  </View>
                )}
                
                <View style={styles.divider} />
                
                <View style={styles.cardFooterRow}>
                  <Text style={styles.cardReadMore}>ABRIR HISTÓRIA COMPLETA</Text>
                  <View style={styles.footerArrowContainer}>
                    <Text style={styles.footerArrow}>→</Text>
                  </View>
                </View>
              </Pressable>
            </MotiView>
          );
        })}
      </View>
      
      <Text style={styles.footerText}>Fonte: Historiografia e Tradição Popular de Guarapuava • ALAC</Text>
      <View style={{ height: 40 }} />

      {/* MODAL LEITOR EM TELA CHEIA */}
      <Modal
        visible={!!lendaSelecionada}
        animationType="slide"
        transparent={true}
        onRequestClose={fecharLeitura}
      >
        <View style={styles.modalOverlay}>
          {lendaSelecionada && (() => {
            const isModalActive = playingId === lendaSelecionada.id;
            const modalProgress = (isModalActive && duration > 0) ? (position / duration) * 100 : 0;

            return (
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
                    style={[styles.modalAudioButton, isModalActive && isPlaying && styles.modalAudioButtonActive]}
                    onPress={() => toggleAudio(lendaSelecionada)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.modalAudioButtonText, isModalActive && isPlaying && styles.modalAudioButtonTextActive]}>
                      {isModalActive && isPlaying ? "⏸ PAUSAR NARRADOR" : "🎙️ OUVIR EM VOZ ALTA"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* DOCK DE STATUS DO ÁUDIO */}
                {isModalActive && (
                  <MotiView
                    from={{ opacity: 0, scaleY: 0.8 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    style={styles.narrationDock}
                  >
                    <View style={styles.narrationDockHeader}>
                      <View style={styles.liveIndicator}>
                        <View style={styles.pulseDot} />
                        <Text style={styles.narrationDockStatus}>
                          {isPlaying ? "Reproduzindo narração em estúdio..." : "Narração pausada"}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={pararAudio} activeOpacity={0.7}>
                        <Text style={styles.stopButtonText}>PARAR ✕</Text>
                      </TouchableOpacity>
                    </View>

                    {/* BARRA DE PROGRESSO */}
                    <View style={styles.modalProgressBarBackground}>
                      <View style={[styles.modalProgressBarFill, { width: `${modalProgress}%` }]} />
                    </View>
                    <View style={styles.modalTimeRow}>
                      <Text style={styles.modalTimeText}>{formatMillis(position)}</Text>
                      <Text style={styles.modalTimeText}>{formatMillis(duration)}</Text>
                    </View>
                  </MotiView>
                )}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.readerScroll}>
                  <View style={styles.modalHeaderPill}>
                    <Text style={styles.modalHeaderPillText}>{lendaSelecionada.tag}</Text>
                  </View>

                  <Text style={styles.modalTitle}>{lendaSelecionada.titulo}</Text>
                  
                  <View style={styles.authorRow}>
                    <Text style={styles.authorLabel}>✍️ Fonte e Relato:</Text>
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
            );
          })()}
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
  cardActivePlaying: {
    borderColor: colors.gold,
    shadowOpacity: 0.35,
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
  audioPill: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  audioPillActive: {
    backgroundColor: colors.gold,
  },
  audioPillText: {
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },
  audioPillTextActive: {
    color: colors.textDark,
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
  cardAudioProgressWrapper: {
    marginTop: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.goldBright,
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: colors.goldChampagne,
    fontSize: 10,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
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
    paddingHorizontal: 20,
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
    marginBottom: 14,
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
  modalAudioButton: {
    backgroundColor: colors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalAudioButtonActive: {
    backgroundColor: colors.goldBright,
  },
  modalAudioButtonText: {
    color: colors.textDark,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  modalAudioButtonTextActive: {
    color: colors.textDark,
  },
  narrationDock: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 14,
  },
  narrationDockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gold,
  },
  narrationDockStatus: {
    color: colors.goldChampagne,
    fontSize: 11,
    fontWeight: '700',
  },
  stopButtonText: {
    color: colors.ruby,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  modalProgressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  modalProgressBarFill: {
    height: '100%',
    backgroundColor: colors.goldBright,
    borderRadius: 2,
  },
  modalTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  modalTimeText: {
    color: colors.goldChampagne,
    fontSize: 11,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
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
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 30,
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