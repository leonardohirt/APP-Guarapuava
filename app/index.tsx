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

          {/* BOTÕES DE AÇÃO PRINCIPAIS - O TRIO INSTITUCIONAL */}
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

            {/* HISTÓRIA GANHANDO DESTAQUE NO TOPO */}
            <Link href="/historia" asChild>
              <TouchableOpacity style={styles.historyButton} activeOpacity={0.8}>
                <Text style={styles.historyButtonText}>📜 HISTÓRIA E SÍMBOLOS</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

{/* SEÇÃO DE NAVEGAÇÃO (CARDS) */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuLabel}>EXPLORE MAIS</Text>

          {/* 1. CARD LETRA - Essencial para quem quer ler enquanto ouve */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push("/hino")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Letra do Hino</Text>
              <Text style={styles.cardText}>Acompanhe os versos de Gilda Todeschini.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 2. CARD FOTOS HISTÓRICAS - O impacto visual da evolução */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push("/fotos")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Ontem e Hoje</Text>
              <Text style={styles.cardText}>Veja a evolução de Guarapuava através de fotos.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 3. CARD CURIOSIDADES - Fatos rápidos e educativos */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push("/curiosidades")}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Você Sabia?</Text>
              <Text style={styles.cardText}>Fatos fascinantes sobre nossa terra.</Text>
            </View>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>

          {/* 4. CARD LENDAS - O fechamento com o mistério local */}
          <TouchableOpacity 
            style={[styles.card, { borderColor: 'rgba(155, 89, 182, 0.4)', borderWidth: 1 }]} 
            activeOpacity={0.7}
            onPress={() => router.push("/lendas")}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: '#9b59b6' }]}>Mistérios e Lendas</Text>
              <Text style={styles.cardText}>As histórias que o povo conta através das gerações.</Text>
            </View>
            <Text style={[styles.cardArrow, { color: '#9b59b6' }]}>→</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Orgulho de ser Guarapuavano</Text>
        <View style={{ height: 40 }} />
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
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  historyButtonText: {
    color: '#fff',
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