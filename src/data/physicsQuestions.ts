import { PhysicsQuestion, LevelData } from '../types/game';

export const LEVEL_CONFIGS: LevelData[] = [
  {
    level: 1,
    facilityName: 'Ruang Pengukuran',
    facilityCode: 'LAB-01-MEASURE',
    topic: 'Besaran Pokok, Turunan, Dimensi & Alat Ukur',
    description: 'Laboratorium dasar kalibrasi alat ukur, jangka sorong, dan analisis dimensi.',
    storyIntro: 'Prof. Mpus mendeteksi gelombang anomali di Ruang Pengukuran! Zombi Hampa mencoba mengaburkan standar SI. Nyalakan meriam Foton dengan mengingat konsep besaran & dimensi!',
    zombieCount: 8,
    zombieSpeedMultiplier: 1.0,
    zombieHealthMultiplier: 1.0,
    spawnIntervalMs: 3800,
    specialZombies: false,
    colorTheme: '#0284c7' // sky-600
  },
  {
    level: 2,
    facilityName: 'Lorong Resonansi',
    facilityCode: 'LAB-02-ACOUSTIC',
    topic: 'Gelombang Mekanik & Bunyi (Frekuensi, Periode, Resonansi)',
    description: 'Ruang akustik gelombang mekanik dan perambatan energi getaran.',
    storyIntro: 'Pasukan Zombi Hampa memasuki Lorong Resonansi! Suara desis mereka memecah gelombang harmonik. Hitung cepat rambat dan frekuensi gelombang untuk menstabilkan medan pertahanan!',
    zombieCount: 12,
    zombieSpeedMultiplier: 1.2,
    zombieHealthMultiplier: 1.2,
    spawnIntervalMs: 3400,
    specialZombies: false,
    colorTheme: '#7c3aed' // violet-600
  },
  {
    level: 3,
    facilityName: 'Gudang Gaya & Gerak',
    facilityCode: 'LAB-03-DYNAMICS',
    topic: 'Hukum Newton & Kinematika Gerak Lurus',
    description: 'Pusat penyimpanan massa, inersia, dinamika partikel, dan kinematika.',
    storyIntro: 'Zombi berzirah berat menyerbu Gudang Gaya! Inersia mereka sangat besar. Gunakan Hukum Newton I, II, dan III untuk menghitung percepatan dan melontarkan bola benang foton berdaya kejut!',
    zombieCount: 15,
    zombieSpeedMultiplier: 1.35,
    zombieHealthMultiplier: 1.5,
    spawnIntervalMs: 3000,
    specialZombies: true,
    colorTheme: '#ea580c' // orange-600
  },
  {
    level: 4,
    facilityName: 'Reaktor Energi',
    facilityCode: 'LAB-04-ENERGY',
    topic: 'Usaha & Hukum Kekekalan Energi Mekanik',
    description: 'Reaktor konversi energi potensial, energi kinetik, dan efisiensi daya.',
    storyIntro: 'Alarm Reaktor berbunyi kencang! Zombi Hampa menyerap energi potensial generator. Prof. Mpus butuh kalkulasi Usaha (W) dan Kekekalan Energi Mekanik untuk membalikkan polaritas!',
    zombieCount: 18,
    zombieSpeedMultiplier: 1.5,
    zombieHealthMultiplier: 1.8,
    spawnIntervalMs: 2600,
    specialZombies: true,
    colorTheme: '#16a34a' // green-600
  },
  {
    level: 5,
    facilityName: 'Pusat Generator Inti',
    facilityCode: 'LAB-05-QUANTUM-CORE',
    topic: 'Listrik Dinamis, Hukum Ohm & Rangkaian Kirchhoff',
    description: 'Jantung pasokan daya listrik utama seluruh laboratorium Prof. Mpus.',
    storyIntro: 'Pertempuran Final! Bos Zombi Hampa dan pasukannya mencoba memutus arus listrik di Generator Inti. Kuasai Hukum Ohm dan Rangkaian Kirchhoff untuk mengunci kemenangan mutlak!',
    zombieCount: 22,
    zombieSpeedMultiplier: 1.7,
    zombieHealthMultiplier: 2.2,
    spawnIntervalMs: 2300,
    specialZombies: true,
    colorTheme: '#e11d48' // rose-600
  }
];

export const PHYSICS_QUESTIONS: PhysicsQuestion[] = [
  // ==================== LEVEL 1: RUANG PENGUKURAN ====================
  {
    id: 'L1-Q1',
    level: 1,
    facilityName: 'Ruang Pengukuran',
    topic: 'Besaran Pokok & Satuan SI',
    question: 'Di antara kelompok besaran berikut, manakah yang seluruhnya merupakan kelompok BESARAN POKOK dalam sistem internasional (SI)?',
    options: [
      { key: 'A', text: 'Panjang, Massa, Kecepatan, dan Waktu' },
      { key: 'B', text: 'Panjang, Massa, Waktu, Suhu, dan Kuat Arus' },
      { key: 'C', text: 'Massa, Berat, Gaya, dan Percepatan' },
      { key: 'D', text: 'Kuat Arus, Tegangan, Daya, dan Hambatan' }
    ],
    correctAnswer: 'B',
    formulaHint: '7 Besaran Pokok: Panjang (m), Massa (kg), Waktu (s), Suhu (K), Kuat Arus (A), Intensitas Cahaya (cd), Jumlah Zat (mol).',
    explanation: '7 Besaran Pokok SI disingkat "JiWa SMeP-K" (Jumlah zat, Waktu, Suhu, Massa, e-intensitas, Panjang, Kuat arus). Kecepatan, Gaya, Tegangan, Daya adalah besaran turunan.'
  },
  {
    id: 'L1-Q2',
    level: 1,
    facilityName: 'Ruang Pengukuran',
    topic: 'Analisis Dimensi',
    question: 'Gaya didefinisikan sebagai massa dikalikan percepatan (F = m × a). Apakah dimensi dari besaran GAYA tersebut?',
    options: [
      { key: 'A', text: '[M] [L] [T]⁻¹' },
      { key: 'B', text: '[M] [L] [T]⁻²' },
      { key: 'C', text: '[M] [L]² [T]⁻²' },
      { key: 'D', text: '[M] [L]⁻¹ [T]⁻²' }
    ],
    correctAnswer: 'B',
    formulaHint: 'F = m · a ➜ Satuan: kg · m/s² ➜ Dimensi: [M] · [L] · [T]⁻²',
    explanation: 'Massa berdimensi [M], percepatan berdimensi [L][T]⁻². Maka gaya F = m·a memiliki dimensi [M][L][T]⁻².'
  },
  {
    id: 'L1-Q3',
    level: 1,
    facilityName: 'Ruang Pengukuran',
    topic: 'Alat Ukur Jangka Sorong',
    question: 'Sebuah jangka sorong memiliki skala utama 4,3 cm dan garis skala nonius ke-6 berimpit tepat dengan garis skala utama (ketelitian 0,01 cm). Berapakah hasil pembacaan pengukuran?',
    options: [
      { key: 'A', text: '4,36 cm' },
      { key: 'B', text: '4,90 cm' },
      { key: 'C', text: '4,06 cm' },
      { key: 'D', text: '4,63 cm' }
    ],
    correctAnswer: 'A',
    formulaHint: 'Hasil = Skala Utama + (Skala Nonius × Ketelitian)',
    explanation: 'Hasil = 4,3 cm + (6 × 0,01 cm) = 4,3 cm + 0,06 cm = 4,36 cm.'
  },
  {
    id: 'L1-Q4',
    level: 1,
    facilityName: 'Ruang Pengukuran',
    topic: 'Angka Penting',
    question: 'Hasil perkalian antara 2,5 m (2 angka penting) dan 3,14 m (3 angka penting) menurut aturan angka penting harus dituliskan sebagai...',
    options: [
      { key: 'A', text: '7,85 m²' },
      { key: 'B', text: '7,8 m²' },
      { key: 'C', text: '7,9 m²' },
      { key: 'D', text: '8,0 m²' }
    ],
    correctAnswer: 'C',
    formulaHint: 'Hasil perkalian/pembagian memiliki jumlah Angka Penting sebanyak faktor dengan AP paling sedikit.',
    explanation: '2,5 × 3,14 = 7,85. Faktor paling sedikit adalah 2,5 (2 AP). Dibulatkan menjadi 2 AP yaitu 7,9 m².'
  },
  {
    id: 'L1-Q5',
    level: 1,
    facilityName: 'Ruang Pengukuran',
    topic: 'Dimensi Energi / Usaha',
    question: 'Dimensi dari besaran USAHA atau ENERGI (Satuan Joule = kg·m²/s²) adalah...',
    options: [
      { key: 'A', text: '[M] [L]² [T]⁻²' },
      { key: 'B', text: '[M] [L] [T]⁻²' },
      { key: 'C', text: '[M] [L]² [T]⁻³' },
      { key: 'D', text: '[M]² [L] [T]⁻²' }
    ],
    correctAnswer: 'A',
    formulaHint: 'W = F × s = (kg·m/s²) × m = kg·m²·s⁻²',
    explanation: 'Satuan usaha adalah kg·m²/s², sehingga dimensinya adalah [M] [L]² [T]⁻².'
  },

  // ==================== LEVEL 2: LORONG RESONANSI ====================
  {
    id: 'L2-Q1',
    level: 2,
    facilityName: 'Lorong Resonansi',
    topic: 'Hubungan Frekuensi, Periode & Cepat Rambat',
    question: 'Sebuah gelombang memiliki panjang gelombang (λ) sebesar 4 meter dan merambat dengan kecepatan 20 m/s. Berapakah frekuensi (f) gelombang tersebut?',
    options: [
      { key: 'A', text: '80 Hz' },
      { key: 'B', text: '5 Hz' },
      { key: 'C', text: '0,2 Hz' },
      { key: 'D', text: '16 Hz' }
    ],
    correctAnswer: 'B',
    formulaHint: 'v = λ · f  ➜  f = v / λ',
    explanation: 'Frekuensi f = v / λ = 20 m/s / 4 m = 5 Hz.'
  },
  {
    id: 'L2-Q2',
    level: 2,
    facilityName: 'Lorong Resonansi',
    topic: 'Periode Gelombang',
    question: 'Jika sebuah garputala bergetar sebanyak 120 kali dalam waktu 0,5 menit, berapakah periode getarannya?',
    options: [
      { key: 'A', text: '0,25 sekon' },
      { key: 'B', text: '4 sekon' },
      { key: 'C', text: '0,5 sekon' },
      { key: 'D', text: '2,4 sekon' }
    ],
    correctAnswer: 'A',
    formulaHint: 'T = t / n (t dalam sekon: 0,5 menit = 30 sekon, n = 120)',
    explanation: 't = 30 detik, n = 120. Periode T = t / n = 30 / 120 = 0,25 sekon.'
  },
  {
    id: 'L2-Q3',
    level: 2,
    facilityName: 'Lorong Resonansi',
    topic: 'Karakteristik Gelombang Bunyi',
    question: 'Bunyi merupakan jenis gelombang...',
    options: [
      { key: 'A', text: 'Transversal dan Elektromagnetik' },
      { key: 'B', text: 'Longitudinal dan Mekanik' },
      { key: 'C', text: 'Transversal dan Mekanik' },
      { key: 'D', text: 'Longitudinal dan Elektromagnetik' }
    ],
    correctAnswer: 'B',
    formulaHint: 'Bunyi merambat melalui rapatan & renggangan (arah getar sejajar arah rambat) dan butuh medium zat.',
    explanation: 'Bunyi adalah gelombang longitudinal (getaran sejajar rambatan) dan gelombang mekanik (membutuhkan medium seperti udara/zat padat/cair untuk merambat).'
  },
  {
    id: 'L2-Q4',
    level: 2,
    facilityName: 'Lorong Resonansi',
    topic: 'Efek Doppler',
    question: 'Ketika sebuah mobil sirine mendekati pengamat yang sedang diam, frekuensi bunyi yang didengar oleh pengamat terasa lebih tinggi karena...',
    options: [
      { key: 'A', text: 'Amplitudo gelombang bunyi bertambah besar' },
      { key: 'B', text: 'Panjang gelombang semu yang diterima memendek akibat sumber bergerak mendekat' },
      { key: 'C', text: 'Cepat rambat bunyi di udara meningkat pesat' },
      { key: 'D', text: 'Periode gelombang membesar dua kali lipat' }
    ],
    correctAnswer: 'B',
    formulaHint: 'Efek Doppler: fp = [(v ± vp) / (v ∓ vs)] · fs. Sumber mendekat ➜ fp > fs.',
    explanation: 'Ketika sumber bergerak mendekati pendengar, gelombang-gelombang bunyi di depan sumber termampatkan (panjang gelombang tampak lebih pendek), sehingga frekuensi yang diterima meningkat.'
  },
  {
    id: 'L2-Q5',
    level: 2,
    facilityName: 'Lorong Resonansi',
    topic: 'Intensitas & Taraf Intensitas Bunyi',
    question: 'Jika jarak pengamat terhadap sumber bunyi diperbesar menjadi 2 kali lipat dari jarak semula (r₂ = 2 r₁), maka intensitas bunyi (I) yang diterima menjadi...',
    options: [
      { key: 'A', text: '1/2 kali semula' },
      { key: 'B', text: '1/4 kali semula' },
      { key: 'C', text: '2 kali semula' },
      { key: 'D', text: '4 kali semula' }
    ],
    correctAnswer: 'B',
    formulaHint: 'Hukum Kuadrat Terbalik: I berbanding terbalik dengan r² (I ∝ 1/r²)',
    explanation: 'Intensitas bunyi I = P / (4πr²). Karena r menjadi 2 kali, maka I₂ = I₁ / (2)² = 1/4 I₁.'
  },

  // ==================== LEVEL 3: GUDANG GAYA ====================
  {
    id: 'L3-Q1',
    level: 3,
    facilityName: 'Gudang Gaya & Gerak',
    topic: 'Hukum II Newton',
    question: 'Sebuah balok bermassa 4 kg ditarik dengan gaya mendatar F = 20 N pada lantai licin tanpa gesekan. Berapakah percepatan yang dialami balok?',
    options: [
      { key: 'A', text: '80 m/s²' },
      { key: 'B', text: '5 m/s²' },
      { key: 'C', text: '16 m/s²' },
      { key: 'D', text: '0,2 m/s²' }
    ],
    correctAnswer: 'B',
    formulaHint: 'ΣF = m · a  ➜  a = ΣF / m',
    explanation: 'a = F / m = 20 N / 4 kg = 5 m/s².'
  },
  {
    id: 'L3-Q2',
    level: 3,
    facilityName: 'Gudang Gaya & Gerak',
    topic: 'Kinematika GLBB',
    question: 'Sebuah mobil melaju dengan kecepatan awal 10 m/s dan mengalami percepatan konstan 2 m/s². Berapakah kecepatan mobil setelah bergerak selama 5 sekon?',
    options: [
      { key: 'A', text: '20 m/s' },
      { key: 'B', text: '35 m/s' },
      { key: 'C', text: '25 m/s' },
      { key: 'D', text: '15 m/s' }
    ],
    correctAnswer: 'A',
    formulaHint: 'vt = v0 + a · t',
    explanation: 'vt = 10 m/s + (2 m/s² × 5 s) = 10 + 10 = 20 m/s.'
  },
  {
    id: 'L3-Q3',
    level: 3,
    facilityName: 'Gudang Gaya & Gerak',
    topic: 'Hukum III Newton (Aksi - Reaksi)',
    question: 'Manakah di bawah ini yang merupakan pasangan gaya aksi-reaksi menurut Hukum III Newton?',
    options: [
      { key: 'A', text: 'Gaya dorong kaki atlet pada balok start dengan gaya dorong balok start pada kaki atlet' },
      { key: 'B', text: 'Gaya berat benda dengan gaya normal di atas meja pada satu benda yang sama' },
      { key: 'C', text: 'Gaya gesek dengan gaya pendorong mesin mobil' },
      { key: 'D', text: 'Gaya gravitasi bumi dengan kecepatan orbit satelit' }
    ],
    correctAnswer: 'A',
    formulaHint: 'Pasangan aksi-reaksi: besar sama, arah berlawanan, bekerja pada DUA BENDA BERBEDA.',
    explanation: 'Pasangan aksi-reaksi harus bekerja pada dua objek berbeda yang saling berinteraksi (kaki menekan balok ⇄ balok menolak kaki).'
  },
  {
    id: 'L3-Q4',
    level: 3,
    facilityName: 'Gudang Gaya & Gerak',
    topic: 'Gaya Gesek Statis & Kinetis',
    question: 'Benda bermassa 5 kg diletakkan di atas lantai kasar (koefisien gesek kinetis μk = 0,3, g = 10 m/s²). Berapakah besar gaya gesek kinetis saat benda bergerak mendatar?',
    options: [
      { key: 'A', text: '15 N' },
      { key: 'B', text: '50 N' },
      { key: 'C', text: '1,5 N' },
      { key: 'D', text: '25 N' }
    ],
    correctAnswer: 'A',
    formulaHint: 'N = m · g = 50 N.  fk = μk · N',
    explanation: 'Gaya normal N = m·g = 5 × 10 = 50 N. Maka fk = 0,3 × 50 N = 15 N.'
  },
  {
    id: 'L3-Q5',
    level: 3,
    facilityName: 'Gudang Gaya & Gerak',
    topic: 'Jarak Tempuh GLBB',
    question: 'Sebuah bola dilepaskan dari keadaan diam (v0 = 0) dan mengalami percepatan 4 m/s². Berapakah jarak tempuh bola setelah 3 sekon?',
    options: [
      { key: 'A', text: '12 meter' },
      { key: 'B', text: '18 meter' },
      { key: 'C', text: '36 meter' },
      { key: 'D', text: '24 meter' }
    ],
    correctAnswer: 'B',
    formulaHint: 's = v0 · t + 1/2 · a · t²',
    explanation: 's = 0 + 1/2 × 4 × (3)² = 2 × 9 = 18 meter.'
  },

  // ==================== LEVEL 4: REAKTOR ENERGI ====================
  {
    id: 'L4-Q1',
    level: 4,
    facilityName: 'Reaktor Energi',
    topic: 'Energi Kinetik',
    question: 'Sebuah proyektil bermassa 0,2 kg melesat dengan kelajuan 50 m/s. Berapakah Energi Kinetik (Ek) yang dimiliki proyektil tersebut?',
    options: [
      { key: 'A', text: '250 Joule' },
      { key: 'B', text: '500 Joule' },
      { key: 'C', text: '50 Joule' },
      { key: 'D', text: '125 Joule' }
    ],
    correctAnswer: 'A',
    formulaHint: 'Ek = 1/2 · m · v²',
    explanation: 'Ek = 1/2 × 0,2 × (50)² = 0,1 × 2500 = 250 Joule.'
  },
  {
    id: 'L4-Q2',
    level: 4,
    facilityName: 'Reaktor Energi',
    topic: 'Usaha (W = F · s)',
    question: 'Gaya konstan F = 60 N menarik sebuah kotak hingga berpindah sejauh s = 5 meter searah dengan gaya tersebut. Berapakah usaha total yang dilakukan?',
    options: [
      { key: 'A', text: '300 Joule' },
      { key: 'B', text: '12 Joule' },
      { key: 'C', text: '65 Joule' },
      { key: 'D', text: '150 Joule' }
    ],
    correctAnswer: 'A',
    formulaHint: 'W = F · s · cos(θ). Karena searah, θ = 0° (cos 0° = 1).',
    explanation: 'W = 60 N × 5 m = 300 Joule.'
  },
  {
    id: 'L4-Q3',
    level: 4,
    facilityName: 'Reaktor Energi',
    topic: 'Hukum Kekekalan Energi Mekanik',
    question: 'Sebuah apel bermassa 0,5 kg jatuh bebas dari pohon berketinggian h = 8 meter (g = 10 m/s²). Berapakah kecepatan apel saat menyentuh tanah jika gesekan udara diabaikan?',
    options: [
      { key: 'A', text: '4√10 m/s (≈ 12,65 m/s)' },
      { key: 'B', text: '80 m/s' },
      { key: 'C', text: '8 m/s' },
      { key: 'D', text: '16 m/s' }
    ],
    correctAnswer: 'A',
    formulaHint: 'v = √(2 · g · h)',
    explanation: 'Ep_awal = Ek_akhir ➜ m·g·h = 1/2·m·v² ➜ v = √(2·g·h) = √(2 × 10 × 8) = √160 = 4√10 m/s (sekitar 12,65 m/s).'
  },
  {
    id: 'L4-Q4',
    level: 4,
    facilityName: 'Reaktor Energi',
    topic: 'Daya (Power)',
    question: 'Sebuah motor listrik mampu melakukan usaha 12.000 Joule dalam waktu 1 menit (60 detik). Berapakah daya (P) motor listrik tersebut?',
    options: [
      { key: 'A', text: '200 Watt' },
      { key: 'B', text: '12.000 Watt' },
      { key: 'C', text: '720.000 Watt' },
      { key: 'D', text: '60 Watt' }
    ],
    correctAnswer: 'A',
    formulaHint: 'P = W / t (t dalam sekon)',
    explanation: 'P = W / t = 12.000 J / 60 s = 200 Watt.'
  },
  {
    id: 'L4-Q5',
    level: 4,
    facilityName: 'Reaktor Energi',
    topic: 'Energi Potensial Gravitasi',
    question: 'Sebuah beban 10 kg dinaikkan dari lantai ke rak setinggi 3 meter (g = 9,8 m/s²). Energi potensial gravitasi beban bertambah sebesar...',
    options: [
      { key: 'A', text: '294 Joule' },
      { key: 'B', text: '30 Joule' },
      { key: 'C', text: '98 Joule' },
      { key: 'D', text: '300 Joule' }
    ],
    correctAnswer: 'A',
    formulaHint: 'Ep = m · g · h',
    explanation: 'Ep = 10 kg × 9,8 m/s² × 3 m = 294 Joule.'
  },

  // ==================== LEVEL 5: PUSAT GENERATOR ====================
  {
    id: 'L5-Q1',
    level: 5,
    facilityName: 'Pusat Generator Inti',
    topic: 'Hukum Ohm (V = I · R)',
    question: 'Sebuah resistor dengan hambatan R = 12 Ohm dihubungkan dengan sumber tegangan V = 24 Volt. Berapakah kuat arus listrik (I) yang mengalir?',
    options: [
      { key: 'A', text: '2 Ampere' },
      { key: 'B', text: '288 Ampere' },
      { key: 'C', text: '0,5 Ampere' },
      { key: 'D', text: '12 Ampere' }
    ],
    correctAnswer: 'A',
    formulaHint: 'V = I · R  ➜  I = V / R',
    explanation: 'I = V / R = 24 V / 12 Ω = 2 Ampere.'
  },
  {
    id: 'L5-Q2',
    level: 5,
    facilityName: 'Pusat Generator Inti',
    topic: 'Rangkaian Hambatan Paralel',
    question: 'Dua buah resistor masing-masing bernilai R₁ = 6 Ohm dan R₂ = 3 Ohm dirangkai secara paralel. Berapakah hambatan pengganti totalnya (Rp)?',
    options: [
      { key: 'A', text: '2 Ohm' },
      { key: 'B', text: '9 Ohm' },
      { key: 'C', text: '4,5 Ohm' },
      { key: 'D', text: '18 Ohm' }
    ],
    correctAnswer: 'A',
    formulaHint: '1/Rp = 1/R1 + 1/R2  ➜  Rp = (R1 · R2) / (R1 + R2)',
    explanation: '1/Rp = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 ➜ Rp = 6/3 = 2 Ohm.'
  },
  {
    id: 'L5-Q3',
    level: 5,
    facilityName: 'Pusat Generator Inti',
    topic: 'Hukum I Kirchhoff',
    question: 'Pada suatu percabangan arus, terdapat dua arus masuk I₁ = 4 A dan I₂ = 3 A. Jika salah satu cabang keluar memiliki arus I₃ = 5 A, berapakah arus pada cabang keluar lainnya (I₄)?',
    options: [
      { key: 'A', text: '2 Ampere' },
      { key: 'B', text: '12 Ampere' },
      { key: 'C', text: '7 Ampere' },
      { key: 'D', text: '1 Ampere' }
    ],
    correctAnswer: 'A',
    formulaHint: 'Σ I_masuk = Σ I_keluar  ➜  (I1 + I2) = (I3 + I4)',
    explanation: 'Arus masuk total = 4 + 3 = 7 A. Arus keluar total = 5 + I₄. Maka I₄ = 7 - 5 = 2 Ampere.'
  },
  {
    id: 'L5-Q4',
    level: 5,
    facilityName: 'Pusat Generator Inti',
    topic: 'Energi & Daya Listrik',
    question: 'Sebuah lampu bertuliskan 220 V / 40 W dinyalakan selama 5 jam. Berapakah energi listrik yang diserap lampu tersebut dalam satuan Watt-hour (Wh)?',
    options: [
      { key: 'A', text: '200 Wh' },
      { key: 'B', text: '1100 Wh' },
      { key: 'C', text: '880 Wh' },
      { key: 'D', text: '44 Wh' }
    ],
    correctAnswer: 'A',
    formulaHint: 'W = P · t (Daya P = 40 Watt, Waktu t = 5 jam)',
    explanation: 'Energi listrik W = P × t = 40 W × 5 jam = 200 Wh.'
  },
  {
    id: 'L5-Q5',
    level: 5,
    facilityName: 'Pusat Generator Inti',
    topic: 'Faktor yang Mempengaruhi Hambatan Kawat',
    question: 'Hambatan seutas kawat penghantar (R = ρ · L / A) akan semakin BESAR jika kawat tersebut...',
    options: [
      { key: 'A', text: 'Semakin panjang dan luas penampangnya semakin kecil' },
      { key: 'B', text: 'Semakin pendek dan luas penampangnya semakin besar' },
      { key: 'C', text: 'Memiliki hambatan jenis (ρ) yang semakin kecil' },
      { key: 'D', text: 'Memiliki luas penampang sangat lebar' }
    ],
    correctAnswer: 'A',
    formulaHint: 'R = ρ · L / A  (R berbanding lurus dengan panjang L, dan berbanding terbalik dengan luas A)',
    explanation: 'Sesuai rumus R = ρ·L/A, hambatan berbanding lurus dengan panjang (L) dan berbanding terbalik dengan luas penampang (A). Maka kawat yang lebih panjang dan lebih tipis memiliki hambatan paling besar.'
  }
];

export function getQuestionsForLevel(level: number): PhysicsQuestion[] {
  return PHYSICS_QUESTIONS.filter((q) => q.level === level);
}

export function getRandomQuestionForLevel(level: number, usedIds: string[] = []): PhysicsQuestion {
  const pool = getQuestionsForLevel(level);
  const unused = pool.filter((q) => !usedIds.includes(q.id));
  const available = unused.length > 0 ? unused : pool;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
