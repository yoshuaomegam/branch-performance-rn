import {useState, useCallback, useMemo} from 'react';

const sharedData      = require('../data/shared.json');
const overviewData    = require('../data/overview.json');
const bisnisData      = require('../data/bisnis.json');
const strategiData    = require('../data/strategi.json');
const finansialData   = require('../data/finansial.json');
const operasionalData = require('../data/operasional.json');

export const TABS = ['Overview', 'Bisnis', 'Strategi', 'Finansial', 'Operasional'] as const;
export type TabName = (typeof TABS)[number];

const TAB_DATA: Record<TabName, any> = {
  Overview:    overviewData,
  Bisnis:      bisnisData,
  Strategi:    strategiData,
  Finansial:   finansialData,
  Operasional: operasionalData,
};

export function useBranchPerformance() {
  const [selectedTab, setSelectedTab] = useState<TabName>('Overview');

  const handleTabChange = useCallback((tab: string) => {
    setSelectedTab(tab as TabName);
  }, []);

  const tabData = useMemo(() => TAB_DATA[selectedTab], [selectedTab]);

  return {
    // ── Shared — always available regardless of tab ──
    cabang:      sharedData.cabang,
    periode:     sharedData.periode,
    periodeList: sharedData.periodeList,
    cabangList:  sharedData.cabangList,
    skorCabang:  sharedData.skorCabang,   // needed by Header on all tabs

    // ── Overview tab ──
    pesanRCEO:       tabData.pesanRCEO,
    trenSkor:        tabData.trenSkor,
    alertProyeksi:   tabData.alertProyeksi,
    skorBisnis:      tabData.skorBisnis,
    skorStrategi:    tabData.skorStrategi,
    skorFinansial:   tabData.skorFinansial,
    skorOperasional: tabData.skorOperasional,
    temuanAudit:     tabData.temuanAudit,
    marketShare:     tabData.marketShare,
    ringkasanKPI:    tabData.ringkasanKPI,

    // ── Bisnis tab ──
    bisnisDPK:       tabData.bisnisDPK,
    bisnisKredit:    tabData.bisnisKredit,
    bisnisKopra:     tabData.bisnisKopra,
    bisnisLivin:     tabData.bisnisLivin,
    bisnisMerchant:  tabData.bisnisMerchant,
    bisnisRingkasan: tabData.bisnisRingkasan,

    // ── Navigation ──
    selectedTab,
    TABS,
    handleTabChange,
  };
}
