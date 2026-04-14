import {useState, useCallback} from 'react';
import rawData from '../data/branchPerformanceData.json';

const data = rawData as any;

export function useBranchPerformance() {
  const [selectedTab, setSelectedTab] = useState<string>('Overview');

  const TABS = ['Overview', 'Bisnis', 'Strategi', 'Finansial', 'Operasional'];

  const handleTabChange = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  return {
    cabang: data.cabang,
    periode: data.periode,
    pesanRCEO: data.pesanRCEO,
    skorCabang: data.skorCabang,
    trenSkor: data.trenSkor,
    alertProyeksi: data.alertProyeksi,
    skorBisnis: data.skorBisnis,
    skorStrategi: data.skorStrategi,
    skorFinansial: data.skorFinansial,
    skorOperasional: data.skorOperasional,
    temuanAudit: data.temuanAudit,
    marketShare: data.marketShare,
    ringkasanKPI: data.ringkasanKPI,
    selectedTab,
    TABS,
    handleTabChange,
  };
}
