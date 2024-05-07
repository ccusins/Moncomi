document.addEventListener("DOMContentLoaded", function() {
    const hero = document.querySelector('#hero');
    const side1 = document.querySelector('#side1');
    const side2 = document.querySelector('#side2');

    const heroSM = document.querySelector('#heroSM');
    const side1SM = document.querySelector('#side1SM');
    const side2SM = document.querySelector('#side2SM');

    heroSM.addEventListener('click', function() {
        
        heroSM.className = 'w-[20%] rounded border border-black transition-transform duration-200 hover:scale-[102%]';
        side1SM.className = 'w-[20%] rounded border border-black opacity-50 transition-transform duration-200 hover:scale-[102%]';
        side2SM.className = 'w-[20%] rounded border border-black opacity-50 transition-transform duration-200 hover:scale-[102%]';

        hero.className = 'w-[90%] rounded border border-black';
        side1.className = 'w-[90%] rounded border border-black hidden';
        side2.className = 'w-[90%] rounded border border-black hidden';
    });

    side1SM.addEventListener('click', function() {

        heroSM.className = 'w-[20%] rounded border border-black opacity-50 transition-transform duration-200 hover:scale-[102%]';
        side1SM.className = 'w-[20%] rounded border border-black transition-transform duration-200 hover:scale-[102%]';
        side2SM.className = 'w-[20%] rounded border border-black opacity-50 transition-transform duration-200 hover:scale-[102%]';

        hero.className = 'w-[90%] rounded border border-black hidden';
        side1.className = 'w-[90%] rounded border border-black';
        side2.className = 'w-[90%] rounded border border-black hidden';
    });

    side2SM.addEventListener('click', function() {
        
        heroSM.className = 'w-[20%] rounded border border-black opacity-50 transition-transform duration-200 hover:scale-[102%]';
        side1SM.className = 'w-[20%] rounded border border-black opacity-50 transition-transform duration-200 hover:scale-[102%]';
        side2SM.className = 'w-[20%] rounded border border-black transition-transform duration-200 hover:scale-[102%]';

        hero.className = 'w-[90%] rounded border border-black hidden';
        side1.className = 'w-[90%] rounded border border-black hidden';
        side2.className = 'w-[90%] rounded border border-black';
    });
});