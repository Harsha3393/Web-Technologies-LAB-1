let cart = [];
let activeCoupon = null;

function addToCart(name, price, category) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    renderCart();
}

function updateQuantity(name, newQty) {
    const qty = Number(newQty);
    if (!Number.isInteger(qty) || qty < 0) return;

    const item = cart.find(i => i.name === name);
    if (!item) return;

    if (qty === 0) {
        removeFromCart(name);
    } else {
        item.quantity = qty;
        renderCart();
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

function applyCoupon() {
    const input = document.getElementById('couponInput');
    const code = input.value.trim().toUpperCase();

    activeCoupon = null;
    input.classList.remove('invalid');

    if (!code) {
        renderCart();
        return;
    }

    if (code.startsWith('SAVE') && code.length >= 5) {
        const percentStr = code.replace('SAVE', '');
        const percent = Number(percentStr);

        if (!isNaN(percent) && percent > 0 && percent <= 50) {
            activeCoupon = { code, percent };
            alert(`Coupon ${code} applied (${percent}% off)`);
        } else {
            input.classList.add('invalid');
            alert("Invalid discount percentage. Use e.g. SAVE10, SAVE20");
        }
    } else {
        input.classList.add('invalid');
        alert("Coupon format: SAVE10, SAVE15, SAVE20, ...");
    }

    renderCart();
}

function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let discount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        if (item.quantity >= 5) {
            discount += itemTotal * 0.10;
        }
        if (item.category === 'Electronics') {
            discount += itemTotal * 0.05;
        }
    });

    const hour = new Date().getHours();
    if (hour >= 14 && hour <= 16 && subtotal > 20) {
        discount += 5;
    }

    let couponDiscount = 0;
    if (activeCoupon) {
        const afterOtherDiscounts = subtotal - discount;
        couponDiscount = afterOtherDiscounts * (activeCoupon.percent / 100);
        discount += couponDiscount;
    }

    const total = Math.max(0, subtotal - discount);

    return {
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        total: total.toFixed(2),
        couponActive: !!activeCoupon,
        couponText: activeCoupon ? `${activeCoupon.code} (-${activeCoupon.percent}%)` : ''
    };
}

function renderCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price.toFixed(2)} × ${item.quantity}</small>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <input type="number" min="0" value="${item.quantity}"
                           onchange="updateQuantity('${item.name}', this.value)">
                    <button class="remove-btn" onclick="removeFromCart('${item.name}')">×</button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    const totals = calculateTotals();

    document.getElementById('subtotal').textContent = totals.subtotal;
    document.getElementById('discount').textContent = totals.discount;
    document.getElementById('total').textContent = totals.total;

    
    let couponLine = document.querySelector('.coupon-line');
    if (couponLine) couponLine.remove();

    if (totals.couponActive) {
        const summary = document.querySelector('.summary');
        const p = document.createElement('p');
        p.className = 'coupon-line';
        p.textContent = `Coupon applied: ${totals.couponText}`;
        summary.insertBefore(p, summary.querySelector('p:nth-child(2)'));
    }
}

renderCart();
