// Global variables
let products = [];

// Portfolio items data with categories and better organization
const portfolioItems = [
    // Formula 1 Products
    {
        id: 1,
        name: "Formula 1 Car Wash & Wax",
        category: "formula1",
        image: "products/CAR WAX/F1-101 CARNAUBA WASH &WAX.jpeg",
        description: "Professional car wash and wax solution"
    },
    {
        id: 2,
        name: "Formula 1 Ceramic Wax",
        category: "formula1",
        image: "products/CAR WAX/F1-113 CERAMIC LIQUID WAX.jpeg",
        description: "Advanced ceramic protection"
    },
    {
        id: 3,
        name: "Formula 1 Spray Wax",
        category: "formula1",
        image: "products/CAR WAX/F1-114 CERAMIC SPRAY WAX.jpeg",
        description: "Quick and easy spray wax"
    },
    {
        id: 4,
        name: "Formula 1 Carnuba Wax",
        category: "formula1",
        image: "products/CAR WAX/F1-104 CARNAUBA LIQUID WAX.jpeg",
        description: "Natural carnuba wax protection"
    },
    {
        id: 5,
        name: "Formula 1 Wax Paste",
        category: "formula1",
        image: "products/CAR WAX/F1-107 CARNAUBA WAX PASTE.jpeg",
        description: "Traditional wax paste"
    },
    {
        id: 6,
        name: "Formula 1 Tire Shine",
        category: "formula1",
        image: "products/formula-1-black-gold-tire-shine-680-ml-.jpg",
        description: "Premium tire shine and protection"
    },
    
    // AIM Car Care Products
    {
        id: 7,
        name: "AIM Car Wash & Shampoo",
        category: "aim",
        image: "products/CAR WASH SHAMPOOS/AW-157 AIM WASH & SHAMPOO.jpeg",
        description: "Professional car wash shampoo"
    },
    {
        id: 8,
        name: "AIM Wash & Wax",
        category: "aim",
        image: "products/CAR WAX/AW-104 AW WASH & WAX.jpeg",
        description: "2-in-1 wash and wax solution"
    },
    {
        id: 9,
        name: "AIM Leather & Tyre Wax",
        category: "aim",
        image: "products/CAR WAX/A-121 LEATHER TYRE WAX.jpeg",
        description: "Leather and tire care wax"
    },
    {
        id: 10,
        name: "AIM Auto Shine Wax",
        category: "aim",
        image: "products/auto shine wax.jpg",
        description: "Auto shine wax for brilliant finish"
    },
    
    // WD-40 Products
    {
        id: 11,
        name: "WD-40 Multi-Purpose",
        category: "wd40",
        image: "products/WD-40.jpg",
        description: "Multi-purpose lubricant and cleaner"
    },
    {
        id: 12,
        name: "WD-40 Specialist",
        category: "wd40",
        image: "products/WD-40.jpg",
        description: "Specialized automotive solutions"
    },
    
    // Cleaning Products
    {
        id: 13,
        name: "Glass Cleaner with Rain Repellent",
        category: "cleaners",
        image: "products/Glass Cleaner with Rain Repellent.jpg",
        description: "Advanced glass cleaning with rain protection"
    },
    {
        id: 14,
        name: "Wheel Rim Cleaner",
        category: "cleaners",
        image: "products/Wheel rim cleaner.jpg",
        description: "Professional wheel rim cleaning"
    },
    {
        id: 15,
        name: "Wheel Tyre Clean",
        category: "cleaners",
        image: "products/Wheel tyre clean.jpg",
        description: "Complete wheel and tire cleaning"
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    try {
        console.log('Initializing KSM Enterprise Portfolio...');
        loadPortfolio();
        setupEventListeners();
        setupFilters();
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
        const portfolioGrid = document.getElementById('productsGrid');
        if (portfolioGrid) {
            portfolioGrid.innerHTML = '<p style="text-align: center; color: #ff6b6b; font-size: 1.2rem; grid-column: 1 / -1;">Error loading portfolio. Please refresh the page.</p>';
        }
    }
}

function loadPortfolio() {
    // Load portfolio items
    products = portfolioItems;
    console.log('Total portfolio items loaded:', products.length);
    displayPortfolio(products);
}

function setupFilters() {
    // Add category filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-category="all">All Products</button>
            <button class="filter-btn" data-category="formula1">Formula 1</button>
            <button class="filter-btn" data-category="aim">AIM Car Care</button>
            <button class="filter-btn" data-category="wd40">WD-40</button>
            <button class="filter-btn" data-category="cleaners">Cleaners</button>
        </div>
    `;
    
    const productsSection = document.querySelector('.products-section .container');
    const title = productsSection.querySelector('h2');
    title.insertAdjacentElement('afterend', filterContainer);
    
    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            displayPortfolio(filteredProducts);
        });
    });
}

function displayPortfolio(itemsToShow) {
    const portfolioGrid = document.getElementById('productsGrid');
    const itemCounter = document.getElementById('productCounter');
    portfolioGrid.innerHTML = '';
    
    console.log('Displaying portfolio items:', itemsToShow.length);
    
    // Update item counter
    if (itemCounter) {
        itemCounter.textContent = `Showing ${itemsToShow.length} portfolio items`;
    }

    // Group items by category for better organization
    const groupedItems = groupItemsByCategory(itemsToShow);
    
    Object.keys(groupedItems).forEach(category => {
        if (groupedItems[category].length > 0) {
            // Add category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `<h3>${getCategoryDisplayName(category)}</h3>`;
            portfolioGrid.appendChild(categoryHeader);
            
            // Add category items
            groupedItems[category].forEach(item => {
                const portfolioCard = createPortfolioCard(item);
                portfolioGrid.appendChild(portfolioCard);
            });
        }
    });
    
    // Add a message if no items are found
    if (itemsToShow.length === 0) {
        portfolioGrid.innerHTML = '<p style="text-align: center; color: #ffffff; font-size: 1.2rem; grid-column: 1 / -1;">No portfolio items found. Please try a different filter.</p>';
        if (itemCounter) {
            itemCounter.textContent = 'No portfolio items found';
        }
    }
}

function groupItemsByCategory(items) {
    const grouped = {
        formula1: [],
        aim: [],
        wd40: [],
        cleaners: []
    };
    
    items.forEach(item => {
        if (grouped[item.category]) {
            grouped[item.category].push(item);
        }
    });
    
    return grouped;
}

function getCategoryDisplayName(category) {
    const names = {
        formula1: 'Formula 1 Products',
        aim: 'AIM Car Care',
        wd40: 'WD-40 Products',
        cleaners: 'Cleaning Solutions'
    };
    return names[category] || category;
}

function createPortfolioCard(item) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
            <div class="product-overlay">
                <div class="product-actions">
                    <button class="action-btn view-btn" onclick="viewPortfolioItem(${item.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="product-info">
            <h4 class="product-name">${item.name}</h4>
            <p class="product-description">${item.description}</p>
            <div class="product-category">
                <span class="category-badge ${item.category}">${getCategoryDisplayName(item.category)}</span>
            </div>
        </div>
    `;
    
    return card;
}

function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function viewPortfolioItem(itemId) {
    const item = products.find(p => p.id === itemId);
    if (item) {
        alert(`Portfolio Item ID: ${item.id}\nImage: ${item.image}`);
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function scrollToPortfolio() {
    const portfolioSection = document.getElementById('products');
    portfolioSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// API functions (for when you connect to your backend)
async function fetchPortfolioFromAPI() {
    try {
        const response = await fetch('http://localhost:3001/api/portfolio');
        if (response.ok) {
            const data = await response.json();
            products = data;
            displayPortfolio(products);
        } else {
            console.error('Failed to fetch portfolio');
            // Fallback to sample data
            loadPortfolio();
        }
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        // Fallback to sample data
        loadPortfolio();
    }
}

// Uncomment this line when your backend is ready
// fetchPortfolioFromAPI(); 