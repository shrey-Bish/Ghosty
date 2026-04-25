import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Share2 } from 'lucide-react-native';

import { colors } from '../theme/colors';

const qrCells = Array.from({ length: 121 }, (_, index) => {
  const row = Math.floor(index / 11);
  const col = index % 11;
  const finder =
    (row < 3 && col < 3) ||
    (row < 3 && col > 7) ||
    (row > 7 && col < 3);
  return finder || (row * 7 + col * 5 + row * col) % 4 === 0;
});

export function QRScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Ghosty QR</Text>
        <Text style={styles.subtitle}>Swap identity first, capture context after.</Text>
      </View>

      <View style={styles.qrCard}>
        <Text style={styles.cardLabel}>Your Ghosty Code</Text>
        <View style={styles.qr}>
          {qrCells.map((active, index) => (
            <View key={index} style={[styles.qrCell, active && styles.qrCellActive]} />
          ))}
          <View style={styles.qrLogo}>
            <Text style={styles.qrLogoText}>G</Text>
          </View>
        </View>
        <Text style={styles.profile}>Alex Rivera · Product Manager · ASU</Text>
        <Text style={styles.handle}>@alexrivera</Text>
        <Pressable style={styles.shareButton}>
          <Share2 size={16} color={colors.amber} />
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR SCAN</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.scanner}>
        <View style={[styles.corner, styles.cornerTopLeft]} />
        <View style={[styles.corner, styles.cornerTopRight]} />
        <View style={[styles.corner, styles.cornerBottomLeft]} />
        <View style={[styles.corner, styles.cornerBottomRight]} />
        <Text style={styles.scanText}>Point at someone's Ghosty QR code</Text>
      </View>

      <Text style={styles.emailLink}>Enter email instead</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 124,
    gap: 22
  },
  header: {
    gap: 5
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13
  },
  qrCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    padding: 20,
    alignItems: 'center',
    gap: 14
  },
  cardLabel: {
    color: colors.amber,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '900',
    alignSelf: 'flex-start'
  },
  qr: {
    width: 222,
    height: 222,
    borderRadius: 18,
    backgroundColor: colors.background,
    padding: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative'
  },
  qrCell: {
    width: `${100 / 11}%`,
    height: `${100 / 11}%`,
    borderRadius: 2
  },
  qrCellActive: {
    backgroundColor: colors.amber
  },
  qrLogo: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    left: 89,
    top: 89
  },
  qrLogoText: {
    color: colors.amber,
    fontWeight: '900',
    fontSize: 20
  },
  profile: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },
  handle: {
    color: colors.teal,
    fontWeight: '900'
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.amberSoft
  },
  shareText: {
    color: colors.amber,
    fontWeight: '900'
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900'
  },
  scanner: {
    height: 236,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  corner: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderColor: colors.amber
  },
  cornerTopLeft: {
    left: 28,
    top: 28,
    borderLeftWidth: 3,
    borderTopWidth: 3
  },
  cornerTopRight: {
    right: 28,
    top: 28,
    borderRightWidth: 3,
    borderTopWidth: 3
  },
  cornerBottomLeft: {
    left: 28,
    bottom: 28,
    borderLeftWidth: 3,
    borderBottomWidth: 3
  },
  cornerBottomRight: {
    right: 28,
    bottom: 28,
    borderRightWidth: 3,
    borderBottomWidth: 3
  },
  scanText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700'
  },
  emailLink: {
    color: colors.teal,
    fontWeight: '900',
    textAlign: 'center'
  }
});
