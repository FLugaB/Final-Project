export function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency', currency: 'IDR'
    }).format(value)    
}

export const formattedDate = (date) => {
    date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
}

 