import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {Colors, Spacing} from '../../theme';
import {Header} from '../../components/common/Header';
import {BranchBanner} from '../../components/dashboard/BranchBanner';
import {PesanRCEO} from '../../components/dashboard/PesanRCEO';
import {SkorCabangCard} from '../../components/dashboard/SkorCabangCard';
import {TrenSkorBulanan} from '../../components/dashboard/TrenSkorBulanan';
import {AlertProyeksi} from '../../components/dashboard/AlertProyeksi';
import {SkorSectionCard} from '../../components/dashboard/SkorSectionCard';
import {TemuanAudit} from '../../components/dashboard/TemuanAudit';
import {MarketShare} from '../../components/dashboard/MarketShare';
import {RingkasanKPI} from '../../components/dashboard/RingkasanKPI';
import {useBranchPerformance} from '../../hooks/useBranchPerformance';

export function DashboardKinerjaCabangScreen() {
  const {
    cabang,
    pesanRCEO,
    skorCabang,
    trenSkor,
    alertProyeksi,
    skorBisnis,
    skorStrategi,
    skorFinansial,
    skorOperasional,
    temuanAudit,
    marketShare,
    ringkasanKPI,
    selectedTab,
    TABS,
    handleTabChange,
  } = useBranchPerformance();

  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surfaceDark} />

      {/* Fixed Header */}
      <Header
        title="Dashboard Kinerja Cabang"
        cabangNama={cabang.nama}
        area={cabang.area}
        pimpinan={cabang.pimpinan}
        onNotificationPress={() => {}}
      />

      {/* Fixed Branch Banner with tabs */}
      <BranchBanner
        cabang={cabang}
        skor={skorCabang.skor}
        kategori={skorCabang.kategori}
        activeTab={selectedTab}
        tabs={TABS}
        onTabChange={handleTabChange}
      />

      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }>

        {/* Pesan RCEO */}
        <PesanRCEO pesan={pesanRCEO} />

        {/* Skor Cabang */}
        <SkorCabangCard data={skorCabang} />

        {/* Tren Skor Bulanan */}
        <TrenSkorBulanan data={trenSkor} />

        {/* Alert dan Proyeksi */}
        <AlertProyeksi items={alertProyeksi} />

        {/* Skor Bisnis */}
        <SkorSectionCard title="Skor Bisnis" data={skorBisnis} />

        {/* Skor Strategi */}
        <SkorSectionCard title="Skor Strategi" data={skorStrategi} />

        {/* Skor Finansial */}
        <SkorSectionCard title="Skor Finansial" data={skorFinansial} />

        {/* Skor Operasional */}
        <SkorSectionCard title="Skor Operasional" data={skorOperasional} />

        {/* Ringkasan Temuan Audit */}
        <TemuanAudit data={temuanAudit} />

        {/* Market Share */}
        <MarketShare data={marketShare} />

        {/* Ringkasan KPI */}
        <RingkasanKPI data={ringkasanKPI} />

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceDark,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  bottomPad: {
    height: Spacing.xxl,
  },
});
