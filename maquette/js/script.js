/* ============================================================
   DONNÉES SIMULÉES
   ============================================================ */
const properties = [
    {
        id: 1,
        title: "Villa moderne avec piscine",
        location: "Aix-en-Provence, 13100",
        price: 850000,
        type: "vente",
        category: "maison",
        img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600",
        desc: "Magnifique villa contemporaine de 220m² avec piscine chauffée, jardin paysager et garage double. Prestations haut de gamme et finitions soignées.",
        beds: 5,
        baths: 3,
        area: 220
    },
    {
        id: 2,
        title: "Appartement lumineux centre-ville",
        location: "Lyon, 69002",
        price: 1450,
        type: "location",
        category: "appartement",
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
        desc: "Bel appartement de 75m² entièrement rénové, situé au cœur de la Presqu'île. Proche transports et commerces. Cuisine équipée.",
        beds: 2,
        baths: 1,
        area: 75
    },
    {
        id: 3,
        title: "Maison de campagne rénovée",
        location: "Bordeaux, 33000",
        price: 520000,
        type: "vente",
        category: "maison",
        img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
        desc: "Charmante maison en pierre de 180m² sur un terrain de 2000m². Poutres apparentes, cheminée, dépendances. Au calme absolu.",
        beds: 4,
        baths: 2,
        area: 180
    },
    {
        id: 4,
        title: "Studio cosy proche université",
        location: "Toulouse, 31000",
        price: 650,
        type: "location",
        category: "appartement",
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
        desc: "Studio meublé de 28m² idéal étudiant. Proche fac et commerces. Charges comprises, immeuble sécurisé avec ascenseur.",
        beds: 1,
        baths: 1,
        area: 28
    },
    {
        id: 5,
        title: "Penthouse avec vue panoramique",
        location: "Nice, 06000",
        price: 1200000,
        type: "vente",
        category: "appartement",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
        desc: "Exceptionnel penthouse de 150m² avec terrasse de 60m² offrant une vue imprenable sur la mer. Prestations luxueuses.",
        beds: 3,
        baths: 2,
        area: 150
    },
    {
        id: 6,
        title: "Loft industriel d'exception",
        location: "Paris 11e, 75011",
        price: 2100,
        type: "location",
        category: "appartement",
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
        desc: "Superbe loft de 120m² dans ancienne usine rénovée. Hauteur sous plafond 4m, verrière, cuisine américaine équipée.",
        beds: 2,
        baths: 2,
        area: 120
    },
    {
        id: 7,
        title: "Villa contemporaine bord de mer",
        location: "Biarritz, 64200",
        price: 1650000,
        type: "vente",
        category: "maison",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        desc: "Villa d'architecte de 280m² face à l'océan. Piscine à débordement, spa, cave à vin. Un bien rare et prestigieux.",
        beds: 6,
        baths: 4,
        area: 280
    },
    {
        id: 8,
        title: "Appartement familial avec balcon",
        location: "Nantes, 44000",
        price: 950,
        type: "location",
        category: "appartement",
        img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600",
        desc: "Appartement traversant de 85m² avec balcon, proche écoles et parc. Cuisine séparée, 3 chambres, dressing.",
        beds: 3,
        baths: 1,
        area: 85
    }
];

/* ============================================================
   ÉTAT
   ============================================================ */
let currentFilter = 'all';
let displayedCount = 6;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/* ============================================================
   SÉLECTEURS
   ============================================================ */
const grid = document.getElementById('propertiesGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const searchBtn = document.getElementById('searchBtn');

/* ============================================================
   FORMATAGE
   ============================================================ */
const formatPrice = (price, type) => {
    const formatted = new Intl.NumberFormat('fr-FR').format(price);
    return type === 'location'
        ? `${formatted} €<small>/mois</small>`
        : `${formatted} €`;
};

/* ============================================================
   RENDU DES CARTES
   ============================================================ */
function renderProperties() {
    let filtered = properties;

    if (currentFilter !== 'all') {
        filtered = properties.filter(p =>
            p.type === currentFilter || p.category === currentFilter
        );
    }

    const toShow = filtered.slice(0, displayedCount);

    if (toShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; color:var(--text-muted);">
                <i class="fa-solid fa-house-circle-xmark" style="font-size:3rem; margin-bottom:15px; color:var(--primary);"></i>
                <h3>Aucun bien trouvé</h3>
                <p>Essayez un autre filtre.</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }

    grid.innerHTML = toShow.map((p, i) => `
        <article class="property-card" data-id="${p.id}" style="animation-delay:${i * 0.08}s">
            <div class="property-img">
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <span class="property-tag tag-${p.type}">
                    ${p.type === 'vente' ? 'À vendre' : 'À louer'}
                </span>
                <button class="favorite-btn ${favorites.includes(p.id) ? 'active' : ''}" 
                        data-fav="${p.id}" aria-label="Favori">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
            <div class="property-body">
                <h3>${p.title}</h3>
                <p class="property-location">
                    <i class="fa-solid fa-location-dot"></i> ${p.location}
                </p>
                <div class="property-features">
                    <span class="feature"><i class="fa-solid fa-bed"></i> ${p.beds} ch.</span>
                    <span class="feature"><i class="fa-solid fa-bath"></i> ${p.baths} sdb</span>
                    <span class="feature"><i class="fa-solid fa-ruler-combined"></i> ${p.area} m²</span>
                </div>
                <div class="property-footer">
                    <span class="property-price">${formatPrice(p.price, p.type)}</span>
                    <span class="property-cta">Voir <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </div>
        </article>
    `).join('');

    loadMoreBtn.style.display = filtered.length > displayedCount ? 'inline-flex' : 'none';
}

/* ============================================================
   FILTRES
   ============================================================ */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        displayedCount = 6;
        renderProperties();
    });
});

/* ============================================================
   CHARGER PLUS
   ============================================================ */
loadMoreBtn.addEventListener('click', () => {
    displayedCount += 4;
    renderProperties();
});

/* ============================================================
   FAVORIS (délégation d'événement)
   ============================================================ */
grid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) {
        e.stopPropagation();
        const id = parseInt(favBtn.dataset.fav);
        if (favorites.includes(id)) {
            favorites = favorites.filter(f => f !== id);
            favBtn.classList.remove('active');
        } else {
            favorites.push(id);
            favBtn.classList.add('active');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return;
    }

    const card = e.target.closest('.property-card');
    if (card) openModal(parseInt(card.dataset.id));
});

/* ============================================================
   MODAL
   ============================================================ */
function openModal(id) {
    const p = properties.find(x => x.id === id);
    if (!p) return;

    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalImg').alt = p.title;
    document.getElementById('modalTag').textContent = p.type === 'vente' ? 'À vendre' : 'À louer';
    document.getElementById('modalTag').className = `property-tag tag-${p.type}`;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalLocation').textContent = p.location;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalPrice').innerHTML = formatPrice(p.price, p.type);

    document.getElementById('modalFeatures').innerHTML = `
        <span class="feature"><i class="fa-solid fa-bed"></i> ${p.beds} chambres</span>
        <span class="feature"><i class="fa-solid fa-bath"></i> ${p.baths} salles de bain</span>
        <span class="feature"><i class="fa-solid fa-ruler-combined"></i> ${p.area} m²</span>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

/* ============================================================
   THÈME
   ============================================================ */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ============================================================
   MENU MOBILE
   ============================================================ */
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.className = nav.classList.contains('open')
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

/* ============================================================
   SCROLL (header + back-to-top)
   ============================================================ */
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    backToTop.classList.toggle('show', y > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   RECHERCHE SIMULÉE
   ============================================================ */
searchBtn.addEventListener('click', () => {
    const location = document.getElementById('searchLocation').value.trim();
    const type = document.getElementById('searchType').value;

    let filtered = properties;
    if (location) {
        filtered = filtered.filter(p =>
            p.location.toLowerCase().includes(location.toLowerCase())
        );
    }
    if (type) {
        filtered = filtered.filter(p => p.category === type);
    }

    currentFilter = 'all';
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
    displayedCount = filtered.length || 6;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size:3rem; margin-bottom:15px; color:var(--accent);"></i>
                <h3>Aucun résultat</h3>
                <p>Aucun bien ne correspond à votre recherche.</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
    } else {
        grid.innerHTML = filtered.slice(0, displayedCount).map((p, i) => `
            <article class="property-card" data-id="${p.id}" style="animation-delay:${i * 0.08}s">
                <div class="property-img">
                    <img src="${p.img}" alt="${p.title}">
                    <span class="property-tag tag-${p.type}">
                        ${p.type === 'vente' ? 'À vendre' : 'À louer'}
                    </span>
                    <button class="favorite-btn ${favorites.includes(p.id) ? 'active' : ''}" data-fav="${p.id}">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div class="property-body">
                    <h3>${p.title}</h3>
                    <p class="property-location"><i class="fa-solid fa-location-dot"></i> ${p.location}</p>
                    <div class="property-features">
                        <span class="feature"><i class="fa-solid fa-bed"></i> ${p.beds} ch.</span>
                        <span class="feature"><i class="fa-solid fa-bath"></i> ${p.baths} sdb</span>
                        <span class="feature"><i class="fa-solid fa-ruler-combined"></i> ${p.area} m²</span>
                    </div>
                    <div class="property-footer">
                        <span class="property-price">${formatPrice(p.price, p.type)}</span>
                        <span class="property-cta">Voir <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </article>
        `).join('');
        loadMoreBtn.style.display = 'none';
    }

    document.getElementById('biens').scrollIntoView({ behavior: 'smooth' });
});

/* ============================================================
   INIT
   ============================================================ */
renderProperties();