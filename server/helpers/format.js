function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency', currency: 'IDR'
    }).format(value)    
}

const formatSlug = (val) => {
    return val.replace(/\s+/g, '-').toLowerCase()
}

module.exports = {
    formatCurrency,
    formatSlug
}