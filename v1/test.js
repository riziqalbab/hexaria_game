// Data yang akan ditampilkan
const divData = [
    { title: 'Div 1', content: 'Ini adalah konten untuk div 1' },
    { title: 'Div 2', content: 'Ini adalah konten untuk div 2' },
    { title: 'Div 3', content: 'Ini adalah konten untuk div 3' }
];

// Mendapatkan elemen container
const container = document.getElementById('container');

// Melakukan looping dan menambahkan elemen div ke container
divData.forEach(item => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('div-item');
    
    // Menambahkan konten dalam div
    newDiv.innerHTML = `<h3>${item.title}</h3><p>${item.content}</p>`;
    
    // Menambahkan div baru ke container
    container.appendChild(newDiv);
});