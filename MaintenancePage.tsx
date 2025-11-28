import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import LoadingDots from './components/LoadingDots';

// Charger le logo local
const logoSoiby = require('./assets/SOIBY_LOGO_web.png');

export default function MaintenancePage() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logoSoiby} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Message principal */}
        <View style={styles.mainMessage}>
          <View style={styles.header}>
            <AlertTriangle color="#F59E0B" width={24} height={24} />
            <Text style={styles.title}>Maintenance en cours</Text>
          </View>
          <Text style={styles.description}>
            Notre site web fait actuellement l'objet d'une intervention technique 
            suite à un incident de sécurité.
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
  <Clock color="#2563EB" width={20} height={20} />
  <View style={{ marginLeft: 8, flex: 1 }}>
    <Text style={styles.infoTitle}>Que se passe-t-il ?</Text>
    <Text style={styles.infoText}>
      Nos équipes travaillent activement pour résoudre ce problème et 
      sécuriser votre expérience. Nous mettons tout en œuvre pour rétablir 
      le service dans les plus brefs délais.
    </Text>
  </View>
</View>


        {/* Contact Info */}
        <View style={styles.contact}>
          <Text style={styles.contactText}>Nous nous excusons pour la gêne occasionnée.</Text>
          <Text style={styles.contactText}>
            Pour toute urgence, veuillez nous contacter à{' '}
            <Text style={styles.contactLink} onPress={() => Linking.openURL('mailto:contact@soiby.fr')}>
              contact@soiby.fr
            </Text>
          </Text>
          <LoadingDots />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>© 2025 SOIBY - Tous droits réservés</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 768,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 300,
    height: 200,
  },
  mainMessage: {
    alignItems: 'center',
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  description: {
    color: '#4B5563',
    fontSize: 18,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    borderRadius: 8,
    padding: 24,
    marginBottom: 32,
  },
  infoTitle: {
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  infoText: {
    color: '#1E40AF',
    fontSize: 14,
    lineHeight: 20,
  },
  contact: {
    alignItems: 'center',
    marginBottom: 32,
  },
  contactText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
  contactLink: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  footer: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
});
