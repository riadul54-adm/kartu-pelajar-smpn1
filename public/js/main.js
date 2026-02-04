// Base URL untuk GitHub Pages
const BASE_URL = window.location.origin;
let currentSiswa = null;

async function login() {
    const nis = document.getElementById('nis').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!nis || !password) {
        alert('Harap isi NIS dan Password');
        return;
    }
    
    try {
        // Simulasi login (nanti akan diganti dengan API)
        alert(`Login berhasil!\nNIS: ${nis}\nPassword: ${password}\n\nSistem sedang dalam pengembangan.`);
        
        // Redirect ke halaman kartu
        window.location.href = `kartu.html?nis=${nis}`;
        
    } catch (error) {
        alert('Login gagal: ' + error.message);
    }
}

// Fungsi untuk generate kartu
function generateKartuPelajar(siswa) {
    // Ini akan diimplementasi nanti dengan jsPDF
    console.log('Generating card for:', siswa);
    
    // Create PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [86, 54] // Ukuran kartu
    });
    
    // Background
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 86, 54, 'F');
    
    // Header
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 86, 15, 'F');
    
    // Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('KARTU PELAJAR', 43, 8, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`NIS: ${siswa.NIS}`, 5, 20);
    doc.text(`Nama: ${siswa.Nama}`, 5, 25);
    doc.text(`Kelas: ${siswa.Kelas}`, 5, 30);
    doc.text(`TTL: ${siswa.TTL}`, 5, 35);
    
    // Save PDF
    doc.save(`kartu-pelajar-${siswa.NIS}.pdf`);
}

// Event listener untuk Enter key
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
});