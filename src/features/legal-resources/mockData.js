// SAMPLE DATA. Titles are real publications, but section numbers, dates and statuses are
// placeholders for the demo, and `url` is only the official site's home page (no deep links).

const INDIACODE = 'https://www.indiacode.nic.in/'
const DOJ = 'https://doj.gov.in/'
const NALSA = 'https://nalsa.gov.in/'
const WCD = 'https://wcd.gov.in/'
const ECOURTS = 'https://ecourts.gov.in/'
const INDIA_GOV = 'https://www.india.gov.in/'

const r = (id, title, sections, type, category, url, lastUpdated, status = 'available') => ({
  id, title, sections, type, category, jurisdiction: 'Central', url, lastUpdated, status,
})

// Order is the "Most relevant" order.
export const RESOURCES = [
  r('R-01', 'Prevention of Corruption Act, 1988', 'Section 7, 13', 'act', 'Anti-corruption', INDIACODE, '2026-10-12'),
  r('R-02', 'Indian Penal Code, 1860', 'Section 353, 186', 'act', 'Criminal law', INDIACODE, '2026-10-10'),
  r('R-03', 'Information Technology Act, 2000', 'Section 66, 67', 'act', 'Cybercrime', INDIACODE, '2026-10-09'),
  r('R-04', 'Protection of Women from Domestic Violence Act, 2005', 'Section 3, 12', 'act', 'Women & family', INDIACODE, '2026-10-08'),
  r('R-05', 'Right to Information Act, 2005', 'Section 6, 7', 'act', 'Right to information', INDIACODE, '2026-10-08'),
  r('R-06', 'Consumer Protection Act, 2019', null, 'act', 'Consumer rights', INDIACODE, '2026-10-07'),
  r('R-07', 'Bharatiya Nyaya Sanhita, 2023', null, 'act', 'Criminal law', INDIACODE, '2026-10-06', 'needs_update'),
  r('R-08', 'Digital Personal Data Protection Act, 2023', null, 'act', 'Privacy', INDIACODE, '2026-10-04'),
  r('R-09', 'Tele-Law Programme', null, 'scheme', 'Legal aid', DOJ, '2026-10-07'),
  r('R-10', 'Free Legal Services (NALSA)', null, 'scheme', 'Legal aid', NALSA, '2026-10-05'),
  r('R-11', 'Nyaya Bandhu (Pro Bono Legal Services)', null, 'scheme', 'Legal aid', DOJ, '2026-10-03'),
  r('R-12', 'One Stop Centre Scheme', null, 'scheme', 'Women & family', WCD, '2026-10-02'),
  r('R-13', 'Mission Shakti', null, 'scheme', 'Women & family', WCD, '2026-09-30'),
  r('R-14', 'eCourts Mission Mode Project', null, 'scheme', 'Court services', ECOURTS, '2026-09-28'),
  r('R-15', 'National Cyber Crime Reporting Portal', null, 'government', 'Cybercrime', 'https://cybercrime.gov.in/', '2026-10-11'),
  r('R-16', 'National Consumer Helpline', null, 'government', 'Consumer rights', 'https://consumerhelpline.gov.in/', '2026-10-01'),
  r('R-17', 'RTI Online Portal', null, 'government', 'Right to information', 'https://rtionline.gov.in/', '2026-09-29'),
  r('R-18', 'CPGRAMS Public Grievance Portal', null, 'government', 'Grievance', 'https://pgportal.gov.in/', '2026-09-27', 'needs_update'),
  r('R-19', 'eCourts Services', null, 'government', 'Court services', ECOURTS, '2026-09-26'),
  r('R-20', 'National Commission for Women', null, 'government', 'Women & family', 'https://ncw.gov.in/', '2026-09-25'),
  r('R-21', 'Legal Aid Services Portal (NALSA)', null, 'government', 'Legal aid', NALSA, '2026-09-20', 'unavailable'),
  r('R-22', 'Sample article: Your rights when arrested', null, 'article', 'Criminal law', INDIA_GOV, '2026-09-18'),
  r('R-23', 'Sample article: How to file an FIR', null, 'article', 'Criminal law', INDIA_GOV, '2026-09-15'),
  r('R-24', 'Sample article: Using the Right to Information', null, 'article', 'Right to information', INDIA_GOV, '2026-09-10'),
]
