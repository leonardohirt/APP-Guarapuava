import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/colors";

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

function formatMillis(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function Hino() {
  const sound = useRef<Audio.Sound | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLine, setCurrentLine] = useState<number | null>(null);

  async function toggleAudio() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
        if (status.durationMillis) {
          setDuration(status.durationMillis);
        }
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
    if (!isPlaying) return;

    const lineIndex = lyrics.findIndex(
      (line) => position >= line.start && position <= line.end
    );

    if (lineIndex !== -1 && lineIndex !== currentLine) {
      setCurrentLine(lineIndex);
      scrollRef.current?.scrollTo({
        y: Math.max(0, lineIndex * 48 - 120), 
        animated: true,
      });
    }
  }, [position, isPlaying]);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Hino de Guarapuava",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />

      {/* PAINEL DO REPRODUTOR DE ÁUDIO */}
      <View style={styles.headerCard}>
        <Text style={styles.subtitle}>HINO OFICIAL DO MUNICÍPIO</Text>
        <Text style={styles.creditsText}>
          Letra: Gilda B. Todeschini • Música: Luiz E. Zilli
        </Text>

        <TouchableOpacity 
          style={[styles.playButton, isPlaying && styles.pauseButton]} 
          onPress={toggleAudio}
          activeOpacity={0.85}
        >
          <Text style={[styles.playButtonText, isPlaying && styles.pauseButtonText]}>
            {isPlaying ? "⏸ PAUSAR HINO" : "▶ REPRODUZIR HINO"}
          </Text>
        </TouchableOpacity>

        {/* BARRA DE PROGRESSO DO ÁUDIO */}
        {isPlaying && (
          <MotiView 
            from={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            style={styles.progressContainer}
          >
            <View style={styles.trackBackground}>
              <View style={[styles.trackFill, { width: `${progressPercent}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatMillis(position)}</Text>
              <Text style={styles.timeText}>{formatMillis(duration)}</Text>
            </View>
          </MotiView>
        )}
      </View>

      {/* LETRA COM DESTAQUE DA ESTROFE ATIVA */}
      <View style={styles.lyricsWrapper}>
        <ScrollView 
          ref={scrollRef} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {lyrics.map((line, index) => {
            const isActive = index === currentLine;
            return (
              <MotiView
                key={index}
                animate={{
                  scale: isActive ? 1.06 : 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ type: 'timing', duration: 300 }}
              >
                <Text style={[styles.lyric, isActive && styles.activeLyric]}>
                  {line.text}
                </Text>
              </MotiView>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerCard: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  subtitle: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  creditsText: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 16,
  },
  playButton: {
    backgroundColor: colors.gold,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 14,
    width: "100%",
    elevation: 4,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  pauseButton: {
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    borderWidth: 1.5,
    borderColor: colors.gold,
  },
  playButtonText: {
    color: colors.background,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    letterSpacing: 1,
  },
  pauseButtonText: {
    color: colors.gold,
  },
  progressContainer: {
    width: "100%",
    marginTop: 16,
  },
  trackBackground: {
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 3,
    overflow: "hidden",
  },
  trackFill: {
    height: "100%",
    backgroundColor: colors.gold,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  timeText: {
    color: colors.textSubtle,
    fontSize: 11,
    fontWeight: "bold",
  },
  lyricsWrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingVertical: 80,
  },
  lyric: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: "center",
    marginVertical: 14,
    lineHeight: 28,
  },
  activeLyric: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: "bold",
  },
});