import { Stack } from "expo-router";
import { MotiView } from 'moti';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Config() {
  const version = "1.1.0"; 
  const devName = "Leonardo Hirt Moraes"; 

  const abrirLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Informações",
          headerStyle: { backgroundColor: "#0b1f3a" },
          headerTintColor: "#fff" 
        }} 
      />

      <MotiView 
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.header}
      >
        <Image 
          source={require("../assets/images/icon.png")} 
          style={styles.logo}
        />
        <Text style={styles.appName}>Hino de Guarapuava</Text>
        <Text style={styles.versionText}>Versão {version}</Text>
      </MotiView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESENVOLVIMENTO</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Criado por:</Text>
          <Text style={styles.value}>{devName}</Text>
          
          <TouchableOpacity 
            style={styles.buttonLink} 
            onPress={() => abrirLink('https://github.com/leonardohirt')}
          >
            <Text style={styles.buttonLinkText}>🌐 Ver Portfólio</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CRÉDITOS & FONTES</Text>
        <View style={styles.card}>
          <Text style={styles.infoText}>• Letra: Gilda Todeschini</Text>
          <Text style={styles.infoText}>• Melodia: Bento Mossurunga</Text>
          <Text style={styles.infoText}>• Imagens: Acervo Histórico Municipal</Text>
        </View>
      </View>

      <Text style={styles.copy}>© 2026 Guarapuava Digital.{"\n"}Todos os direitos reservados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1f3a", padding: 20 },
  header: { alignItems: 'center', marginVertical: 30 },
  logo: { width: 80, height: 80, borderRadius: 15, marginBottom: 15 },
  appName: { color: '#FFD700', fontSize: 22, fontWeight: 'bold' },
  versionText: { color: '#fff', opacity: 0.5, fontSize: 14 },
  section: { marginBottom: 25 },
  sectionTitle: { color: '#FFD700', fontSize: 12, fontWeight: 'bold', marginBottom: 10, letterSpacing: 1 },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 15, padding: 15 },
  label: { color: '#fff', opacity: 0.6, fontSize: 12 },
  value: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  buttonLink: { backgroundColor: '#FFD700', padding: 8, borderRadius: 8, alignSelf: 'flex-start' },
  buttonLinkText: { color: '#0b1f3a', fontWeight: 'bold', fontSize: 12 },
  infoText: { color: '#fff', fontSize: 14, marginBottom: 5, opacity: 0.8 },
  copy: { textAlign: 'center', color: '#fff', opacity: 0.3, fontSize: 11, marginTop: 'auto', marginBottom: 20 }
});