const sampleProducts = [
    {
        id: 1,
        name: "Pink Back-Printed Top",
        category: "tops",
        price: 2900,
        stock: 32,
        sku: "TOP-WMN-PNK-001",
        image: "assets/images/products/back-printed-pink-color-top/back-printed-top-pink-color-top--0114168837800-1-17506560643iwq1qMYjD.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 2,
        name: "Yellow Back-Printed Top",
        category: "tops",
        price: 2800,
        stock: 50,
        sku: "TOP-WMN-YLW-002",
        image: "assets/images/products/back-printed-yellow-color-top/back-printed-yellow-color-top-0114168837800.jpg",
        badge: "New",
        gender: "women"
    },
    {
        id: 3,
        name: "Beige Bodycon Dress",
        category: "dresses",
        price: 5400,
        stock: 18,
        sku: "DRS-WMN-BGE-003",
        image: "assets/images/products/beige-color-bodycon-dress/beige-color-bodycon-dress-0114168909900.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 4,
        name: "Cutout Bodycon Midi Dress",
        category: "dresses",
        price: 6200,
        stock: 10,
        sku: "DRS-WMN-MID-004",
        image: "assets/images/products/cutout-bodycon-midi-dress/cutout-bodycon-midi-dress-010102508243-1.jpg",
        badge: "Hot",
        gender: "women"
    },
    {
        id: 5,
        name: "Light Green Sleeveless Top",
        category: "tops",
        price: 2400,
        stock: 40,
        sku: "TOP-WMN-GRN-005",
        image: "assets/images/products/light-green-sleeve-less-top/light-green-sleeve-less-top--0114168964900.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 6,
        name: "Pink Crew Neck T-Shirt",
        category: "shirts",
        price: 2200,
        stock: 60,
        sku: "SHI-WMN-PNK-006",
        image: "assets/images/products/pink-color-crew-neck-t-shirt/pink-color-crew-neck-t-shirt--010104518368.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 7,
        name: "Women’s Belted Mini Dress",
        category: "dresses",
        price: 5300,
        stock: 25,
        sku: "DRS-WMN-BLT-007",
        image: "assets/images/products/womens-belted-mini-dress/womens-belted-mini-dress-0101141901250.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 8,
        name: "Long Sleeve Round Neck Dress",
        category: "dresses",
        price: 5800,
        stock: 12,
        sku: "DRS-WMN-LNG-008",
        image: "assets/images/products/womens-long-sleeve-round-neck-dress2/womens-long-sleeve-round-neck-dress--0114164539600-1.jpg",
        badge: "Limited",
        gender: "women"
    },
    {
        id: 9,
        name: "Women’s Printed Mini Dress",
        category: "dresses",
        price: 4500,
        stock: 20,
        sku: "DRS-WMN-PRT-009",
        image: "assets/images/products/womens-printed-mini-dress/womens-printed-mini-dress-0114165105200-1.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 10,
        name: "Striped Casual Dress",
        category: "dresses",
        price: 4900,
        stock: 28,
        sku: "DRS-WMN-STR-010",
        image: "assets/images/products/womens-stripe-printed-dress/womens-stripe-printed-dress-0114165129400.jpg",
        badge: "New",
        gender: "women"
    },
    {
        id: 11,
        name: "Striped Summer Dress",
        category: "dresses",
        price: 4700,
        stock: 30,
        sku: "DRS-WMN-STR-011",
        image: "assets/images/products/womens-stripe-printed-dress2/womens-stripe-printed-dress-0114165129400-1.jpg",
        badge: null,
        gender: "women"
    },
    {
        id: 12,
        name: "White Maxi Dress",
        category: "dresses",
        price: 6000,
        stock: 14,
        sku: "DRS-WMN-WHT-012",
        image: "assets/images/products/womens-white-maxi-dress/womens-white-maxi-dress--0114164707700.jpg",
        badge: "Best Seller",
        gender: "women"
    },

    // New / uploaded images (kept, normalized)
    {
        id: 13,
        name: "Green Short Sleeve T-Shirt",
        category: "tops",
        price: 2900,
        stock: 32,
        sku: "TOP-WMN-GRN-013",
        image: "assets/images/products/new/green-color-short-sleeve-t-shirt/IMG_9306.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 14,
        name: "Grey Bodycon Dress",
        category: "dresses",
        price: 2800,
        stock: 50,
        sku: "DRS-WMN-GRY-014",
        image: "assets/images/products/new/grey-color-bodycon-dress/IMG_9393.JPG",
        badge: "New",
        gender: "women"
    },
    {
        id: 15,
        name: "Light Beige Formal Trouser",
        category: "pants",
        price: 5400,
        stock: 18,
        sku: "PNT-WMN-BGE-015",
        image: "assets/images/products/new/light-beige-color-formal-trouser/IMG_9323.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 16,
        name: "Maroon Polo Collar T-Shirt",
        category: "shirts",
        price: 6200,
        stock: 10,
        sku: "SHI-WMN-MRN-016",
        image: "assets/images/products/new/maroon-color-polo-collar-t-shirt/IMG_9303.JPG",
        badge: "Hot",
        gender: "women"
    },
    {
        id: 17,
        name: "Maroon Printed Casual Dress",
        category: "dresses",
        price: 2400,
        stock: 40,
        sku: "DRS-WMN-MRN-017",
        image: "assets/images/products/new/maroon-color-printed-casual-dress/IMG_9409.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 18,
        name: "Teal Blue Casual Dress",
        category: "dresses",
        price: 2200,
        stock: 60,
        sku: "DRS-WMN-TEL-018",
        image: "assets/images/products/new/teel-blue-color-casual-dress/IMG_9390.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 19,
        name: "White Casual T-Shirt",
        category: "tops",
        price: 5300,
        stock: 25,
        sku: "TOP-WMN-WHT-019",
        image: "assets/images/products/new/white-color-casual-t-shirt/IMG_9308.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 20,
        name: "Blue Skinny Jeans",
        category: "pants",
        price: 5800,
        stock: 12,
        sku: "PNT-WMN-BLU-020",
        image: "assets/images/products/new/blue-color-skinny/IMG_9370.JPG",
        badge: "Limited",
        gender: "women"
    },
    {
        id: 21,
        name: "Burnt Maroon Printed Mini Dress",
        category: "dresses",
        price: 4500,
        stock: 20,
        sku: "DRS-WMN-BRM-021",
        image: "assets/images/products/new/burnt-maroon-color-stripe-long-dress/IMG_9384.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 22,
        name: "Dark Blue Casual Denim",
        category: "outerwear",
        price: 4900,
        stock: 28,
        sku: "OUT-WMN-DBL-022",
        image: "assets/images/products/new/dark-blue-color-casual-denim/IMG_9372.JPG",
        badge: "New",
        gender: "women"
    },
    {
        id: 23,
        name: "Floral Printed Peach Sleeveless Dress",
        category: "dresses",
        price: 4700,
        stock: 30,
        sku: "DRS-WMN-FLP-023",
        image: "assets/images/products/new/floral-printed-peach-color-sleeveless-dress/IMG_9402.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 24,
        name: "Green Floral Sleeveless Dress",
        category: "dresses",
        price: 6000,
        stock: 14,
        sku: "DRS-WMN-GFL-024",
        image: "assets/images/products/new/green-color-floral-printed-sleeveless-dress/IMG_9399.JPG",
        badge: "Best Seller",
        gender: "women"
    },
    {
        id: 25,
        name: "Black Hoody (unisex)",
        category: "outerwear",
        price: 2900,
        stock: 32,
        sku: "OUT-UNI-BLK-025",
        image: "assets/images/products/new/black-color-hoody/IMG_9367.JPG",
        badge: null,
        gender: "unisex"
    },
    {
        id: 26,
        name: "Black Printed Casual Shirt (mens)",
        category: "shirts",
        price: 2800,
        stock: 50,
        sku: "SHI-MEN-BLK-026",
        image: "assets/images/products/new/black-color-printed-casual-shirt/IMG_9317.JPG",
        badge: "New",
        gender: "men"
    },
    {
        id: 27,
        name: "Blue Casual Denim (mens)",
        category: "outerwear",
        price: 5400,
        stock: 18,
        sku: "OUT-MEN-BLU-027",
        image: "assets/images/products/new/blue-color-casual-denim/IMG_9375.JPG",
        badge: null,
        gender: "men"
    },
    {
        id: 28,
        name: "Mens Casual T-Shirt",
        category: "tops",
        price: 6200,
        stock: 10,
        sku: "TOP-MEN-MTS-028",
        image: "assets/images/products/new/mens-casual-t-shirt/IMG_9361.JPG",
        badge: "Hot",
        gender: "men"
    },
    {
        id: 29,
        name: "Mens Collared T-Shirt",
        category: "tops",
        price: 2400,
        stock: 40,
        sku: "TOP-MEN-COL-029",
        image: "assets/images/products/new/mens-collard-t-shirt/IMG_9354.JPG",
        badge: null,
        gender: "men"
    },
    {
        id: 30,
        name: "Mens Slim Fit Printed T-Shirt",
        category: "tops",
        price: 2200,
        stock: 60,
        sku: "TOP-MEN-SLF-030",
        image: "assets/images/products/new/mens-slim-fit-printed-t-shirt/IMG_9338.JPG",
        badge: null,
        gender: "men"
    },
    {
        id: 31,
        name: "Peach Printed Mini Dress",
        category: "dresses",
        price: 4500,
        stock: 20,
        sku: "DRS-WMN-PCH-031",
        image: "assets/images/products/new/peach-color-printed-mini-dress/IMG_9405.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 32,
        name: "Purple Long Sleeve Top",
        category: "tops",
        price: 4900,
        stock: 28,
        sku: "TOP-WMN-PPL-032",
        image: "assets/images/products/new/purple-color-long-sleeve-top/IMG_9380.JPG",
        badge: "New",
        gender: "women"
    },
    {
        id: 33,
        name: "Printed White Short Sleeve Shirt",
        category: "shirts",
        price: 4700,
        stock: 30,
        sku: "SHI-WMN-WHT-033",
        image: "assets/images/products/new/printed-white-color-short-sleeve-shirt/IMG_9319.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 34,
        name: "Yale Blue Casual T-Shirt",
        category: "tops",
        price: 6000,
        stock: 14,
        sku: "TOP-WMN-YBL-034",
        image: "assets/images/products/new/yale-blue-color-casual-t-shirt/IMG_9311.JPG",
        badge: "Best Seller",
        gender: "women"
    },
    {
        id: 35,
        name: "Stripe Gray Long Sleeve Top",
        category: "tops",
        price: 2400,
        stock: 40,
        sku: "TOP-WMN-SGR-035",
        image: "assets/images/products/new/stripe-gray-color-long-sleeve-top/IMG_9378.JPG",
        badge: null,
        gender: "women"
    },
    {
        id: 36,
        name: "Teal Blue Casual Dress (alt)",
        category: "dresses",
        price: 2200,
        stock: 60,
        sku: "DRS-WMN-TBL-036",
        image: "assets/images/products/new/womens-long-sleeve-round-neck-dress/womens-long-sleeve-round-neck-dress--0114164539600-1.jpg",
        badge: null,
        gender: "women"
    }
]

const sampleCustomers = [
    { 
        id: 1, 
        name: 'Nimal Perera', 
        phone: '0771234567', 
        email: 'nimal.perera@gmail.com',
        location: 'Colombo'
    },
    { id: 2, name: 'Kamal Fernando', phone: '0712345678', email: 'kamal.fernando@gmail.com' },
    { id: 3, name: 'Saman Jayasinghe', phone: '0723456789', email: 'saman.jayasinghe@gmail.com' },
    { id: 4, name: 'Ruwan Silva', phone: '0754567890', email: 'ruwan.silva@gmail.com' },
    { id: 5, name: 'Chathura Wijesinghe', phone: '0765678901', email: 'chathura.wijesinghe@gmail.com' },
    { id: 6, name: 'Tharindu Gunasekara', phone: '0786789012', email: 'tharindu.gunasekara@gmail.com' },
    { id: 7, name: 'Sanduni Ratnayake', phone: '0707890123', email: 'sanduni.ratnayake@gmail.com' },
    { id: 8, name: 'Dilshan Abeysekera', phone: '0778901234', email: 'dilshan.abeysinghe@gmail.com' },
    { id: 9, name: 'Ishara Karunaratne', phone: '0719012345', email: 'ishara.karunaratne@gmail.com' },
    { id: 10, name: 'Pavithra Senanayake', phone: '0720123456', email: 'pavithra.senanayake@gmail.com' }
]
