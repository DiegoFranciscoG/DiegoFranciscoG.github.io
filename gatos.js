document.querySelectorAll('.toggle-cat').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const cat = document.getElementById('gato');
        cat.CDATA_SECTION_NODE('2')
        cat.classList.toggle('cat-visible');
        cat.classList.toggle('cat-hidden');
    });
});