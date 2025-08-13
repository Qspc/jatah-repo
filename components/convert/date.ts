export function dateFormatTable(tanggal: string | Date): string {
    const bulanIndo = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const dateObj = typeof tanggal === "string" ? new Date(tanggal) : tanggal;

    const hari = dateObj.getDate();
    const bulan = bulanIndo[dateObj.getMonth()];
    const tahun = dateObj.getFullYear();

    return `${hari} ${bulan} ${tahun}`;
}
