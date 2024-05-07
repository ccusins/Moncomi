document.addEventListener("DOMContentLoaded", function() {

    const switch100 = document.querySelector('#switch-100');
    const switch200 = document.querySelector('#switch-200');

    const holder100 = document.querySelector('#holder-100');
    const holder200 = document.querySelector('#holder-200');

    switch100.addEventListener('click', function() {
        holder100.style.display = 'none';
        holder200.style.display = 'flex';

        switch100.className = 'bg-black text-white text-2xl px-4 py-2 rounded border border-black font-bold';
        switch200.className = 'text-black text-2xl px-4 py-2 rounded border border-black font-bold';
    });
    switch200.addEventListener('click', function() {
        holder200.style.display = 'none';
        holder100.style.display = 'flex';

        switch200.className = 'bg-black text-white text-2xl px-4 py-2 rounded border border-black font-bold';
        switch100.className = 'text-black text-2xl px-4 py-2 rounded border border-black font-bold';
    });
});