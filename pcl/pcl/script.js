// Cart and Orders management using localStorage
const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const getOrders = () => JSON.parse(localStorage.getItem('orders')) || [];
let cart = getCart();
let orders = getOrders();

// Utility functions to save data to localStorage
const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const saveCart = () => saveToLocalStorage('cart', cart);
const saveOrders = () => saveToLocalStorage('orders', orders);

// Cart management functions
const addToCart = (itemName, price) => {
    cart.push({ name: itemName, price });
    saveCart();
    updateCartDisplay();
};

const removeFromCart = (index) => {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
};

// Order placement function
const placeOrder = () => {
    if (cart.length === 0) return;

    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentError = document.getElementById('payment-error');

    if (!selectedPayment) {
        paymentError.style.display = 'block';
        return;
    }
    paymentError.style.display = 'none';

    const order = {
        items: [...cart],
        date: new Date().toLocaleString(),
        total: cart.reduce((sum, item) => sum + item.price, 0),
        paymentMethod: selectedPayment.value,
    };

    orders.push(order);
    cart = [];
    saveCart();
    saveOrders();
    updateCartDisplay();
    updateOrdersDisplay();
    alert(`Order placed successfully with ${order.paymentMethod}!`);
};

// Format price to Indian Rupees
const formatPrice = (price) => price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Update cart display
const updateCartDisplay = () => {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = cart.length;

    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const cartEmpty = document.querySelector('.cart-empty');
    const placeOrderBtn = document.querySelector('#place-order-btn');

    if (cartItems && cartTotal && cartEmpty && placeOrderBtn) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartTotal.textContent = '0.00';
            placeOrderBtn.disabled = true;
        } else {
            cartEmpty.style.display = 'none';
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item d-flex justify-content-between align-items-center p-2 border-bottom';
                itemElement.innerHTML = `
                    <span>${item.name} - ₹${formatPrice(item.price)}</span>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItems.appendChild(itemElement);
            });
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            cartTotal.textContent = formatPrice(total);
            placeOrderBtn.disabled = false;
        }
    }
};

// Update orders display
const updateOrdersDisplay = () => {
    const ordersCount = document.querySelector('.orders-count');
    if (ordersCount) ordersCount.textContent = orders.length;

    const ordersList = document.querySelector('.orders-list');
    if (ordersList) {
        ordersList.innerHTML = orders.length === 0 
            ? '<p class="text-center text-muted">No orders yet.</p>'
            : orders.map((order, index) => `
                <div class="order-item card p-3 mb-3">
                    <h5>Order #${index + 1} - ${order.date}</h5>
                    <ul class="list-group list-group-flush">
                        ${order.items.map(item => `
                            <li class="list-group-item">${item.name} - ₹${formatPrice(item.price)}</li>
                        `).join('')}
                    </ul>
                    <p class="mt-2 fw-bold">Total: ₹${formatPrice(order.total)}</p>
                    <p class="mt-2">Payment Method: ${order.paymentMethod}</p>
                </div>
            `).join('');
    }
};

// Product data
const products = {
    laptops: [
        { name: "HP 14s-dq3037tu", price: 24999, specs: "Intel Celeron N4500, 8GB RAM, 256GB SSD, 14\" HD Display, Windows 11, Intel UHD Graphics", rating: 4.2, category: "laptops", image: "https://via.placeholder.com/260x200?text=HP+14s" },
        { name: "Dell Vostro 3420", price: 39999, specs: "12th Gen Intel Core i5-1235U, 8GB RAM, 512GB SSD, 14\" FHD Display, Windows 11", rating: 4.5, category: "laptops", image: "https://via.placeholder.com/260x200?text=Dell+Vostro" },
        { name: "Lenovo IdeaPad Slim 3", price: 37499, specs: "AMD Ryzen 5 5500U, 16GB RAM, 512GB SSD, 15.6\" FHD Display, Windows 11", rating: 4.3, category: "laptops", image: "https://via.placeholder.com/260x200?text=Lenovo+IdeaPad" },
        { name: "Acer Aspire 5", price: 29999, specs: "Intel Core i3-1115G4, 8GB RAM, 1TB HDD, 15.6\" FHD Display, Windows 10", rating: 4.0, category: "laptops", image: "https://via.placeholder.com/260x200?text=Acer+Aspire" },
        { name: "ASUS VivoBook 15", price: 41999, specs: "Intel Core i5-1035G1, 8GB RAM, 512GB SSD, 15.6\" FHD Display, Windows 11", rating: 4.4, category: "laptops", image: "https://via.placeholder.com/260x200?text=ASUS+VivoBook" },
        { name: "HP Pavilion 15", price: 49999, specs: "AMD Ryzen 7 5700U, 16GB RAM, 1TB SSD, 15.6\" FHD Display, Windows 11", rating: 4.6, category: "laptops", image: "https://via.placeholder.com/260x200?text=HP+Pavilion" },
        { name: "Dell Inspiron 3511", price: 31499, specs: "Intel Core i3-1005G1, 8GB RAM, 256GB SSD, 15.6\" FHD Display, Windows 10", rating: 4.1, category: "laptops", image: "https://via.placeholder.com/260x200?text=Dell+Inspiron" },
        { name: "Lenovo ThinkPad E14", price: 44999, specs: "Intel Core i5-1135G7, 16GB RAM, 512GB SSD, 14\" FHD Display, Windows 11", rating: 4.7, category: "laptops", image: "https://via.placeholder.com/260x200?text=Lenovo+ThinkPad" },
        { name: "Acer Nitro 5", price: 54999, specs: "Intel Core i5-10300H, 8GB RAM, 512GB SSD, 15.6\" FHD 144Hz Display, NVIDIA GTX 1650", rating: 4.5, category: "laptops", image: "https://via.placeholder.com/260x200?text=Acer+Nitro" },
        { name: "HP EliteBook 840 G5", price: 47999, specs: "Intel Core i7-8550U, 16GB RAM, 512GB SSD, 14\" FHD Display, Windows 11", rating: 4.8, category: "laptops", image: "https://via.placeholder.com/260x200?text=HP+EliteBook" }
    ],
    smartphones: [
        { name: "iQOO Z7 Pro 5G", price: 19999, specs: "MediaTek Dimensity 7200, 8GB RAM, 256GB Storage, 6.78\" AMOLED Display, 64MP Camera", rating: 4.4, category: "smartphones", image: "https://via.placeholder.com/260x200?text=iQOO+Z7+Pro" },
        { name: "Samsung Galaxy M35 5G", price: 16999, specs: "Exynos 1380, 6GB RAM, 128GB Storage, 6.6\" AMOLED Display, 50MP Camera, 6000mAh Battery", rating: 4.3, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Samsung+Galaxy+M35" },
        { name: "OnePlus Nord CE 3 Lite", price: 17499, specs: "Snapdragon 695, 8GB RAM, 128GB Storage, 6.72\" LCD Display, 108MP Camera, 5000mAh Battery", rating: 4.2, category: "smartphones", image: "https://via.placeholder.com/260x200?text=OnePlus+Nord+CE" },
        { name: "iQOO Neo9 Pro 5G", price: 29999, specs: "Snapdragon 8 Gen 2, 8GB RAM, 256GB Storage, 6.78\" AMOLED Display, 50MP Camera", rating: 4.6, category: "smartphones", image: "https://via.placeholder.com/260x200?text=iQOO+Neo9+Pro" },
        { name: "Realme Narzo 60 Pro", price: 21999, specs: "MediaTek Dimensity 6020, 12GB RAM, 256GB Storage, 6.7\" AMOLED Display, 100MP Camera", rating: 4.3, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Realme+Narzo" },
        { name: "Poco X5 Pro 5G", price: 18999, specs: "Snapdragon 778G, 8GB RAM, 256GB Storage, 6.67\" AMOLED Display, 108MP Camera", rating: 4.4, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Poco+X5+Pro" },
        { name: "Vivo T2 5G", price: 15999, specs: "Snapdragon 695, 6GB RAM, 128GB Storage, 6.38\" AMOLED Display, 64MP Camera", rating: 4.1, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Vivo+T2" },
        { name: "Oppo Reno8 T 5G", price: 22499, specs: "Snapdragon 695, 8GB RAM, 128GB Storage, 6.7\" AMOLED Display, 108MP Camera", rating: 4.3, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Oppo+Reno8" },
        { name: "Motorola Edge 40", price: 24999, specs: "MediaTek Dimensity 8020, 8GB RAM, 256GB Storage, 6.55\" OLED Display, 50MP Camera", rating: 4.5, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Motorola+Edge" },
        { name: "Nokia G42 5G", price: 14999, specs: "Snapdragon 480+, 6GB RAM, 128GB Storage, 6.56\" LCD Display, 50MP Camera, 5000mAh Battery", rating: 4.0, category: "smartphones", image: "https://via.placeholder.com/260x200?text=Nokia+G42" }
    ],
    headphones: [
        { name: "OnePlus Nord Buds 3 Pro", price: 2999, specs: "12.4mm Drivers, 49dB ANC, 44Hrs Playback, IP55 Rating", rating: 4.3, category: "headphones", image: "https://via.placeholder.com/260x200?text=OnePlus+Nord+Buds" },
        { name: "pTron Bassbuds Tango", price: 1499, specs: "ENC, Bluetooth 5.1, Deep Bass, 20Hrs Playback, Type-C Charging", rating: 4.0, category: "headphones", image: "https://via.placeholder.com/260x200?text=pTron+Bassbuds" },
        { name: "JBL C100SI", price: 799, specs: "Wired, Pure Bass Sound, In-Ear, Mic, One-Button Remote", rating: 4.2, category: "headphones", image: "https://via.placeholder.com/260x200?text=JBL+C100SI" },
        { name: "boAt Rockerz 255 Pro+", price: 1999, specs: "60Hrs Playback, IPX7, Dual Pairing, Low Latency, Bluetooth Neckband", rating: 4.4, category: "headphones", image: "https://via.placeholder.com/260x200?text=boAt+Rockerz" },
        { name: "OnePlus Bullets Z2", price: 1799, specs: "12.4mm Drivers, 30Hrs Battery, IP55, Bluetooth Wireless", rating: 4.3, category: "headphones", image: "https://via.placeholder.com/260x200?text=OnePlus+Bullets" },
        { name: "Boult K10", price: 1299, specs: "50H Playtime, 4 Mic ENC, 45ms Low Latency, 10mm Drivers, IPX5", rating: 4.1, category: "headphones", image: "https://via.placeholder.com/260x200?text=Boult+K10" },
        { name: "Sony WH-CH510", price: 2499, specs: "Wireless, 35Hrs Battery, USB-C Charging, Lightweight, On-Ear", rating: 4.2, category: "headphones", image: "https://via.placeholder.com/260x200?text=Sony+WH-CH510" },
        { name: "Ambrane Stringz 03", price: 599, specs: "Type-C Wired, 10mm Bass Drivers, Inline Controls, 1.2m Braided Wire", rating: 3.9, category: "headphones", image: "https://via.placeholder.com/260x200?text=Ambrane+Stringz" },
        { name: "Hammer Bash", price: 1999, specs: "Over-Ear, Bluetooth 5.0, 8Hrs Playback, Deep Bass, Foldable", rating: 4.0, category: "headphones", image: "https://via.placeholder.com/260x200?text=Hammer+Bash" },
        { name: "Sennheiser CX 120BT", price: 2799, specs: "Wireless In-Ear, 6Hrs Playback, Bluetooth 5.0, High-Quality Audio", rating: 4.3, category: "headphones", image: "https://via.placeholder.com/260x200?text=Sennheiser+CX" }
    ],
    mice: [
        { name: "Logitech M235", price: 599, specs: "Optical, 1000 DPI, USB Receiver, Ambidextrous Design", rating: 4.2, category: "mice", image: "https://via.placeholder.com/260x200?text=Logitech+M235" },
        { name: "HP X1000", price: 499, specs: "Optical, 1600 DPI, USB, 3 Buttons, Scroll Wheel", rating: 4.0, category: "mice", image: "https://via.placeholder.com/260x200?text=HP+X1000" },
        { name: "Dell MS116", price: 399, specs: "Optical, 1000 DPI, USB, 3 Buttons, Ergonomic", rating: 4.1, category: "mice", image: "https://via.placeholder.com/260x200?text=Dell+MS116" },
        { name: "Lenovo 300 Wireless", price: 799, specs: "Wireless, 1000 DPI, 2.4GHz USB Receiver, 3 Buttons", rating: 4.0, category: "mice", image: "https://via.placeholder.com/260x200?text=Lenovo+300" },
        { name: "Logitech M331 Silent", price: 699, specs: "Optical, 1000 DPI, USB, Silent Clicks, 3 Buttons", rating: 4.3, category: "mice", image: "https://via.placeholder.com/260x200?text=Logitech+M331" },
        { name: "HP Z3700 Wireless", price: 999, specs: "Wireless, 1200 DPI, 2.4GHz USB Receiver, Slim Design", rating: 4.2, category: "mice", image: "https://via.placeholder.com/260x200?text=HP+Z3700" },
        { name: "Zebronics Zeb-Transformer", price: 499, specs: "Optical, 1600 DPI, USB, RGB Lighting, 6 Buttons", rating: 4.1, category: "mice", image: "https://via.placeholder.com/260x200?text=Zebronics+Zeb" },
        { name: "Portronics Toad 12", price: 599, specs: "Wireless, 1600 DPI, 2.4GHz USB Receiver, Ergonomic", rating: 4.0, category: "mice", image: "https://via.placeholder.com/260x200?text=Portronics+Toad" },
        { name: "Logitech MX Anywhere 2S", price: 2999, specs: "Wireless, 4000 DPI, USB Receiver, Multi-Device Pairing", rating: 4.5, category: "mice", image: "https://via.placeholder.com/260x200?text=Logitech+MX" },
        { name: "Razer DeathAdder Essential", price: 1499, specs: "Optical, 6400 DPI, USB, 5 Buttons, Ergonomic", rating: 4.4, category: "mice", image: "https://via.placeholder.com/260x200?text=Razer+DeathAdder" }
    ],
    speakers: [
        { name: "Harman Kardon Onyx Studio 6", price: 7999, specs: "50W Output, 8Hrs Playback, IPX7 Waterproof, Bluetooth 4.2", rating: 4.6, category: "speakers", image: "https://via.placeholder.com/260x200?text=Harman+Kardon+Onyx" },
        { name: "Bose SoundLink Flex", price: 9999, specs: "12Hrs Playback, IP67 Waterproof, Bluetooth 5.0, PositionIQ Tech", rating: 4.5, category: "speakers", image: "https://via.placeholder.com/260x200?text=Bose+SoundLink" },
        { name: "JBL Flip 5", price: 6999, specs: "20W Output, 12Hrs Playback, IPX7 Waterproof, Bluetooth 4.2", rating: 4.4, category: "speakers", image: "https://via.placeholder.com/260x200?text=JBL+Flip+5" },
        { name: "Sony SRS-XB23", price: 5999, specs: "10Hrs Playback, IP67 Waterproof, Bluetooth 5.0, Extra Bass", rating: 4.3, category: "speakers", image: "https://via.placeholder.com/260x200?text=Sony+SRS-XB23" },
        { name: "boAt Stone 1200", price: 3999, specs: "14W Output, 9Hrs Playback, IPX7 Waterproof, Bluetooth 5.0", rating: 4.2, category: "speakers", image: "https://via.placeholder.com/260x200?text=boAt+Stone" },
        { name: "Ultimate Ears Wonderboom 2", price: 4999, specs: "13Hrs Playback, IP67 Waterproof, Bluetooth, 360° Sound", rating: 4.4, category: "speakers", image: "https://via.placeholder.com/260x200?text=UE+Wonderboom" },
        { name: "Portronics SoundDrum", price: 2499, specs: "10W Output, 10Hrs Playback, IPX6 Water Resistant, Bluetooth 5.0", rating: 4.1, category: "speakers", image: "https://via.placeholder.com/260x200?text=Portronics+SoundDrum" },
        { name: "Hammer Pulse X", price: 1999, specs: "6W Output, 6Hrs Playback, IPX6 Water Resistant, Bluetooth 5.0", rating: 4.0, category: "speakers", image: "https://via.placeholder.com/260x200?text=Hammer+Pulse" },
        { name: "Anker Soundcore 2", price: 3499, specs: "12W Output, 24Hrs Playback, IPX7 Waterproof, Bluetooth 5.0", rating: 4.3, category: "speakers", image: "https://via.placeholder.com/260x200?text=Anker+Soundcore" },
        { name: "Tribit StormBox Micro", price: 2999, specs: "9W Output, 8Hrs Playback, IP67 Waterproof, Bluetooth 5.0", rating: 4.2, category: "speakers", image: "https://via.placeholder.com/260x200?text=Tribit+StormBox" }
    ],
    smartwatches: [
        { name: "Noise ColorFit Pro 4", price: 2499, specs: "1.72\" Display, SpO2 Monitoring, Heart Rate, 7-Day Battery, IP68 Rating", rating: 4.1, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Noise+ColorFit+Pro" },
        { name: "boAt Wave Call", price: 1999, specs: "1.69\" HD Display, Heart Rate, SpO2, 10-Day Battery, IP68 Rating", rating: 4.0, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=boAt+Wave+Call" },
        { name: "Fire-Boltt Ninja Call Pro", price: 2299, specs: "1.83\" Display, Bluetooth Calling, SpO2, 100+ Sports Modes, IP67 Rating", rating: 4.2, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Fire-Boltt+Ninja" },
        { name: "Amazfit Bip 3", price: 3499, specs: "1.69\" TFT Display, SpO2, Heart Rate, 14-Day Battery, 5 ATM Water Resistance", rating: 4.3, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Amazfit+Bip+3" },
        { name: "Fastrack Reflex Vox", price: 2799, specs: "1.69\" Display, Alexa Built-In, SpO2, 10-Day Battery, IP68 Rating", rating: 4.0, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Fastrack+Reflex" },
        { name: "CrossBeats Ignite S4", price: 3999, specs: "1.9\" Display, Bluetooth Calling, SpO2, 7-Day Battery, IP67 Rating", rating: 4.1, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=CrossBeats+Ignite" },
        { name: "Dizo Watch R", price: 3199, specs: "1.3\" AMOLED Display, SpO2, Heart Rate, 12-Day Battery, IP68 Rating", rating: 4.2, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Dizo+Watch+R" },
        { name: "Titan Smart 2", price: 4499, specs: "1.78\" AMOLED Display, SpO2, Heart Rate, 7-Day Battery, IP68 Rating", rating: 4.3, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Titan+Smart+2" },
        { name: "Noise Pulse 2", price: 2999, specs: "1.85\" Display, Bluetooth Calling, SpO2, 10-Day Battery, IP68 Rating", rating: 4.1, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=Noise+Pulse+2" },
        { name: "boAt Xtend Sport", price: 2499, specs: "1.69\" Display, SpO2, Heart Rate, 7-Day Battery, IP68 Rating", rating: 4.0, category: "smartwatches", image: "https://via.placeholder.com/260x200?text=boAt+Xtend+Sport" }
    ],
    tablets: [
        { name: "Samsung Galaxy Tab A7 Lite", price: 9999, specs: "MediaTek Helio P22T, 3GB RAM, 32GB Storage, 8.7\" Display, 5100mAh Battery", rating: 4.0, category: "tablets", image: "https://via.placeholder.com/260x200?text=Samsung+Tab+A7" },
        { name: "Lenovo Tab M10", price: 12999, specs: "MediaTek Helio P22T, 4GB RAM, 64GB Storage, 10.1\" FHD Display, 5000mAh Battery", rating: 4.1, category: "tablets", image: "https://via.placeholder.com/260x200?text=Lenovo+Tab+M10" },
        { name: "Realme Pad Mini", price: 10499, specs: "Unisoc T616, 3GB RAM, 32GB Storage, 8.7\" Display, 6400mAh Battery", rating: 4.0, category: "tablets", image: "https://via.placeholder.com/260x200?text=Realme+Pad+Mini" },
        { name: "Nokia T20", price: 14999, specs: "Unisoc T610, 4GB RAM, 64GB Storage, 10.4\" 2K Display, 8200mAh Battery", rating: 4.2, category: "tablets", image: "https://via.placeholder.com/260x200?text=Nokia+T20" },
        { name: "Samsung Galaxy Tab A8", price: 16999, specs: "Unisoc T618, 4GB RAM, 64GB Storage, 10.5\" FHD Display, 7040mAh Battery", rating: 4.3, category: "tablets", image: "https://via.placeholder.com/260x200?text=Samsung+Tab+A8" },
        { name: "Lenovo Tab M8", price: 8499, specs: "MediaTek Helio A22, 2GB RAM, 32GB Storage, 8\" HD Display, 5100mAh Battery", rating: 3.9, category: "tablets", image: "https://via.placeholder.com/260x200?text=Lenovo+Tab+M8" },
        { name: "Honor Pad 5", price: 13499, specs: "Kirin 710, 4GB RAM, 64GB Storage, 10.1\" FHD Display, 5100mAh Battery", rating: 4.1, category: "tablets", image: "https://via.placeholder.com/260x200?text=Honor+Pad+5" },
        { name: "Alcatel 3T 10", price: 9499, specs: "MediaTek MT8766B, 3GB RAM, 32GB Storage, 10\" HD Display, 5500mAh Battery", rating: 3.8, category: "tablets", image: "https://via.placeholder.com/260x200?text=Alcatel+3T+10" },
        { name: "iBall Slide Brace-X1", price: 7999, specs: "Octa-Core Processor, 2GB RAM, 32GB Storage, 10.1\" HD Display, 7800mAh Battery", rating: 3.7, category: "tablets", image: "https://via.placeholder.com/260x200?text=iBall+Slide" },
        { name: "Lava Magnum XL", price: 8999, specs: "MediaTek Processor, 2GB RAM, 32GB Storage, 10.1\" HD Display, 6100mAh Battery", rating: 3.8, category: "tablets", image: "https://via.placeholder.com/260x200?text=Lava+Magnum" }
    ]
};

const featuredProducts = [
    products.laptops[0], products.tablets[0], products.smartphones[0],
    products.headphones[0], products.speakers[0], products.smartwatches[0],
    products.mice[0],
];

// Window onload event handler
window.onload = () => {
    updateCartDisplay();
    updateOrdersDisplay();

    // Smooth scrolling for nav links
    document.querySelectorAll("nav a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const section = document.querySelector(anchor.getAttribute("href"));
            if (section) section.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Featured products on index.html
    const productsGrid = document.querySelector('#home .products-grid');
    if (productsGrid) {
        productsGrid.className = 'products-grid row row-cols-1 row-cols-md-3 g-4';
        productsGrid.innerHTML = featuredProducts.map(product => `
            <div class="col">
                <div class="card h-100 product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="price card-text text-success fw-bold">₹${formatPrice(product.price)}</p>
                        <p class="specs card-text text-muted">${product.specs}</p>
                        <p class="rating card-text text-warning">Rating: ${product.rating}/5</p>
                        <button class="btn btn-success" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Shop products on shop.html
    const shopProductsGrid = document.querySelector('#shop .products-grid');
    if (shopProductsGrid && window.location.pathname.includes('shop.html')) {
        shopProductsGrid.className = 'products-grid row row-cols-1 row-cols-md-3 g-4';
        const allProducts = Object.values(products).flat();
        shopProductsGrid.innerHTML = allProducts.map(product => `
            <div class="col">
                <div class="card h-100 product-card" data-category="${product.category}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body text-center">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="price card-text text-success fw-bold">₹${formatPrice(product.price)}</p>
                        <p class="specs card-text text-muted">${product.specs}</p>
                        <p class="rating card-text text-warning">Rating: ${product.rating}/5</p>
                        <button class="btn btn-success" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Category filter
        const categoryButtons = document.querySelectorAll(".category-btn");
        const productCards = document.querySelectorAll(".product-card");
        categoryButtons.forEach(button => {
            button.addEventListener("click", () => {
                categoryButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                const category = button.getAttribute("data-category");
                productCards.forEach(card => {
                    card.parentElement.style.display = (category === "all" || card.getAttribute("data-category") === category) ? "block" : "none";
                });
            });
        });
    }

    // Place order button on cart.html
    const placeOrderBtn = document.querySelector('#place-order-btn');
    if (placeOrderBtn) placeOrderBtn.addEventListener('click', placeOrder);

    // Contact form handling
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            const formMessage = document.getElementById("form-message");

            formMessage.textContent = name && email && message 
                ? "Message sent successfully!" 
                : "Please fill in all fields!";
            formMessage.className = name && email && message ? "text-success" : "text-danger";
            if (name && email && message) contactForm.reset();
        });
    }

    // Login form handling
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const loginMessage = document.getElementById("login-message");

            if (email && password) {
                loginMessage.textContent = "Login successful! Redirecting...";
                loginMessage.className = "text-success";
                loginForm.reset();
                setTimeout(() => window.location.href = "index.html", 1000);
            } else {
                loginMessage.textContent = "Please fill in all fields!";
                loginMessage.className = "text-danger";
            }
        });
    }

    // Signup form handling
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const confirmPassword = document.getElementById("signup-confirm-password").value;
            const signupMessage = document.getElementById("signup-message");

            if (name && email && password && confirmPassword) {
                if (password === confirmPassword) {
                    signupMessage.textContent = "Signup successful! Redirecting to login...";
                    signupMessage.className = "text-success";
                    signupForm.reset();
                    setTimeout(() => window.location.href = "login.html", 1000);
                } else {
                    signupMessage.textContent = "Passwords do not match!";
                    signupMessage.className = "text-danger";
                }
            } else {
                signupMessage.textContent = "Please fill in all fields!";
                signupMessage.className = "text-danger";
            }
        });
    }
};