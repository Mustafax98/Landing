// Global Data Store
let globalData = {
    restaurant: {
        name: ' ( اسم التاجر )',
        email: 'info@merchant.com',
        phone: '+20120000123',
        whatsapp: '+201501234567',
        address: 'طريق الملك فهد، حي النخيل، الرياض',
        description: ' ( اسم التاجر ) هو وجهتك المفضلة لتجربة أشهى المأكولات الشرقية والغربية في جو عائلي دافئ.',
        deliveryFee: 15,
        freeDeliveryLimit: 50
    },
    menuItems: [
        { id: 1, name: 'منتج 1', price: 15, description: 'منتج 1', category: 'category1', status: 'active', image: 'samosa', tags: ['none'] },
        { id: 2, name: 'منتج 2', price: 20, description: 'منتج 2', category: 'category1', status: 'active', image: 'tabouleh', tags: ['جديد'] },
        { id: 3, name: 'منتج 3', price: 65, description: 'منتج 3', category: 'category2', status: 'active', image: 'mandi', tags: ['الأكثر مبيعاً'] },
        { id: 4, name: 'منتج 4', price: 75, description: 'منتج 4', category: 'category2', status: 'active', image: 'kabsa', tags: ['الأكثر مبيعاً'] },
        { id: 5, name: 'منتج 5', price: 45, description: 'منتج 5', category: 'category3', status: 'active', image: 'shawarma', tags: ['جديد'] },
        { id: 6, name: 'منتج 6', price: 85, description: 'منتج 6', category: 'category3', status: 'active', image: 'mixed', tags: ['الأكثر مبيعاً'] },
        { id: 7, name: 'منتج 7', price: 25, description: 'منتج 7', category: 'category4', status: 'active', image: 'kunafa', tags: ['الأكثر مبيعاً'] },
        { id: 8, name: 'منتج 8', price: 15, description: 'منتج 8', category: 'category4', status: 'active', image: 'mango', tags: ['جديد'] }
    ],
    branches: [
        { id: 1, name: 'القاهره الجديده - الفرع الرئيسي', address: 'الرحاب حي النخيل', phone: '0112345678', email: 'rehab@merchant.com', hours: '11:00 ص - 12:00 م', status: 'active' },
        { id: 2, name: 'الزمالك - فرع البحر', address: 'كورنيش الزمالك, شارع برج القاهره', phone: '0123456789', email: 'zamalek@merchant.com', hours: '12:00 م - 1:00 ص', status: 'active' },
        { id: 3, name: 'الاسكندريه - فرع الشاطئ', address: 'شارع احمد عرابي حي الشاطئ', phone: '0134567890', email: 'alex@mershant.com', hours: '11:30 ص - 11:30 م', status: 'active' }
    ],
    offers: [
        { id: 1, title: 'عرض العائلة', description: 'احصل على خصم 20% على الطلبات العائلية فوق 200 جنيه', code: 'FAMILY20', discount: 20, status: 'active' },
        { id: 2, title: 'وجبة مجانية', description: 'اطلب 3 وجبات واحصل على الرابعة مجاناً', code: 'FREE4', discount: 25, status: 'active' }
    ]
};

let cart = [];
let currentMode = 'profile';

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    loadProfileData();
    loadDashboardData();
});

// Mode Switching
function switchToProfile() {
    document.getElementById('profileContainer').classList.add('active');
    document.getElementById('dashboardContainer').classList.remove('active');
    document.querySelectorAll('.mode-btn')[0].classList.add('active');
    document.querySelectorAll('.mode-btn')[1].classList.remove('active');
    currentMode = 'profile';
    showNotification('تم التبديل لعرض ال', 'info');
}

function switchToDashboard() {
    document.getElementById('dashboardContainer').classList.add('active');
    document.getElementById('profileContainer').classList.remove('active');
    document.querySelectorAll('.mode-btn')[1].classList.add('active');
    document.querySelectorAll('.mode-btn')[0].classList.remove('active');
    currentMode = 'dashboard';
    showNotification('تم التبديل للوحة التحكم', 'info');
}

// Load Profile Data
function loadProfileData() {
    // Update restaurant info
    document.getElementById('logoText').textContent = globalData.restaurant.name;
    document.getElementById('heroTitle').textContent = globalData.restaurant.name + ' - تجربة فريدة';
    document.getElementById('heroSubtitle').textContent = globalData.restaurant.description;
    document.getElementById('aboutDescription').textContent = globalData.restaurant.description;
    document.getElementById('headerTop').innerHTML = `<i class="fas fa-truck"></i> توصيل مجاني للطلبات فوق ${globalData.restaurant.freeDeliveryLimit} جنيه | <i class="fas fa-clock"></i> مفتوح الآن`;

    // Update contact info
    document.getElementById('contactPhone').textContent = globalData.restaurant.phone;
    document.getElementById('contactMobile').textContent = globalData.restaurant.whatsapp;
    document.getElementById('contactEmail').textContent = globalData.restaurant.email;
    document.getElementById('whatsappNumber').textContent = globalData.restaurant.whatsapp;

    // Update counts
    document.getElementById('branchesCount').textContent = globalData.branches.length + '+';
    document.getElementById('menuItemsCount').textContent = globalData.menuItems.length + '+';

    // Load menu items
    displayMenuItems('all');

    // Load branches
    displayBranches();

    // Load offers
    displayOffers();
}

// Load Dashboard Data
function loadDashboardData() {
    // Load menu table
    populateMenuTable();

    // Load branches table
    populateBranchesTable();

    // Load offers table
    populateOffersTable();

    // Load settings
    loadSettings();
}

// Display Menu Items in Profile
function displayMenuItems(category) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    let items = [];
    if (category === 'all') {
        items = globalData.menuItems;
    } else {
        items = globalData.menuItems.filter(item => item.category === category);
    }

    items.forEach(item => {
        const menuItem = createMenuItemElement(item);
        menuGrid.appendChild(menuItem);
    });
}

// Create Menu Item Element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';

    const tagsHtml = item.tags.map(tag => {
        let tagClass = 'menu-tag';
        if (tag === 'حار') tagClass += ' spicy';
        else if (tag === 'نباتي') tagClass += ' vegetarian';
        return `<span class="${tagClass}">${tag}</span>`;
    }).join('');

    div.innerHTML = `
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <div class="menu-item-name">${item.name}</div>
                        <div class="menu-item-price">${item.price} جنيه</div>
                    </div>
                    <div class="menu-item-description">${item.description}</div>
                    <div class="menu-item-tags">${tagsHtml}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i>
                        أضف للسلة
                    </button>
                </div>
            `;

    return div;
}

// Display Branches in Profile
function displayBranches() {
    const branchesGrid = document.getElementById('branchesGrid');
    if (!branchesGrid) return;

    branchesGrid.innerHTML = globalData.branches.map(branch => `
                <div class="branch-card" onclick="showBranchDetails('${branch.name}')">
                    <div class="branch-content">
                        <h3 class="branch-name">${branch.name}</h3>
                        <div class="branch-address">
                            <i class="fas fa-map-marker-alt"></i>
                            ${branch.address}
                        </div>
                        <div class="branch-hours">
                            <i class="fas fa-clock"></i> ${branch.hours}
                        </div>
                        <span class="branch-status ${branch.status === 'active' ? 'open' : 'closed'}">
                            ${branch.status === 'active' ? 'مفتوح الآن' : 'مغلق الآن'}
                        </span>
                    </div>
                </div>
            `).join('');
}

// Display Offers in Profile
function displayOffers() {
    const offersGrid = document.getElementById('offersGrid');
    if (!offersGrid) return;

    offersGrid.innerHTML = globalData.offers.map(offer => `
                <div class="offer-card">
                    <div class="offer-badge">خصم ${offer.discount}%</div>
                    <h3 class="offer-title">${offer.title}</h3>
                    <p class="offer-description">${offer.description}</p>
                    <div class="offer-code">${offer.code}</div>
                </div>
            `).join('');
}

// Dashboard Functions
function showDashboardSection(section) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Show selected section
    document.getElementById(section + '-section').style.display = 'block';

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.menu-item').classList.add('active');
}

function populateMenuTable() {
    const tbody = document.getElementById('menuTableBody');
    if (!tbody) return;

    tbody.innerHTML = globalData.menuItems.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${getCategoryName(item.category)}</td>
                    <td>${item.price} جنيه</td>
                    <td><span class="status-badge ${item.status === 'active' ? 'active' : 'inactive'}">${item.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="action-btn edit" title="تعديل" onclick="editMenuItem(${item.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="حذف" onclick="deleteMenuItem(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

function populateBranchesTable() {
    const tbody = document.getElementById('branchesTableBody');
    if (!tbody) return;

    tbody.innerHTML = globalData.branches.map(branch => `
                <tr>
                    <td>${branch.name}</td>
                    <td>${branch.address}</td>
                    <td>${branch.phone}</td>
                    <td>${branch.hours}</td>
                    <td><span class="status-badge ${branch.status === 'active' ? 'active' : 'inactive'}">${branch.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="action-btn edit" title="تعديل" onclick="editBranch(${branch.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="حذف" onclick="deleteBranch(${branch.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

function populateOffersTable() {
    const tbody = document.getElementById('offersTableBody');
    if (!tbody) return;

    tbody.innerHTML = globalData.offers.map(offer => `
                <tr>
                    <td>${offer.title}</td>
                    <td>${offer.description}</td>
                    <td>${offer.code}</td>
                    <td>${offer.discount}%</td>
                    <td><span class="status-badge ${offer.status === 'active' ? 'active' : 'inactive'}">${offer.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="action-btn edit" title="تعديل" onclick="editOffer(${offer.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="حذف" onclick="deleteOffer(${offer.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
}

function loadSettings() {
    document.getElementById('restaurantName').value = globalData.restaurant.name;
    document.getElementById('restaurantEmail').value = globalData.restaurant.email;
    document.getElementById('restaurantPhone').value = globalData.restaurant.phone;
    document.getElementById('restaurantWhatsApp').value = globalData.restaurant.whatsapp;
    document.getElementById('restaurantAddress').value = globalData.restaurant.address;
    document.getElementById('restaurantDescription').value = globalData.restaurant.description;
    document.getElementById('deliveryFee').value = globalData.restaurant.deliveryFee;
    document.getElementById('freeDeliveryLimit').value = globalData.restaurant.freeDeliveryLimit;
}

// Add Menu Item
function addMenuItem() {
    const name = document.getElementById('menuItemName').value;
    const category = document.getElementById('menuItemCategory').value;
    const price = document.getElementById('menuItemPrice').value;
    const status = document.getElementById('menuItemStatus').value;
    const description = document.getElementById('menuItemDescription').value;

    if (!name || !category || !price || !description) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    const newItem = {
        id: globalData.menuItems.length + 1,
        name,
        description,
        category,
        price: parseFloat(price),
        status,
        image: 'newitem',
        tags: []
    };

    globalData.menuItems.push(newItem);
    populateMenuTable();
    closeModal('addMenuItemModal');
    showNotification('تم إضافة العنصر بنجاح', 'success');

    // Sync with profile
    if (currentMode === 'dashboard') {
        loadProfileData();
    }
}

// Add Branch
function addBranch() {
    const name = document.getElementById('branchName').value;
    const address = document.getElementById('branchAddress').value;
    const phone = document.getElementById('branchPhone').value;
    const email = document.getElementById('branchEmail').value;
    const hours = document.getElementById('branchHours').value;
    const status = document.getElementById('branchStatus').value;

    if (!name || !address || !phone || !hours) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    const newBranch = {
        id: globalData.branches.length + 1,
        name,
        address,
        phone,
        email,
        hours,
        status
    };

    globalData.branches.push(newBranch);
    populateBranchesTable();
    closeModal('addBranchModal');
    showNotification('تم إضافة الفرع بنجاح', 'success');

    // Sync with profile
    if (currentMode === 'dashboard') {
        loadProfileData();
    }
}

// Add Offer
function addOffer() {
    const title = document.getElementById('offerTitle').value;
    const description = document.getElementById('offerDescription').value;
    const code = document.getElementById('offerCode').value;
    const discount = document.getElementById('offerDiscount').value;
    const status = document.getElementById('offerStatus').value;

    if (!title || !description || !code || !discount) {
        showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    const newOffer = {
        id: globalData.offers.length + 1,
        title,
        description,
        code,
        discount: parseFloat(discount),
        status
    };

    globalData.offers.push(newOffer);
    populateOffersTable();
    closeModal('addOfferModal');
    showNotification('تم إضافة العرض بنجاح', 'success');

    // Sync with profile
    if (currentMode === 'dashboard') {
        loadProfileData();
    }
}

// Save Restaurant Settings
function saveRestaurantSettings() {
    globalData.restaurant.name = document.getElementById('restaurantName').value;
    globalData.restaurant.email = document.getElementById('restaurantEmail').value;
    globalData.restaurant.phone = document.getElementById('restaurantPhone').value;
    globalData.restaurant.whatsapp = document.getElementById('restaurantWhatsApp').value;
    globalData.restaurant.address = document.getElementById('restaurantAddress').value;
    globalData.restaurant.description = document.getElementById('restaurantDescription').value;
    globalData.restaurant.deliveryFee = parseFloat(document.getElementById('deliveryFee').value);
    globalData.restaurant.freeDeliveryLimit = parseFloat(document.getElementById('freeDeliveryLimit').value);

    showNotification('تم حفظ الإعدادات بنجاح', 'success');

    // Sync with profile
    if (currentMode === 'dashboard') {
        loadProfileData();
    }
}

// Delete Functions
function deleteMenuItem(id) {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
        globalData.menuItems = globalData.menuItems.filter(item => item.id !== id);
        populateMenuTable();
        showNotification('تم حذف العنصر بنجاح', 'success');

        // Sync with profile
        if (currentMode === 'dashboard') {
            loadProfileData();
        }
    }
}

function deleteBranch(id) {
    if (confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
        globalData.branches = globalData.branches.filter(branch => branch.id !== id);
        populateBranchesTable();
        showNotification('تم حذف الفرع بنجاح', 'success');

        // Sync with profile
        if (currentMode === 'dashboard') {
            loadProfileData();
        }
    }
}

function deleteOffer(id) {
    if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
        globalData.offers = globalData.offers.filter(offer => offer.id !== id);
        populateOffersTable();
        showNotification('تم حذف العرض بنجاح', 'success');

        // Sync with profile
        if (currentMode === 'dashboard') {
            loadProfileData();
        }
    }
}

// Profile Functions
function showSection(sectionId) {
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show selected section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Display filtered items
    displayMenuItems(category);
}

function showBranchDetails(branchName) {
    showNotification(`تم اختيار فرع: ${branchName}`, 'success');
}

function makeCall() {
    window.location.href = `tel:${globalData.restaurant.phone}`;
    showNotification('جاري الاتصال...', 'info');
}

function sendEmail() {
    window.location.href = `mailto:${globalData.restaurant.email}`;
    showNotification('جاري فتح البريد الإلكتروني...', 'info');
}

function openWhatsApp() {
    window.open(`https://wa.me/966${globalData.restaurant.whatsapp.substring(2)}`, '_blank');
    showNotification('جاري فتح الواتساب...', 'info');
}

function addToCart(itemId) {
    const item = globalData.menuItems.find(item => item.id === itemId);
    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification(`تم إضافة ${item.name} إلى السلة`, 'success');
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function openCart() {
    showNotification('جاري فتح السلة...', 'info');
}

// Modal Functions
function openAddMenuItemModal() {
    document.getElementById('addMenuItemModal').classList.add('active');
}

function openAddBranchModal() {
    document.getElementById('addBranchModal').classList.add('active');
}

function openAddOfferModal() {
    document.getElementById('addOfferModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Helper Functions
function getCategoryName(category) {
    const categories = {
        'category1': 'فئه1',
        'category2': 'فئه2',
        'category3': 'فئه3',
        'category4': 'فئه4',
    };
    return categories[category] || category;
}

function toggletopbar2() {
    const topbar2 = document.getElementById('topbar2');
    const mainContent = document.getElementById('mainContent');
    topbar2.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const icon = notification.querySelector('.notification-icon');

    notificationText.textContent = message;
    notification.className = 'notification show ' + type;

    if (type === 'success') {
        icon.className = 'fas fa-check-circle notification-icon';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle notification-icon';
    } else if (type === 'info') {
        icon.className = 'fas fa-info-circle notification-icon';
    }

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}


