import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Path,
  G,
  Circle,
} from 'react-native-svg';
import {Colors, Spacing, Typography} from '../../theme';

// ── Inline SVG icons (no external packages) ──────────────────

function IconUser() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke={Colors.textSecondary}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Circle
        cx={12}
        cy={7}
        r={4}
        stroke={Colors.textSecondary}
        strokeWidth={1.8}
      />
    </Svg>
  );
}

function IconLock() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z"
        stroke={Colors.textSecondary}
        strokeWidth={1.8}
      />
      <Path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke={Colors.textSecondary}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Circle cx={12} cy={16} r={1.2} fill={Colors.textSecondary} />
    </Svg>
  );
}

function IconEye({visible}: {visible: boolean}) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      {visible ? (
        <>
          <Path
            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"
            stroke={Colors.textSecondary}
            strokeWidth={1.8}
          />
          <Circle
            cx={12}
            cy={12}
            r={3}
            stroke={Colors.textSecondary}
            strokeWidth={1.8}
          />
        </>
      ) : (
        <>
          <Path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
            stroke={Colors.textSecondary}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Path
            d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
            stroke={Colors.textSecondary}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Path
            d="M14.12 14.12a3 3 0 1 1-4.24-4.24"
            stroke={Colors.textSecondary}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          <Path
            d="m1 1 22 22"
            stroke={Colors.textSecondary}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </>
      )}
    </Svg>
  );
}

// ── Logo mark ─────────────────────────────────────────────────

function BrandMark() {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56">
      <G>
        {/* Outer ring */}
        <Circle cx={28} cy={28} r={26} fill="rgba(255,255,255,0.1)" />
        {/* M letterform */}
        <Path
          d="M14 38 L14 18 L22 30 L28 20 L34 30 L42 18 L42 38"
          stroke="#FFFFFF"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  );
}

// ── Main screen ───────────────────────────────────────────────

export function LoginScreen({onLogin}: {onLogin: () => void}) {
  const [idPegawai, setIdPegawai] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = idPegawai.trim().length > 0 && password.length > 0;

  function handleLogin() {
    if (!canSubmit || loading) return;
    setError('');
    setLoading(true);
    // Simulate auth — replace with real API call
    setTimeout(() => {
      setLoading(false);
      if (idPegawai.trim() === '123456' && password === 'password') {
        onLogin();
      } else {
        setError('ID Pegawai atau kata sandi tidak valid.');
      }
    }, 1200);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* ── Brand section ──────────────────────────── */}
          <View style={styles.brandSection}>
            <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
              <Defs>
                <LinearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
                  <Stop offset="0" stopColor="#0D1E2D" />
                  <Stop offset="1" stopColor="#0A3A5C" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#bg)" />
            </Svg>

            {/* Decorative circle top-right */}
            <View style={styles.decorCircle} />

            <View style={styles.brandContent}>
              <BrandMark />
              <Text style={styles.brandName}>Branch Performance</Text>
              <Text style={styles.brandTagline}>
                Pantau kinerja cabang secara real-time
              </Text>
            </View>
          </View>

          {/* ── Form card ──────────────────────────────── */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Masuk</Text>
            <Text style={styles.formSubtitle}>
              Gunakan akun pegawai Anda untuk melanjutkan
            </Text>

            {/* Error banner */}
            {error.length > 0 && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* ID Pegawai */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>ID Pegawai</Text>
              <View style={[styles.inputWrap, error && styles.inputWrapError]}>
                <View style={styles.inputIcon}>
                  <IconUser />
                </View>
                <TextInput
                  style={styles.input}
                  value={idPegawai}
                  onChangeText={v => {
                    setIdPegawai(v);
                    setError('');
                  }}
                  placeholder="Masukkan ID pegawai"
                  placeholderTextColor={Colors.placeholder}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Kata Sandi */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Kata Sandi</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.forgotLink}>Lupa kata sandi?</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.inputWrap, error && styles.inputWrapError]}>
                <View style={styles.inputIcon}>
                  <IconLock />
                </View>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={v => {
                    setPassword(v);
                    setError('');
                  }}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor={Colors.placeholder}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(v => !v)}
                  activeOpacity={0.6}>
                  <IconEye visible={showPassword} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={[styles.loginBtn, !canSubmit && styles.loginBtnDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={!canSubmit || loading}>
              {loading ? (
                <ActivityIndicator color={Colors.textWhite} size="small" />
              ) : (
                <Text style={styles.loginBtnText}>Masuk</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footerNote}>
              Akses hanya untuk pegawai yang berwenang
            </Text>
          </View>

          {/* Version */}
          <Text style={styles.version}>v1.0.0</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {flex: 1},
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceDark,
  },
  scroll: {
    flexGrow: 1,
  },

  // Brand section
  brandSection: {
    height: 280,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  decorCircle: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  brandContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl + 8,
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  brandName: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: '800',
    color: Colors.textWhite,
    letterSpacing: 0.3,
  },
  brandTagline: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '400',
  },

  // Form card
  formCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 4,
    paddingBottom: Spacing.xxl,
  },
  formTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  formSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    lineHeight: 18,
  },

  // Error
  errorBanner: {
    backgroundColor: Colors.dangerLight,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: Colors.danger,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.dangerDark,
    fontWeight: '500',
  },

  // Fields
  fieldGroup: {
    marginBottom: Spacing.base,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  fieldLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    height: 52,
    paddingHorizontal: Spacing.sm + 2,
  },
  inputWrapError: {
    borderColor: Colors.danger,
  },
  inputIcon: {
    marginRight: Spacing.sm,
    opacity: 0.8,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: Spacing.xs,
    marginLeft: Spacing.xs,
  },

  // Forgot
  forgotLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },

  // Button
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnDisabled: {
    backgroundColor: Colors.placeholder,
    shadowOpacity: 0,
    elevation: 0,
  },
  loginBtnText: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textWhite,
    letterSpacing: 0.3,
  },

  // Footer
  footerNote: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  version: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
    paddingVertical: Spacing.base,
    backgroundColor: Colors.surfaceDark,
  },
});
