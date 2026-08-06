import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
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
    question: "Quem compôs a música do hino?",
    options: ["Luiz Eulógio Zilli", "Villa-Lobos", "Carlos Gomes", "Dom Pedro I"],
    correctAnswer: "Luiz Eulógio Zilli",
    explanation: "O maestro Luiz Eulógio Zilli compôs a bela melodia erudita do hino municipal.",
  },
  {
    question: "Onde está exposta a partitura original do hino?",
    options: ["Na Câmara Municipal", "No Museu Visconde de Guarapuava", "Na Catedral", "Na Biblioteca Nacional"],
    correctAnswer: "No Museu Visconde de Guarapuava",
    explanation: "A partitura original manuscrita está preservada no acervo histórico do Museu Visconde de Guarapuava.",
  },
  {
    question: "O hino exalta principalmente:",
    options: ["Tecnologia moderna", "Natureza e cultura local", "Indústria pesada", "Comércio exterior"],
    correctAnswer: "Natureza e cultura local",
    explanation: "Os versos destacam os pinheirais, os campos verdejantes e o calor da cultura do povo guarapuavano.",
  },
  {
    question: "A letra menciona qual elemento da natureza no seu início?",
    options: ["Sol", "Neve", "Deserto", "Oceano"],
    correctAnswer: "Sol",
    explanation: "O verso de abertura canta: 'O Sol surgiu, um dia, mais brilhante' trazendo luz e esperança.",
  },
  {
    question: "Guarapuava é poeticamente descrita como:",
    options: ["Uma fortaleza antiga", "Uma menina radiante", "Uma metrópole industrial", "Uma estrela distante"],
    correctAnswer: "Uma menina radiante",
    explanation: "No hino, a cidade é carinhosamente chamada de 'menina radiante, com o ouro dos trigais a se enfeitar'.",
  },
  {
    question: "O hino celebra o quê?",
    options: ["Conquistas esportivas", "História e identidade da cidade", "Guerras antigas", "Riquezas minerais"],
    correctAnswer: "História e identidade da cidade",
    explanation: "É um marco cívico de amor à terra, preservando a memória dos tropeiros e fundadores.",
  },
  {
    question: "O hino foi adotado oficialmente como:",
    options: ["Hino estadual", "Hino municipal", "Hino nacional", "Canção folclórica"],
    correctAnswer: "Hino municipal",
    explanation: "É o símbolo sonoro oficial do município de Guarapuava executado em solenidades cívicas.",
  },
  {
    question: "A partitura original foi preservada no município em um ato de:",
    options: ["Venda pública", "Resgate cultural", "Competição musical", "Doação anônima"],
    correctAnswer: "Resgate cultural",
    explanation: "A preservação da partitura foi um importante resgate da memória musical da cidade.",
  },
  {
    question: "O hino representa principalmente:",
    options: ["Orgulho e identidade local", "Riqueza financeira", "Poder militar", "Expansão territorial"],
    correctAnswer: "Orgulho e identidade local",
    explanation: "Representa a união e o sentimento de orgulho de pertencer à Terra do Lobo Bravo.",
  },
];

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
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion]);

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const mensagem = `Fiz o Quiz no Guará-App e acertei ${score} de ${questions.length} perguntas sobre Guarapuava! 🌲✨\n\nConsegue fazer melhor?`;
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
  }

  async function nextQuestion() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
      // Atualizar melhor pontuação
      const finalScore = score + (selected === questions[currentQuestion].correctAnswer ? 1 : 0);
      if (bestScore === null || finalScore > bestScore) {
        setBestScore(finalScore);
        await AsyncStorage.setItem(STORAGE_KEY, finalScore.toString());
      }
    }
  }

  function restartQuiz() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    progressAnim.setValue(0);
    setQuestions(shuffleArray(allQuestions).slice(0, 5));
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  const currentData = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Quiz Guarapuava",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      {finished ? (
        <View style={styles.centerContent}>
          <Text style={styles.title}>Resultado Final</Text>
          <Text style={styles.scoreText}>
            Você acertou {score} de {questions.length}
          </Text>

          {bestScore !== null && (
            <View style={styles.bestScoreBadge}>
              <Text style={styles.bestScoreText}>🏆 Sua Melhor Pontuação: {bestScore} / {questions.length}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Compartilhar Resultado 🚀</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Jogar Novamente 🔄</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.progressBarContainer}>
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

          <ScrollView contentContainerStyle={styles.quizContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.progressLabel}>
              Pergunta {currentQuestion + 1} de {questions.length}
            </Text>

            <Text style={styles.questionText}>{currentData.question}</Text>

            {currentOptions.map((option, index) => {
              const isCorrect = option === currentData.correctAnswer;
              const isSelected = option === selected;

              let backgroundColor = colors.card;
              let borderColor = colors.cardBorder;
              if (selected !== null) {
                if (isCorrect) {
                  backgroundColor = colors.correct;
                  borderColor = colors.gold;
                } else if (isSelected) {
                  backgroundColor = colors.incorrect;
                }
              }

              return (
                <TouchableOpacity
                  key={`${currentQuestion}-${index}`}
                  style={[styles.optionButton, { backgroundColor, borderColor }]}
                  onPress={() => handleAnswer(option)}
                  activeOpacity={selected ? 1 : 0.7}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}

            {/* CARD EXPLICATIVO */}
            {selected !== null && (
              <View style={styles.explanationCard}>
                <Text style={styles.explanationTitle}>💡 Você sabia?</Text>
                <Text style={styles.explanationText}>{currentData.explanation}</Text>
              </View>
            )}

            {selected !== null && (
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>
                  {currentQuestion + 1 === questions.length ? "Finalizar Quiz" : "Próxima Pergunta →"}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.card,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.gold,
  },
  quizContent: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  progressLabel: {
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gold,
    textAlign: "center",
    marginBottom: 20,
  },
  bestScoreBadge: {
    backgroundColor: colors.goldLight,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gold,
    marginBottom: 30,
    alignItems: "center",
  },
  bestScoreText: {
    color: colors.gold,
    fontWeight: "bold",
    fontSize: 15,
  },
  questionText: {
    fontSize: 22,
    color: colors.text,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 30,
  },
  optionButton: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    color: colors.text,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  explanationCard: {
    backgroundColor: "rgba(255, 215, 0, 0.12)",
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.25)",
    marginTop: 10,
    marginBottom: 10,
  },
  explanationTitle: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  explanationText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 15,
    backgroundColor: colors.gold,
    padding: 18,
    borderRadius: 14,
  },
  nextButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.background,
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: colors.shareGreen,
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  shareButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.text,
    fontSize: 16,
  },
  restartButton: {
    backgroundColor: colors.gold,
    padding: 18,
    borderRadius: 14,
  },
  restartButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.background,
    fontSize: 16,
  },
});