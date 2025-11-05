export const translations = {
  en: {
    title: 'Batch Image Watermarking',
    uploadImages: 'Upload Images',
    addLogos: 'Add Logos',
    logoSettings: 'Logo Settings',
    patternMode: 'Pattern Mode',
    preview: 'Preview',
    exportImages: 'Export Images',
    noImages: 'No images selected',
    imagesSelected: (count: number) => `${count} image${count !== 1 ? 's' : ''} selected`,
    previous: 'Previous',
    next: 'Next',
    of: 'of'
  },
  ar: {
    title: 'معالجة العلامة المائية للصور',
    uploadImages: 'رفع الصور',
    addLogos: 'إضافة الشعارات',
    logoSettings: 'إعدادات الشعار',
    patternMode: 'وضع النمط',
    preview: 'معاينة',
    exportImages: 'تصدير الصور',
    noImages: 'لم يتم اختيار صور',
    imagesSelected: (count: number) => `تم اختيار ${count} ${count === 1 ? 'صورة' : 'صور'}`,
    previous: 'السابق',
    next: 'التالي',
    of: 'من'
  }
};

export type Language = keyof typeof translations;