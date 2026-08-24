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
        y: Math.max(0, lineIndex * 54 - 100), 
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

      {/* DOCK DO PLAYER DE MÚSICA */}
      <View style={styles.playerDock}>
        <View style={styles.badgeRow}>
          <View style={styles.audioBadge}>
            <Text style={styles.audioBadgeText}>🎼 SÍMBOLO OFICIAL</Text>
          </View>
        </View>

        <Text style={styles.playerTitle}>Hino Municipal de Guarapuava</Text>
        <Text style={styles.playerCredits}>
          Letra: <Text style={styles.highlightCredit}>Gilda Todeschini</Text> • Música: <Text style={styles.highlightCredit}>Luiz E. Zilli</Text>
        </Text>

        {/* CONTROLE DE REPRODUÇÃO */}
        <TouchableOpacity 
          style={[styles.playButton, isPlaying && styles.pauseButton]} 
          onPress={toggleAudio}
          activeOpacity={0.85}
        >
          <Text style={[styles.playButtonIcon, isPlaying && styles.pauseButtonIcon]}>
            {isPlaying ? "⏸" : "▶"}
          </Text>
          <Text style={[styles.playButtonText, isPlaying && styles.pauseButtonText]}>
            {isPlaying ? "PAUSAR HINO" : "REPRODUZIR HINO"}
          </Text>
        </TouchableOpacity>

        {/* TIMELINE DE PROGRESSO */}
        <View style={styles.progressSection}>
          <View style={styles.trackBackground}>
            <View style={[styles.trackFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatMillis(position)}</Text>
            <Text style={styles.timeText}>{duration > 0 ? formatMillis(duration) : "01:33"}</Text>
          </View>
        </View>
      </View>

      {/* LETRA TELEPROMPTER */}
      <View style={styles.lyricsContainer}>
        <View style={styles.lyricsHeaderPill}>
          <Text style={styles.lyricsHeaderText}>ACOMPANHE A LETRA</Text>
        </View>

        <ScrollView 
          ref={scrollRef} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lyricsScrollContent}
        >
          {lyrics.map((line, index) => {
            const isActive = index === currentLine;
            return (
              <MotiView
                key={index}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ type: 'timing', duration: 250 }}
                style={[
                  styles.lyricCard,
                  isActive && styles.activeLyricCard
                ]}
              >
                <Text style={[styles.lyricText, isActive && styles.activeLyricText]}>
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
  playerDock: {
    backgroundColor: colors.cardGlass,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  audioBadge: {
    backgroundColor: colors.goldLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  audioBadgeText: {
    color: colors.goldBright,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  playerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.3,
  },
  playerCredits: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  highlightCredit: {
    color: colors.goldChampagne,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  pauseButton: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: colors.gold,
    shadowOpacity: 0.1,
  },
  playButtonIcon: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: 'bold',
  },
  pauseButtonIcon: {
    color: colors.goldBright,
  },
  playButtonText: {
    color: colors.textDark,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
  pauseButtonText: {
    color: colors.goldBright,
  },
  progressSection: {
    marginTop: 16,
  },
  trackBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: colors.gold,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: colors.textSubtle,
    fontSize: 11,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  lyricsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  lyricsHeaderPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.cardBorderSubtle,
  },
  lyricsHeaderText: {
    color: colors.textSubtle,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  lyricsScrollContent: {
    paddingVertical: 20,
    paddingBottom: 60,
  },
  lyricCard: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 3,
    alignItems: 'center',
  },
  activeLyricCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  lyricText: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  activeLyricText: {
    color: colors.goldBright,
    fontSize: 18,
    fontWeight: '800',
  },
});