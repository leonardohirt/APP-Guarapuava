import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const lyrics = [
  { text: "O Sol surgiu, um dia, mais brilhante", start: 4000, end: 7000 },
  { text: "E foi, risonho as flores acordar.", start: 8000, end: 11000 },
  { text: "O riacho, sobre as pedras, a cantar", start: 12000, end: 16000 },
  { text: "A cidade que surgia triunfante!", start: 17000, end: 20000 },
  { text: "Com fervor, nós te saudamos, Guarapuava", start: 21000, end: 25000 },
  { text: "Neste hino de Louvor!", start: 26000, end: 30000 },
  { text: "Teu vulto sem igual", start: 31000, end: 32000 },
  { text: "Pinheiro magistral", start: 33000, end: 35000 },
  { text: "Eu sempre hei de cantar com ardor!", start: 36000, end: 39000 },
  { text: "Vaqueiro colossal,", start: 40000, end: 41000 },
  { text: "Figura imortal", start: 42000, end: 43000 },
  { text: "Guarapuava é teu grande amor!", start: 44000, end: 48000 },
  { text: "O Sol doura o campo verdejante", start: 49000, end: 52000 },
  { text: "A brisa, os trigais a balouçar", start: 53000, end: 56000 },
  { text: "Guarapuava é menina radiante", start: 57000, end: 62000 },
  { text: "Com o ouro dos trigais a se enfeitar!", start: 63000, end: 65000 },
  { text: "Com fervor, nós te saudamos, Guarapuava", start: 66000, end: 70000 },
  { text: "Neste hino de Louvor!", start: 71000, end: 75000 },
  { text: "Teu vulto sem igual", start: 76000, end: 77000 },
  { text: "Pinheiro magistral", start: 78000, end: 80000 },
  { text: "Eu sempre hei de cantar com ardor!", start: 81000, end: 84000 },
  { text: "Vaqueiro colossal,", start: 85000, end: 86000 },
  { text: "Figura imortal", start: 87000, end: 88000 },
  { text: "Guarapuava é teu grande amor!", start: 89000, end: 93000 },
];

export default function Hino() {
  const sound = useRef<Audio.Sound | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [currentLine, setCurrentLine] = useState<number | null>(null);

  async function toggleAudio() {
    if (!sound.current) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/audio/hino.mp3"),
        { shouldPlay: true }
      );
      sound.current = newSound;
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        setPosition(status.positionMillis);
        if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentLine(null);
        }
      });
    } else {
      if (isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.current.playAsync();
        setIsPlaying(true);
      }
    }
  }

  useEffect(() => {
    const lineIndex = lyrics.findIndex(
      (line) => position >= line.start && position <= line.end
    );

    if (lineIndex !== -1 && lineIndex !== currentLine) {
      setCurrentLine(lineIndex);
      // Ajuste suave do scroll para manter a letra centralizada
      scrollRef.current?.scrollTo({
        y: lineIndex * 45, 
        animated: true,
      });
    }
  }, [position]);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Hino de Guarapuava",
          headerStyle: { backgroundColor: "#0b1f3a" },
          headerTintColor: "#fff",
        }}
      />

      <View style={styles.headerCard}>
        <Text style={styles.subtitle}>Símbolo da nossa história</Text>
        <TouchableOpacity 
          style={[styles.playButton, isPlaying && styles.pauseButton]} 
          onPress={toggleAudio}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? "⏸ PAUSAR HINO" : "▶ TOCAR HINO"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lyricsWrapper}>
        <ScrollView 
          ref={scrollRef} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {lyrics.map((line, index) => (
            <Text
              key={index}
              style={[
                styles.lyric,
                index === currentLine && styles.activeLyric,
              ]}
            >
              {line.text}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1f3a",
  },
  headerCard: {
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 15,
  },
  playButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  pauseButton: {
    backgroundColor: "#fff",
  },
  playButtonText: {
    color: "#0b1f3a",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  lyricsWrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingVertical: 100,
  },
  lyric: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
    marginVertical: 12,
    lineHeight: 24,
  },
  activeLyric: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    transform: [{ scale: 1.1 }],
  },
});