import { Link, Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
<Stack.Screen 
  options={{ 
    title: "Início",
    headerShown: true, 
    headerStyle: { backgroundColor: "#0b1f3a" },
    headerTintColor: "#fff",
    headerRight: () => (
      <TouchableOpacity onPress={() => router.push("/config")} style={{ marginRight: 15 }}>
        <Text style={{ fontSize: 20 }}>⚙️</Text>
      </TouchableOpacity>
    ),
  }} 
/>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* SEÇÃO HERO */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>GUARAPUAVA - PR</Text>
          </View>
          <Text style={styles.title}>Hino de{"\n"}Guarapuava</Text>
          <Text style={styles.subtitle}>
            Explore a história, a letra e teste seus conhecimentos sobre o símbolo da nossa terra.
          </Text>

          {/* BOTÕES DE AÇÃO PRINCIPAIS */}
          <View style={styles.actionContainer}>
            <Link href="/hino" asChild>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>▶  OUVIR HINO</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/quiz" asChild>
              <TouchableOpacity style={styles.quizButton} activeOpacity={0.8}>
                <Text style={styles.quizButtonText}>🏆 JOGAR QUIZ</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* SEÇÃO DE NAVEGAÇÃO (CARDS) */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuLabel}>CONHEÇA MAIS</Text>

          {/* CARD LETRA */}
          <Link href="/hino" asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.7}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Letra Completa</Text>
                <Text style={styles.cardText}>Acompanhe os versos de Gilda Todeschini.</Text>
              </View>
              <Text style={styles.cardArrow}>→</Text>
            </TouchableOpacity>
          </Link>

          {/* CARD HISTÓRIA */}
          <Link href="/historia" asChild>
            <TouchableOpacity style={styles.card} activeOpacity={0.7}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>História e Símbolos</Text>
                <Text style={styles.cardText}>A origem e curiosidades da composição.</Text>
              </View>
              <Text style={styles.cardArrow}>→</Text>
            </TouchableOpacity>
          </Link>

          {/* CARD FOTOS HISTÓRICAS */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push("/fotos")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>📸 Ontem e Hoje</Text>
              <Text style={styles.cardText}>Veja a evolução de Guarapuava através de fotos.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* NOVO CARD: CURIOSIDADES */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push("/curiosidades")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>💡 Você Sabia?</Text>
              <Text style={styles.cardText}>Fatos fascinantes e rápidos sobre nossa terra.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>
          
        </View>

        <Text style={styles.footerText}>Orgulho de ser Guarapuavano</Text>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1f3a',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  hero: {
    marginBottom: 40,
  },
  badge: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  badgeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 16,
    lineHeight: 24,
  },
  actionContainer: {
    marginTop: 30,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#0b1f3a',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1,
  },
  quizButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  quizButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  cardText: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  cardArrow: {
    color: '#FFD700',
    fontSize: 20,
    marginLeft: 10,
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 10,
    fontStyle: 'italic'
  }
});