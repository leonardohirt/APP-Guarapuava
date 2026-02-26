import { Stack } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
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

// --- FUNÇÕES AUXILIARES ---

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const allQuestions = [
  {
    question: "Quem escreveu a letra do Hino de Guarapuava?",
    options: ["Luiz Eulógio Zilli", "Gilda Boscardim Todeschini", "Dom Pedro II", "Visconde de Guarapuava"],
    correctAnswer: "Gilda Boscardim Todeschini",
  },
  {
    question: "Quem compôs a música do hino?",
    options: ["Luiz Eulógio Zilli", "Villa-Lobos", "Carlos Gomes", "Dom Pedro I"],
    correctAnswer: "Luiz Eulógio Zilli",
  },
  {
    question: "Onde está exposta a partitura original do hino?",
    options: ["Na Câmara Municipal", "No Museu Visconde de Guarapuava", "Na Catedral", "Na Biblioteca Nacional"],
    correctAnswer: "No Museu Visconde de Guarapuava",
  },
  {
    question: "O hino exalta principalmente:",
    options: ["Tecnologia moderna", "Natureza e cultura local", "Indústria pesada", "Comércio exterior"],
    correctAnswer: "Natureza e cultura local",
  },
  {
    question: "A letra menciona qual elemento da natureza?",
    options: ["Sol", "Neve", "Deserto", "Oceano"],
    correctAnswer: "Sol",
  },
  {
    question: "Guarapuava é descrita como:",
    options: ["Uma fortaleza antiga", "Uma menina radiante", "Uma metrópole industrial", "Uma estrela distante"],
    correctAnswer: "Uma menina radiante",
  },
  {
    question: "O hino celebra o quê?",
    options: ["Conquistas esportivas", "História e identidade da cidade", "Guerras antigas", "Riquezas minerais"],
    correctAnswer: "História e identidade da cidade",
  },
  {
    question: "O hino foi adotado oficialmente como:",
    options: ["Hino estadual", "Hino municipal", "Hino nacional", "Canção folclórica"],
    correctAnswer: "Hino municipal",
  },
  {
    question: "A partitura original foi entregue ao município em um ato de:",
    options: ["Venda pública", "Resgate cultural", "Competição musical", "Doação anônima"],
    correctAnswer: "Resgate cultural",
  },
  {
    question: "O hino representa principalmente:",
    options: ["Orgulho e identidade local", "Riqueza financeira", "Poder militar", "Expansão territorial"],
    correctAnswer: "Orgulho e identidade local",
  },
];

// --- COMPONENTE PRINCIPAL ---

export default function Quiz() {
  const [questions, setQuestions] = useState(() =>
    shuffleArray(allQuestions).slice(0, 5)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;

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

  // Função de Compartilhar
  const handleShare = async () => {
    try {
      const linkApp = ""; // Se subir no Drive, cole o link aqui
      const mensagem = `Fiz o Quiz do Hino de Guarapuava e acertei ${score} de ${questions.length} perguntas! ✨\n\nConsegue fazer melhor? ${linkApp}`;
      
      await Share.share({
        message: mensagem,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar.");
    }
  };

  function handleAnswer(option: string) {
    if (selected !== null) return;
    setSelected(option);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function restartQuiz() {
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
          headerStyle: { backgroundColor: "#0b1f3a" },
          headerTintColor: "#fff",
        }}
      />

      {finished ? (
        <View style={styles.centerContent}>
          <Text style={styles.title}>Resultado Final</Text>
          <Text style={styles.scoreText}>
            Você acertou {score} de {questions.length}
          </Text>

          {/* BOTÃO COMPARTILHAR */}
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Compartilhar Resultado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Jogar novamente</Text>
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

          <ScrollView contentContainerStyle={styles.quizContent}>
            <Text style={styles.progressLabel}>
              Pergunta {currentQuestion + 1} de {questions.length}
            </Text>

            <Text style={styles.questionText}>{currentData.question}</Text>

            {currentOptions.map((option, index) => {
              const isCorrect = option === currentData.correctAnswer;
              const isSelected = option === selected;

              let backgroundColor = "#1c2e4a";
              if (selected !== null) {
                if (isCorrect) backgroundColor = "#1f8a3d";
                else if (isSelected) backgroundColor = "#8a1f1f";
              }

              return (
                <TouchableOpacity
                  key={`${currentQuestion}-${index}`}
                  style={[styles.optionButton, { backgroundColor }]}
                  onPress={() => handleAnswer(option)}
                  activeOpacity={selected ? 1 : 0.7}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}

            {selected !== null && (
              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>
                  {currentQuestion + 1 === questions.length ? "Finalizar" : "Próxima Pergunta"}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1f3a",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#1c2e4a",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFD700",
  },
  quizContent: {
    padding: 24,
    paddingTop: 30,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  progressLabel: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 22,
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 40,
  },
  questionText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 32,
  },
  optionButton: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  optionText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
  },
  nextButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#0b1f3a",
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: "#25D366", // Verde WhatsApp
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },
  shareButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  restartButton: {
    backgroundColor: "#FFD700",
    padding: 18,
    borderRadius: 14,
  },
  restartButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#0b1f3a",
    fontSize: 16,
  },
});