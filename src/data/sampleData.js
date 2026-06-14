import { createNote, createItem } from '../utils/noteHelpers';

    export const sampleData = [
    createNote({
        title: 'Barang Kuliah',
        description: 'Kebutuhan semester ini.',
        items: [
        createItem({
            name: 'Laptop sleeve 14 inch',
            link: 'https://shopee.co.id/',
            price: 85000,
            status: 'Bought',
        }),
        createItem({
            name: 'Notebook A5',
            link: 'https://tiktok.com/',
            price: 25000,
            status: 'Wishlist',
        }),
        ],
    }),
    createNote({
        title: 'Project Dev',
        description: 'Peralatan tugas coding dan desain.',
        items: [
        createItem({
            name: 'Mouse wireless',
            link: 'https://shopee.co.id/',
            price: 99000,
            status: 'Ordered',
        }),
        ],
    }),
    ];