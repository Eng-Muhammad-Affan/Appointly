// Complete mega menu structure matching the HTML
export const megaMenuStructure = [
  {
    name: 'LAPTOPS',
    href: '/products?category=laptops',
    type: 'mega',
    columns: [
      {
        name: 'Acer',
        href: '/products?category=laptops&brands=acer',
        children: [
          { name: 'Predator', href: '/products?category=laptops&brands=acer' },
          { name: 'Nitro', href: '/products?category=laptops&brands=acer' }
        ]
      },
      {
        name: 'Apple',
        href: '/products?category=laptops&brands=apple',
        children: [
          { name: 'MacBook Air', href: '/products?category=laptops&brands=apple' },
          { name: 'MacBook Pro', href: '/products?category=laptops&brands=apple' }
        ]
      },
      {
        name: 'Asus',
        href: '/products?category=laptops&brands=asus',
        children: [
          { name: 'Creator', href: '/products?category=laptops&brands=asus' },
          { name: 'ExpertBook', href: '/products?category=laptops&brands=asus' },
          { name: 'ROG Strix', href: '/products?category=laptops&brands=asus' },
          { name: 'TUF Gaming', href: '/products?category=laptops&brands=asus' },
          { name: 'VivoBook', href: '/products?category=laptops&brands=asus' },
          { name: 'ZenBook', href: '/products?category=laptops&brands=asus' }
        ]
      },
      {
        name: 'Dell',
        href: '/products?category=laptops&brands=dell',
        children: [
          { name: 'Alienware', href: '/products?category=laptops&brands=dell' },
          { name: 'G Series', href: '/products?category=laptops&brands=dell' },
          { name: 'Inspiron', href: '/products?category=laptops&brands=dell' },
          { name: 'Latitude', href: '/products?category=laptops&brands=dell' },
          { name: 'Precision', href: '/products?category=laptops&brands=dell' },
          { name: 'Vostro', href: '/products?category=laptops&brands=dell' },
          { name: 'XPS', href: '/products?category=laptops&brands=dell' }
        ]
      },
      {
        name: 'HP',
        href: '/products?category=laptops&brands=hp',
        children: [
          { name: '15 Series', href: '/products?category=laptops&brands=hp' },
          { name: 'Elitebook', href: '/products?category=laptops&brands=hp' },
          { name: 'Envy', href: '/products?category=laptops&brands=hp' },
          { name: 'Omen', href: '/products?category=laptops&brands=hp' },
          { name: 'OmniBook', href: '/products?category=laptops&brands=hp' },
          { name: 'Pavilion', href: '/products?category=laptops&brands=hp' },
          { name: 'ProBook', href: '/products?category=laptops&brands=hp' },
          { name: 'Spectre', href: '/products?category=laptops&brands=hp' },
          { name: 'Victus', href: '/products?category=laptops&brands=hp' }
        ]
      },
      {
        name: 'Lenovo',
        href: '/products?category=laptops&brands=lenovo',
        children: [
          { name: 'Ideapad', href: '/products?category=laptops&brands=lenovo' },
          { name: 'Legion', href: '/products?category=laptops&brands=lenovo' },
          { name: 'LOQ', href: '/products?category=laptops&brands=lenovo' },
          { name: 'Thinkpad', href: '/products?category=laptops&brands=lenovo' },
          { name: 'V Series', href: '/products?category=laptops&brands=lenovo' },
          { name: 'Yoga', href: '/products?category=laptops&brands=lenovo' }
        ]
      },
      {
        name: 'Microsoft',
        href: '/products?category=laptops&brands=microsoft',
        children: []
      },
      {
        name: 'Msi',
        href: '/products?category=laptops&brands=msi',
        children: []
      }
    ]
  },
  {
    name: 'DESKTOP PCS',
    href: '/products?category=desktop-pcs',
    type: 'mega',
    columns: [
      {
        name: 'All In One',
        href: '/products?category=desktop-pcs',
        children: [
          { name: 'Lenovo', href: '/products?category=desktop-pcs' }
        ]
      },
      {
        name: 'Apple',
        href: '/products?category=desktop-pcs',
        children: [
          { name: 'iMac', href: '/products?category=desktop-pcs' },
          { name: 'Mac Mini', href: '/products?category=desktop-pcs' },
          { name: 'Mac Studio', href: '/products?category=desktop-pcs' }
        ]
      },
      {
        name: 'Asus',
        href: '/products?category=desktop-pcs',
        children: [
          { name: 'ExpertCenter', href: '/products?category=desktop-pcs' }
        ]
      },
      {
        name: 'Dell',
        href: '/products?category=desktop-pcs',
        children: [
          { name: 'Vostro', href: '/products?category=desktop-pcs' },
          { name: 'Optiplex', href: '/products?category=desktop-pcs' }
        ]
      },
      {
        name: 'HP',
        href: '/products?category=desktop-pcs',
        children: []
      },
      {
        name: 'HP Open Box',
        href: '/products?category=desktop-pcs',
        children: []
      },
      {
        name: 'Lenovo',
        href: '/products?category=desktop-pcs',
        children: [
          { name: 'IdeaCentre', href: '/products?category=desktop-pcs' }
        ]
      },
      {
        name: 'Zotac',
        href: '/products?category=desktop-pcs',
        children: []
      }
    ]
  },
  {
    name: 'TABLETS',
    href: '/products?category=tablets',
    type: 'mega',
    columns: [
      {
        name: 'Android Tablets',
        href: '/products?category=tablets',
        children: []
      },
      {
        name: 'Apple Ipad',
        href: '/products?category=tablets&brands=apple',
        children: []
      }
    ]
  },
  {
    name: 'DRIVES',
    href: '/products?category=drives',
    type: 'mega',
    columns: [
      {
        name: 'SSD Drives',
        href: '/products?category=drives',
        children: [
          { name: 'Hiksemi', href: '/products?category=drives&brands=hiksemi' },
          { name: 'Kingston', href: '/products?category=drives&brands=kingston' },
          { name: 'Lenovo', href: '/products?category=drives&brands=lenovo' },
          { name: 'Samsung', href: '/products?category=drives&brands=samsung' },
          { name: 'Sandisk', href: '/products?category=drives&brands=sandisk' },
          { name: 'Verbatim', href: '/products?category=drives&brands=verbatim' }
        ]
      },
      {
        name: 'Hard Drives',
        href: '/products?category=drives',
        children: [
          { name: 'Adata', href: '/products?category=drives&brands=adata' },
          { name: 'Seagate', href: '/products?category=drives&brands=seagate' },
          { name: 'Transcend', href: '/products?category=drives&brands=transcend' },
          { name: 'WD', href: '/products?category=drives&brands=wd' }
        ]
      },
      {
        name: 'Flash Drives',
        href: '/products?category=drives',
        children: []
      },
      {
        name: 'Memory Card',
        href: '/products?category=drives',
        children: []
      },
      {
        name: 'NAS Drives & Bays',
        href: '/products?category=drives',
        children: []
      },
      {
        name: 'PC Hard Drives',
        href: '/products?category=drives',
        children: []
      },
      {
        name: 'SSD',
        href: '/products?category=drives',
        children: []
      }
    ]
  },
  {
    name: 'PRINTERS',
    href: '/products?category=printers',
    type: 'mega',
    columns: [
      { name: 'Epson', href: '/products?category=printers&brands=epson', children: [] },
      { name: 'HP', href: '/products?category=printers&brands=hp', children: [] },
      { name: 'Pantum', href: '/products?category=printers&brands=pantum', children: [] },
      { name: 'Canon', href: '/products?category=printers&brands=canon', children: [] }
    ]
  },
  {
    name: 'MONITORS',
    href: '/products?category=monitors',
    type: 'mega',
    columns: [
      { name: 'Asus', href: '/products?category=monitors&brands=asus', children: [] },
      { name: 'Dell', href: '/products?category=monitors&brands=dell', children: [] },
      { name: 'Ease', href: '/products?category=monitors&brands=ease', children: [] },
      { name: 'Gigabyte', href: '/products?category=monitors&brands=gigabyte', children: [] },
      { name: 'Hikvision', href: '/products?category=monitors&brands=hikvision', children: [] },
      { name: 'HP', href: '/products?category=monitors&brands=hp', children: [] },
      { name: 'MSI', href: '/products?category=monitors&brands=msi', children: [] },
      { name: 'Samsung', href: '/products?category=monitors&brands=samsung', children: [] },
      { name: 'Viewsonic', href: '/products?category=monitors&brands=viewsonic', children: [] }
    ]
  },
  {
    name: 'NETWORK',
    href: '/products?category=network',
    type: 'mega',
    columns: [
      { name: 'Access Point', href: '/products?category=network', children: [] },
      { name: 'PCI Express Adapter', href: '/products?category=network', children: [] },
      { name: 'Range Extender', href: '/products?category=network', children: [] },
      { name: 'Router', href: '/products?category=network', children: [] },
      { name: 'Switches', href: '/products?category=network', children: [] },
      { name: 'WiFi Adapter', href: '/products?category=network', children: [] }
    ]
  },
  {
    name: '2H USED',
    href: '/products?category=used',
    type: 'mega',
    columns: [
      { name: 'Addons', href: '/products?category=used', children: [] },
      { name: 'Desktop PCs', href: '/products?category=used', children: [] },
      { name: 'Laptops', href: '/products?category=used', children: [] },
      { name: 'LCD', href: '/products?category=used', children: [] }
    ]
  },
  {
    name: 'ADDONS',
    href: '/products?category=more',
    type: 'mega',
    columns: [
      { name: 'Antivirus', href: '/products?category=more', children: [] },
      { name: 'Apple Addons', href: '/products?category=more', children: [] },
      { name: 'Cameras', href: '/products?category=more', children: [] },
      { name: 'Cooling Systems', href: '/products?category=more', children: [] },
      { name: 'Earbuds', href: '/products?category=more', children: [] },
      { name: 'Gaming Chairs', href: '/products?category=more', children: [] },
      { name: 'Gaming Desk', href: '/products?category=more', children: [] },
      { name: 'Gaming Gear', href: '/products?category=more', children: [] },
      { name: 'Graphic Cards', href: '/products?category=more', children: [] },
      { name: 'Graphic Tablets', href: '/products?category=more', children: [] },
      { name: 'Headphones', href: '/products?category=more', children: [] },
      { name: 'Keyboards', href: '/products?category=more', children: [] },
      { name: 'Laptop Memories', href: '/products?category=more', children: [] },
      { name: 'Desktop Memories', href: '/products?category=more', children: [] },
      { name: 'Microsoft Addons', href: '/products?category=more', children: [] },
      { name: 'Motherboards', href: '/products?category=more', children: [] },
      { name: 'Mouse', href: '/products?category=more', children: [] },
      { name: 'Mouse Pads', href: '/products?category=more', children: [] },
      { name: 'PC Casing', href: '/products?category=more', children: [] },
      { name: 'Power Supply', href: '/products?category=more', children: [] },
      { name: 'Presenters', href: '/products?category=more', children: [] },
      { name: 'Processors', href: '/products?category=more', children: [] },
      { name: 'Projector', href: '/products?category=more', children: [] },
      { name: 'Scanners', href: '/products?category=more', children: [] },
      { name: 'Smart Watches', href: '/products?category=more', children: [] },
      { name: 'Speaker', href: '/products?category=more', children: [] },
      { name: 'Toner & Cartridges', href: '/products?category=more', children: [] },
      { name: 'TV Box', href: '/products?category=more', children: [] },
      { name: 'UPS', href: '/products?category=more', children: [] },
      { name: 'VR Glasses', href: '/products?category=more', children: [] }
    ]
  },
];