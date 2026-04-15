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

// Bisnis DPK types
export interface DPKPerbandingan {
  tanggal: string;
  nilai: string;
  growth: string;
  growthUp: boolean;
}

export interface DPKEndingBalance {
  label: string;
  tanggal: string;
  nilai: string;
  target: string;
  keterangan: string;
  keteranganUp: boolean;
  perbandingan: DPKPerbandingan[];
}

export interface BreakdownItem {
  label: string;
  pct: number;
  warna: string;
}

export interface DPKTableRow {
  produk: string;
  cif: string;
  balance: string;
  target: string;
  capaian: string;
  growth: string;
  growthUp: boolean;
  balanceStatus: MetricStatus;
  capaianStatus: MetricStatus;
}

export interface DPKBarTable {
  judul: string;
  periodList: string[];
  breakdown: BreakdownItem[];
  rows: DPKTableRow[];
}

export interface AkuisiChurnStat {
  label: string;
  nilai: string;
  keterangan: string;
  keteranganStatus: 'good' | 'warning' | 'bad' | 'neutral';
}

export interface AkuisiChurnRincian {
  segmen: string;
  akuisisi: number;
  churn: number;
  nett: number;
  nettUp: boolean;
}

export interface AkuisiChurn {
  stats: AkuisiChurnStat[];
  rincian: AkuisiChurnRincian[];
}

export interface TrendSeries {
  label: string;
  warna: string;
  nilai: (number | null)[];
}

export interface TrendMetrik {
  nama: string;
  y2024: string;
  y2025: string;
  y2026: string;
}

export interface TrendEndbal {
  subtitle: string;
  bulan: string[];
  series: TrendSeries[];
  metrik: TrendMetrik[];
  catatan: string;
}

export interface BisnisDPK {
  endingBalance: DPKEndingBalance;
  rincianDPK: DPKBarTable;
  tabungan3PI: DPKBarTable;
  akuisiChurn: AkuisiChurn;
  trendEndbal: TrendEndbal;
}

export interface PencapaianRow {
  produk: string;
  kategori: string;
  aktual: string;
  target: string;
  capaian: string;
  growth: string;
  growthUp: boolean;
  statusCapaian: MetricStatus;
}

export interface RingkasanPencapaian {
  periodList: string[];
  rows: PencapaianRow[];
}

export interface BisnisRingkasan {
  ringkasanPencapaian: RingkasanPencapaian;
}

// Bisnis Kredit types
export interface KreditKPIStat {
  label: string;
  nilai: string;
  keterangan: string;
  keteranganStatus: 'good' | 'warning' | 'bad' | 'neutral';
  target?: string;
}

export interface KreditRingkasanKPIData {
  stats: KreditKPIStat[];
}

export interface KreditBookingStat {
  label: string;
  nilai: string;
  target?: string;
  keteranganStatus: 'good' | 'warning' | 'bad' | 'neutral';
}

export interface KreditBookingData {
  chips: string[];
  stats: KreditBookingStat[];
}

export interface TrenPencairanBar {
  date: string;   // ISO "2026-03-30"
  label: string;  // display "30 Mar"
  nilai: number;
}

export interface TrenPencairanData {
  chips: string[];
  allBars: TrenPencairanBar[];
  defaultRange: { start: string; end: string };
}

export interface KreditProdukGrowth {
  pct: string;
  up: boolean;
}

export interface KreditProdukItem {
  label: string;
  nilai: string;
  npl?: string;
  growth: Record<string, KreditProdukGrowth>;
}

export interface ShiftingRow {
  fromKol: string;
  toValues: (number | null)[];
}

export interface ShiftingSummary {
  label: string;
  warna: string;
  rekening: string;
  nilai: string;
}

export interface ShiftingKolektibilitas {
  kolList: string[];
  rows: ShiftingRow[];
  summary: ShiftingSummary[];
}

export interface KreditProdukData {
  chips: string[];
  produkList: KreditProdukItem[];
  shiftingByProduk: Record<string, ShiftingKolektibilitas>;
}

export interface BisnisKredit {
  endingBalance: DPKEndingBalance;
  ringkasanKPI: KreditRingkasanKPIData;
  booking: KreditBookingData;
  trendPencairan: TrenPencairanData;
  produk: KreditProdukData;
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
