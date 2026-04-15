import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import {Header} from '../../components/common/Header';
import {PesanRCEO} from '../../components/dashboard/PesanRCEO';
import {SkorCabangCard} from '../../components/dashboard/SkorCabangCard';
import {TrenSkorBulanan} from '../../components/dashboard/TrenSkorBulanan';
import {AlertProyeksi} from '../../components/dashboard/AlertProyeksi';
import {SkorSectionCard} from '../../components/dashboard/SkorSectionCard';
import {TemuanAudit} from '../../components/dashboard/TemuanAudit';
import {MarketShare} from '../../components/dashboard/MarketShare';
import {RingkasanKPI} from '../../components/dashboard/RingkasanKPI';
import {RingkasanPencapaian} from '../../components/bisnis/RingkasanPencapaian';
import {EndingBalanceCard} from '../../components/bisnis/EndingBalanceCard';
import {BarTableCard} from '../../components/bisnis/BarTableCard';
import {AkuisiChurnCard} from '../../components/bisnis/AkuisiChurnCard';
import {TrendEndbalCard} from '../../components/bisnis/TrendEndbalCard';
import {KreditRingkasanKPI} from '../../components/bisnis/KreditRingkasanKPI';
import {KreditBookingCard} from '../../components/bisnis/KreditBookingCard';
import {TrenPencairanChart} from '../../components/bisnis/TrenPencairanChart';
import {KreditProdukCard} from '../../components/bisnis/KreditProdukCard';
import {KopraKeaktifanCard} from '../../components/bisnis/KopraKeaktifanCard';
import {KopraPipelineCard} from '../../components/bisnis/KopraPipelineCard';
import {MerchantPenguasaanCard} from '../../components/bisnis/MerchantPenguasaanCard';
import {MerchantCakupanCard} from '../../components/bisnis/MerchantCakupanCard';
import {MerchantCASACard} from '../../components/bisnis/MerchantCASACard';
import {LivinRingkasanKPI} from '../../components/bisnis/LivinRingkasanKPI';
import {LivinChannelCard} from '../../components/bisnis/LivinChannelCard';
import {LivinTrenChart} from '../../components/bisnis/LivinTrenChart';
import {LivinProgresCard} from '../../components/bisnis/LivinProgresCard';
import {LivinFrekuensiCard} from '../../components/bisnis/LivinFrekuensiCard';
import {useBranchPerformance} from '../../hooks/useBranchPerformance';
import rawData from '../../data/branchPerformanceData.json';

const appData = rawData as any;

const BISNIS_SUB_MENUS = ['Ringkasan', 'DPK', 'Kredit', 'Livin', 'Kopra', 'Merchant'];

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

  const [refreshing, setRefreshing] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState('Ringkasan');

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const isBisnis = selectedTab === 'Bisnis';
  const isOverview = selectedTab === 'Overview';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surfaceDark} />

      {/* Fixed Header */}
      <Header
        title="Dashboard Kinerja Cabang"
        cabangNama={cabang.nama}
        area={cabang.area}
        pimpinan={cabang.pimpinan}
        skor={skorCabang.skor}
        kategori={skorCabang.kategori}
        activeTab={selectedTab}
        tabs={TABS}
        onTabChange={handleTabChange}
        onNotificationPress={() => {}}
      />

      {/* Bisnis sub-menu (sticky below header) */}
      {isBisnis && (
        <View style={styles.subMenuContainer}>
          <View style={styles.subMenuRow}>
            {BISNIS_SUB_MENUS.map(menu => {
              const isActive = activeSubMenu === menu;
              return (
                <TouchableOpacity
                  key={menu}
                  style={[styles.subMenuItem, isActive && styles.subMenuItemActive]}
                  onPress={() => setActiveSubMenu(menu)}
                  activeOpacity={0.8}>
                  <Text style={[styles.subMenuText, isActive && styles.subMenuTextActive]}>
                    {menu}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

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

        {/* ── Overview tab ── */}
        {isOverview && (
          <>
            <PesanRCEO pesan={pesanRCEO} />

            <View style={styles.combinedCard}>
              <SkorCabangCard data={skorCabang} />
              <TrenSkorBulanan data={trenSkor} />
            </View>

            <AlertProyeksi items={alertProyeksi} />

            <SkorSectionCard title="Skor Bisnis" data={skorBisnis} />
            <SkorSectionCard title="Skor Strategi" data={skorStrategi} />
            <SkorSectionCard title="Skor Finansial" data={skorFinansial} />
            <SkorSectionCard title="Skor Operasional" data={skorOperasional} />

            <TemuanAudit data={temuanAudit} />
            <MarketShare data={marketShare} />
            <RingkasanKPI data={ringkasanKPI} />
          </>
        )}

        {/* ── Bisnis tab ── */}
        {isBisnis && activeSubMenu === 'Ringkasan' && (
          <>
            <SkorSectionCard title="Skor Bisnis" data={skorBisnis} />
            <RingkasanPencapaian data={appData.bisnisRingkasan.ringkasanPencapaian} />
          </>
        )}

        {isBisnis && activeSubMenu === 'DPK' && (
          <>
            <EndingBalanceCard data={appData.bisnisDPK.endingBalance} />
            <BarTableCard data={appData.bisnisDPK.rincianDPK} />
            <BarTableCard data={appData.bisnisDPK.tabungan3PI} />
            <AkuisiChurnCard data={appData.bisnisDPK.akuisiChurn} />
            <TrendEndbalCard data={appData.bisnisDPK.trendEndbal} />
          </>
        )}

        {isBisnis && activeSubMenu === 'Kredit' && (
          <>
            <EndingBalanceCard data={appData.bisnisKredit.endingBalance} />
            <KreditRingkasanKPI data={appData.bisnisKredit.ringkasanKPI} />
            <KreditBookingCard data={appData.bisnisKredit.booking} />
            <TrenPencairanChart data={appData.bisnisKredit.trendPencairan} />
            <KreditProdukCard data={appData.bisnisKredit.produk} />
          </>
        )}

        {isBisnis && activeSubMenu === 'Kopra' && (
          <>
            <EndingBalanceCard data={appData.bisnisKopra.endingBalance} />
            <LivinRingkasanKPI data={appData.bisnisKopra.ringkasanKPI} columns={2} />
            <LivinTrenChart data={appData.bisnisKopra.trendUreg} />
            <KopraKeaktifanCard data={appData.bisnisKopra.keaktifan} />
            <KopraPipelineCard data={appData.bisnisKopra.pipeline} />
          </>
        )}

        {isBisnis && activeSubMenu === 'Livin' && (
          <>
            <EndingBalanceCard data={appData.bisnisLivin.endingBalance} />
            <LivinRingkasanKPI data={appData.bisnisLivin.ringkasanKPI} />
            <LivinChannelCard data={appData.bisnisLivin.channel} />
            <LivinTrenChart data={appData.bisnisLivin.trendUreg} />
            <LivinProgresCard data={appData.bisnisLivin.progres} />
            <LivinFrekuensiCard data={appData.bisnisLivin.frekuensi} />
          </>
        )}

        {/* ── Merchant tab ── */}
        {isBisnis && activeSubMenu === 'Merchant' && (
          <>
            {/* EDC section */}
            <EndingBalanceCard data={appData.bisnisMerchant.edc.endingBalance} />
            <LivinRingkasanKPI data={appData.bisnisMerchant.edc.ringkasanKPI} />
            <LivinTrenChart data={appData.bisnisMerchant.edc.trendAkuisisi} />

            {/* Livin Merchant section */}
            <EndingBalanceCard data={appData.bisnisMerchant.livinMerchant.endingBalance} />
            <LivinRingkasanKPI data={appData.bisnisMerchant.livinMerchant.ringkasanKPI} />
            <LivinTrenChart data={appData.bisnisMerchant.livinMerchant.trendAkuisisi} />

            {/* Territory & CASA section */}
            <MerchantPenguasaanCard data={appData.bisnisMerchant.penguasaan} />
            <MerchantCakupanCard data={appData.bisnisMerchant.cakupan} />
            <MerchantCASACard data={appData.bisnisMerchant.casa} />
          </>
        )}

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
  subMenuContainer: {
    backgroundColor: Colors.surfaceLight,
  },
  subMenuRow: {
    flexDirection: 'row',
  },
  subMenuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  subMenuItemActive: {
    borderBottomColor: Colors.textPrimary,
    backgroundColor: Colors.background,
  },
  subMenuText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  subMenuTextActive: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  combinedCard: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  bottomPad: {
    height: Spacing.xxl,
  },
});
