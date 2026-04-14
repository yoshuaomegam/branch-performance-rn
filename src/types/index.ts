export type MetricStatus = 'good' | 'warning' | 'bad';

export interface SelectOption {
  label: string;
  value: string;
}

// Legacy types kept for backward compat
export interface KPIRingkasan {
  skorKPI: number;
  rankCabang: number;
  totalCabang: number;
  kategori: string;
  trend: 'up' | 'down' | 'flat';
  persentaseNaik: number;
}

export interface GrafikBulanan {
  judul: string;
  bulan: string[];
  pencapaian: number[];
  target: number[];
}

export interface MetricItem {
  id: string;
  nama: string;
  target: number;
  realisasi: number;
  pencapaian: number;
  status: MetricStatus;
  satuan: string;
  formatRingkas?: boolean;
  keterangan?: string;
  inversed?: boolean;
}

export interface MetricSection {
  judul: string;
  items: MetricItem[];
}

// New types matching revised design
export interface CabangInfo {
  id: string;
  nama: string;
  kota: string;
  area: string;
  pimpinan: string;
}

export interface PesanRCEO {
  teks: string;
  penulis: string;
}

export interface SkorKategoriItem {
  id: string;
  nama: string;
  skor: number;
}

export interface SkorCabang {
  skor: number;
  kategori: string;
  periode: string;
  skorKategori: SkorKategoriItem[];
}

export interface TrenDataItem {
  id: string;
  nama: string;
  nilai: number[];
  warna: string;
}

export interface TrenSkor {
  bulan: string[];
  data: TrenDataItem[];
}

export interface AlertItem {
  id: string;
  tipe: 'buruk' | 'warning';
  label: string;
  judul: string;
  deskripsi: string;
  cta: string | null;
}

export interface SkorSubItem {
  id: string;
  nama: string;
  skor: number;
}

export interface SkorSection {
  skor: number;
  periode: string;
  items: SkorSubItem[];
}

export interface DampakItem {
  label: string;
  jumlah: number;
  pct: number;
  warna: string;
}

export interface DurasiItem {
  label: string;
  jumlah: number;
  warna: string;
}

export interface TemuanAudit {
  updatedAt: string;
  total: number;
  open: number;
  levelPct: number;
  levelAt: number;
  levelOver30: number;
  distribusiDampak: DampakItem[];
  durasiOpen: DurasiItem[];
}

export interface BankShare {
  id: string;
  nama: string;
  pct: number;
  warna: string;
}

export interface MarketShare {
  area: string;
  banks: BankShare[];
}

export interface KPIRowItem {
  metrik: string;
  ureg: string;
  target: string;
  capaian: string;
  mom: string;
  statusCapaian: MetricStatus;
}

export interface KPISeksi {
  judul: string;
  items: KPIRowItem[];
}

export interface KPIKategoriData {
  seksi: KPISeksi[];
}

export interface RingkasanKPI {
  kategoriList: string[];
  periodList: string[];
  data: Record<string, KPIKategoriData>;
}

export interface DashboardData {
  cabang: CabangInfo;
  periode: string;
  periodeList: SelectOption[];
  cabangList: SelectOption[];
  pesanRCEO: PesanRCEO;
  skorCabang: SkorCabang;
  trenSkor: TrenSkor;
  alertProyeksi: AlertItem[];
  skorBisnis: SkorSection;
  skorStrategi: SkorSection;
  skorFinansial: SkorSection;
  skorOperasional: SkorSection;
  temuanAudit: TemuanAudit;
  marketShare: MarketShare;
  ringkasanKPI: RingkasanKPI;
}
