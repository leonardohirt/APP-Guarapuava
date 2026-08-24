import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "@/constants/colors";

const STORAGE_KEY = "@guara_app_quiz_best";

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface QuestionItem {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const allQuestions: QuestionItem[] = [
  {
    question: "Quem escreveu a letra do Hino de Guarapuava?",
    options: ["Luiz Eulógio Zilli", "Gilda Boscardim Todeschini", "Dom Pedro II", "Visconde de Guarapuava"],
    correctAnswer: "Gilda Boscardim Todeschini",
    explanation: "A poetisa Gilda Boscardim Todeschini compôs a letra oficial exaltando a beleza e os valores de Guarapuava.",
  },
  {
    question: "Quem compôs a música erudita do hino?",
    options: ["Luiz Eulógio Zilli", "Villa-Lobos", "Carlos Gomes", "Dom Pedro I"],
    correctAnswer: "Luiz Eulógio Zilli",
    explanation: "O maestro Luiz Eulógio Zilli compôs a bela e triunfante melodia do hino municipal.",
  },
  {
    question: "Onde está exposta a partitura original do hino?",
    options: ["Na Câmara Municipal", "No Museu Visconde de Guarapuava", "Na Catedral", "Na Biblioteca Nacional"],
    correctAnswer: "No Museu Visconde de Guarapuava",
    explanation: "A partitura original manuscrita está preservada no acervo histórico do Museu Visconde de Guarapuava.",
  },
  {
    question: "O hino exalta principalmente:",
    options: ["Tecnologia moderna", "Natureza, tradição e cultura local", "Indústria pesada", "Comércio exterior"],
    correctAnswer: "Natureza, tradição e cultura local",
    explanation: "Os versos destacam os pinheirais, os campos verdejantes e o calor da cultura do povo guarapuavano.",
  },
  {
    question: "A letra menciona qual elemento da natureza no seu início?",
    options: ["Sol", "Neve", "Deserto", "Oceano"],
    correctAnswer: "Sol",
    explanation: "O verso de abertura canta: 'O Sol surgiu, um dia, mais brilhante' trazendo luz e esperança.",
  },
  {
    question: "Guarapuava é poeticamente descrita no hino como:",
    options: ["Uma fortaleza antiga", "Uma menina radiante", "Uma metrópole industrial", "Uma estrela distante"],
    correctAnswer: "Uma menina radiante",
    explanation: "No hino, a cidade é carinhosamente chamada de 'menina radiante, com o ouro dos trigais a se enfeitar'.",
  },
  {
    question: "Qual expedição iniciou o povoamento colonial em 1810?",
    options: ["Bandeirantes Paulistas", "Real Expedição de Conquista", "Marcha para o Oeste", "Expedição Farroupilha"],
    correctAnswer: "Real Expedição de Conquista",
    explanation: "A Real Expedição de Conquista de Diogo Pinto de Azevedo Portugal construiu o Fortim Atalaia em 1810.",
  },
  {
    question: "O hino foi adotado oficialmente como:",
    options: ["Hino estadual", "Hino municipal", "Hino nacional", "Canção folclórica"],
    correctAnswer: "Hino municipal",
    explanation: "É o símbolo sonoro oficial do município de Guarapuava executado em solenidades cívicas.",
  },
  {
    question: "O que significa 'Guarapuava' em tupi-guarani?",
    options: ["Águas Claras", "Lobo Bravo", "Terra do Frio", "Campo Aberto"],
    correctAnswer: "Lobo Bravo",
    explanation: "'Guará' significa lobo-guará e 'Puava' significa bravo ou barulho que ecoa.",
  },
  {
    question: "Qual é a maior queda d'água do Sul do Brasil na região?",
    options: ["Cataratas do Iguaçu", "Salto São Francisco", "Salto São João", "Salto do Rio Branco"],
    correctAnswer: "Salto São Francisco",
    explanation: "O Salto São Francisco possui impressionantes 196 metros de queda livre contínua.",
  },
];

const optionLetters = ["A", "B", "C", "D"];

export default function Quiz() {
  const [questions, setQuestions] = useState<QuestionItem[]>(() =>
    shuffleArray(allQuestions).slice(0, 5)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Carregar recorde salvo
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value !== null) {
        setBestScore(parseInt(value, 10));
      }
    });
  }, []);

  const currentOptions = useMemo(() => {
    return shuffleArray(questions[currentQuestion].options);
  }, [currentQuestion, questions]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentQuestion + 1) / questions.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion]);

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const mensagem = `Fiz o Quiz no Guará-App e acertei ${score} de ${questions.length} perguntas sobre Guarapuava! 🌲✨\n\nConsegue fazer melhor? Baixe o Guará-App!`;
      await Share.share({ message: mensagem });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar.");
    }
  };

  function handleAnswer(option: string) {
    if (selected !== null) return;
    setSelected(option);
    
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore((prev) => prev + 1);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  }

  function nextQuestion() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      setFinished(true);
      
      const finalScore = score;
      if (bestScore === null || finalScore > bestScore) {
        setBestScore(finalScore);
        AsyncStorage.setItem(STORAGE_KEY, finalScore.toString());
      }
    }
  }

  function restartQuiz() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setQuestions(shuffleArray(allQuestions).slice(0, 5));
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  const q = questions[currentQuestion];
  const isCorrect = selected === q?.correctAnswer;

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Quiz Cultural", 
          headerStyle: { backgroundColor: colors.background }, 
          headerTintColor: colors.text 
        }} 
      />

      {!finished ? (
        <ScrollView 
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* HUD SUPERIOR */}
          <View style={styles.hudCard}>
            <View style={styles.hudTopRow}>
              <View style={styles.questionCounterPill}>
                <Text style={styles.questionCounterText}>
                  PERGUNTA {currentQuestion + 1} DE {questions.length}
                </Text>
              </View>

              <View style={styles.scorePill}>
                <Text style={styles.scorePillText}>🏆 ACERTOS: {score}</Text>
              </View>
            </View>

            {/* BARRA DE PROGRESSO */}
            <View style={styles.progressBarBg}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          </View>

          {/* CARD DA PERGUNTA */}
          <MotiView
            key={currentQuestion}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 400 }}
            style={styles.questionCard}
          >
            <Text style={styles.questionText}>{q.question}</Text>
          </MotiView>

          {/* LISTA DE OPÇÕES */}
          <View style={styles.optionsGroup}>
            {currentOptions.map((option, idx) => {
              const letter = optionLetters[idx];
              const isSelected = selected === option;
              const isCorrectAnswer = selected !== null && option === q.correctAnswer;
              const isIncorrectSelected = selected !== null && isSelected && option !== q.correctAnswer;

              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.optionCard,
                    isCorrectAnswer && styles.optionCardCorrect,
                    isIncorrectSelected && styles.optionCardIncorrect,
                  ]}
                  onPress={() => handleAnswer(option)}
                  activeOpacity={0.8}
                  disabled={selected !== null}
                >
                  <View
                    style={[
                      styles.letterBadge,
                      isCorrectAnswer && styles.letterBadgeCorrect,
                      isIncorrectSelected && styles.letterBadgeIncorrect,
                    ]}
                  >
                    <Text
                      style={[
                        styles.letterBadgeText,
                        (isCorrectAnswer || isIncorrectSelected) && styles.letterBadgeTextActive,
                      ]}
                    >
                      {letter}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isCorrectAnswer && styles.optionTextCorrect,
                      isIncorrectSelected && styles.optionTextIncorrect,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* CARD EXPLICATIVO */}
          {selected !== null && (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 350 }}
              style={styles.feedbackSection}
            >
              <View style={[styles.explanationCard, isCorrect ? styles.explanationCardCorrect : styles.explanationCardIncorrect]}>
                <View style={styles.feedbackTitleRow}>
                  <Text style={styles.feedbackIcon}>{isCorrect ? "✅ Resposta Correta!" : "❌ Resposta Incorreta"}</Text>
                </View>
                <Text style={styles.explanationText}>{q.explanation}</Text>
              </View>

              <TouchableOpacity
                style={styles.nextButton}
                onPress={nextQuestion}
                activeOpacity={0.85}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestion < questions.length - 1 ? "PRÓXIMA PERGUNTA →" : "VER RESULTADO FINAL 🏆"}
                </Text>
              </TouchableOpacity>
            </MotiView>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      ) : (
        /* TELA DE RESULTADO FINAL */
        <ScrollView contentContainerStyle={styles.resultScrollContent} showsVerticalScrollIndicator={false}>
          <MotiView
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 700 }}
            style={styles.resultCard}
          >
            <View style={styles.trophyCircle}>
              <Text style={{ fontSize: 44 }}>🏆</Text>
            </View>

            <Text style={styles.resultTitle}>Quiz Concluído!</Text>
            
            <View style={styles.scoreBanner}>
              <Text style={styles.scoreBigNumber}>{score}</Text>
              <Text style={styles.scoreOfTotal}>de {questions.length} acertos</Text>
            </View>

            <View style={styles.evaluationPill}>
              <Text style={styles.evaluationText}>
                {score === 5
                  ? "🌟 MESTRE DA HISTÓRIA GUARAPUAVANA!"
                  : score >= 3
                  ? "👏 MUITO BEM! VOCÊ CONHECE A NOSSA TERRA!"
                  : "📚 VALEU! QUE TAL JOGAR NOVAMENTE E APRENDER MAIS?"}
              </Text>
            </View>

            {bestScore !== null && (
              <View style={styles.bestRecordRow}>
                <Text style={styles.bestRecordText}>🏆 Seu Melhor Recorde Salvo: <Text style={{ color: colors.goldBright, fontWeight: 'bold' }}>{bestScore} / 5</Text></Text>
              </View>
            )}

            {/* BOTÕES DE AÇÃO FINAL */}
            <View style={styles.resultActionGroup}>
              <TouchableOpacity 
                style={styles.restartButton} 
                onPress={restartQuiz} 
                activeOpacity={0.85}
              >
                <Text style={styles.restartButtonText}>🔄 JOGAR NOVAMENTE</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.shareButton} 
                onPress={handleShare} 
                activeOpacity={0.85}
              >
                <Text style={styles.shareButtonText}>💬 COMPARTILHAR NO WHATSAPP</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 18,
  },
  hudCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
    marginBottom: 16,
  },
  hudTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionCounterPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  questionCounterText: {
    color: colors.goldChampagne,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scorePill: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  scorePillText: {
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.gold,
  },
  questionCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 16,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 25,
  },
  optionsGroup: {
    gap: 10,
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  optionCardCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    borderColor: colors.emerald,
  },
  optionCardIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    borderColor: colors.ruby,
  },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  letterBadgeCorrect: {
    backgroundColor: colors.emerald,
  },
  letterBadgeIncorrect: {
    backgroundColor: colors.ruby,
  },
  letterBadgeText: {
    color: colors.goldBright,
    fontSize: 13,
    fontWeight: '800',
  },
  letterBadgeTextActive: {
    color: '#fff',
  },
  optionText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  optionTextCorrect: {
    color: '#fff',
    fontWeight: '800',
  },
  optionTextIncorrect: {
    color: '#fff',
    fontWeight: '800',
  },
  feedbackSection: {
    marginTop: 4,
    gap: 12,
  },
  explanationCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  explanationCardCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  explanationCardIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  feedbackTitleRow: {
    marginBottom: 6,
  },
  feedbackIcon: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.text,
  },
  explanationText: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 19,
  },
  nextButton: {
    backgroundColor: colors.gold,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: colors.textDark,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },

  // RESULT SCREEN
  resultScrollContent: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  resultCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.goldLight,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 14,
  },
  scoreBanner: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreBigNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.goldBright,
    lineHeight: 52,
  },
  scoreOfTotal: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  evaluationPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  evaluationText: {
    color: colors.goldChampagne,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  bestRecordRow: {
    marginBottom: 24,
  },
  bestRecordText: {
    fontSize: 12,
    color: colors.textSubtle,
  },
  resultActionGroup: {
    width: '100%',
    gap: 10,
  },
  restartButton: {
    backgroundColor: colors.gold,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  restartButtonText: {
    color: colors.textDark,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
  shareButton: {
    backgroundColor: colors.shareGreen,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});